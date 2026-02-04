'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Session } from '@google/genai';
import { createBlob, decode, decodeAudioData } from '@/lib/live-talk/utils';
import OrbVisualizer from '@/components/LiveTalk/OrbVisualizer';
import { Mic, MicOff, RefreshCw, AlertCircle } from 'lucide-react';

export default function LiveTalkPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    // Audio contexts and nodes
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const inputNodeRef = useRef<GainNode | null>(null);
    const outputNodeRef = useRef<GainNode | null>(null);
    const [nodesReady, setNodesReady] = useState(false);

    // Session state
    const clientRef = useRef<GoogleGenAI | null>(null);
    const sessionRef = useRef<Session | null>(null);
    const nextStartTimeRef = useRef(0);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const scriptProcessorNodeRef = useRef<ScriptProcessorNode | null>(null);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    useEffect(() => {
        initClient();
        return () => {
            stopRecording();
            sessionRef.current?.close();
        };
    }, []);

    const initAudio = () => {
        if (!outputAudioContextRef.current) return;
        nextStartTimeRef.current = outputAudioContextRef.current.currentTime;
    };

    const initClient = async () => {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
        if (!apiKey) {
            setError('NEXT_PUBLIC_GEMINI_API_KEY is not defined in your environment.');
            return;
        }

        try {
            // Initialize Audio Contexts
            inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

            inputNodeRef.current = inputAudioContextRef.current.createGain();
            outputNodeRef.current = outputAudioContextRef.current.createGain();
            outputNodeRef.current.connect(outputAudioContextRef.current.destination);

            setNodesReady(true);
            initAudio();

            clientRef.current = new GoogleGenAI({ apiKey });
            await initSession();
        } catch (err) {
            console.error('Initialization error:', err);
            setError(`Initialization failed: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    const initSession = async () => {
        if (!clientRef.current) return;

        const model = 'gemini-2.5-flash-native-audio-preview-09-2025'; // Using the latest available for live

        try {
            sessionRef.current = await clientRef.current.live.connect({
                model: model,
                callbacks: {
                    onopen: () => {
                        setStatus('Connected');
                        setError('');
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData;

                        if (audio && outputAudioContextRef.current && outputNodeRef.current) {
                            nextStartTimeRef.current = Math.max(
                                nextStartTimeRef.current,
                                outputAudioContextRef.current.currentTime,
                            );

                            const audioBuffer = await decodeAudioData(
                                decode(audio.data),
                                outputAudioContextRef.current,
                                24000,
                                1,
                            );
                            const source = outputAudioContextRef.current.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputNodeRef.current);
                            source.addEventListener('ended', () => {
                                sourcesRef.current.delete(source);
                            });

                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }

                        const interrupted = message.serverContent?.interrupted;
                        if (interrupted) {
                            for (const source of sourcesRef.current.values()) {
                                try { source.stop(); } catch (e) { }
                                sourcesRef.current.delete(source);
                            }
                            nextStartTimeRef.current = 0;
                        }
                    },
                    onerror: (e: any) => {
                        console.error('Session error:', e);
                        setError(`Session error: ${e.message || 'Unknown error'}`);
                    },
                    onclose: (e: any) => {
                        setStatus(`Disconnected: ${e.reason || 'Closed'}`);
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
                    },
                },
            });
        } catch (e) {
            console.error('Session connection error:', e);
            setError(`Failed to connect session: ${e instanceof Error ? e.message : String(e)}`);
        }
    };

    const startRecording = async () => {
        if (isRecording || !inputAudioContextRef.current || !sessionRef.current) return;

        inputAudioContextRef.current.resume();
        setStatus('Requesting microphone...');

        try {
            mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });

            setStatus('Capturing audio...');

            sourceNodeRef.current = inputAudioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
            sourceNodeRef.current.connect(inputNodeRef.current!);

            const bufferSize = 2048;
            scriptProcessorNodeRef.current = inputAudioContextRef.current.createScriptProcessor(bufferSize, 1, 1);

            scriptProcessorNodeRef.current.onaudioprocess = (audioProcessingEvent) => {
                const inputBuffer = audioProcessingEvent.inputBuffer;
                const pcmData = inputBuffer.getChannelData(0);
                if (sessionRef.current) {
                    sessionRef.current.sendRealtimeInput({ media: createBlob(pcmData) });
                }
            };

            sourceNodeRef.current.connect(scriptProcessorNodeRef.current);
            scriptProcessorNodeRef.current.connect(inputAudioContextRef.current.destination);

            setIsRecording(true);
            setStatus('🔴 Live');
        } catch (err) {
            console.error('Error starting recording:', err);
            setError(`Microphone error: ${err instanceof Error ? err.message : String(err)}`);
            stopRecording();
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        setStatus('Stopped');

        if (scriptProcessorNodeRef.current) {
            scriptProcessorNodeRef.current.disconnect();
            scriptProcessorNodeRef.current = null;
        }
        if (sourceNodeRef.current) {
            sourceNodeRef.current.disconnect();
            sourceNodeRef.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
            mediaStreamRef.current = null;
        }
    };

    const resetSession = () => {
        stopRecording();
        sessionRef.current?.close();
        setStatus('Resetting...');
        initSession();
    };

    return (
        <div className="relative flex flex-col h-screen bg-[#0f1115] text-white overflow-hidden">
            {/* Background Orb */}
            <div className="absolute inset-0 z-0">
                <OrbVisualizer
                    inputNode={nodesReady ? inputNodeRef.current : null}
                    outputNode={nodesReady ? outputNodeRef.current : null}
                />
            </div>

            {/* UI Overlay */}
            <div className="relative z-10 flex flex-col h-full items-center justify-between p-8 pb-20">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        LiveTalk
                    </h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Real-time AI voice conversation powered by Gemini 2.5 Flash
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-xl backdrop-blur-md animate-pulse">
                            <AlertCircle size={18} />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    <div className="font-mono text-sm tracking-widest uppercase bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full border border-white/10 shadow-xl">
                        {status || 'Initialising...'}
                    </div>

                    <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                        <button
                            onClick={resetSession}
                            disabled={isRecording}
                            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                            title="Reset Session"
                        >
                            <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>

                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`p-8 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${isRecording
                                ? 'bg-red-500 shadow-red-500/40 hover:bg-red-600'
                                : 'bg-purple-600 shadow-purple-500/40 hover:bg-purple-700'
                                }`}
                        >
                            {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
                        </button>

                        <div className="w-14 h-14" /> {/* Spacer for symmetry */}
                    </div>
                </div>
            </div>
        </div>
    );
}
