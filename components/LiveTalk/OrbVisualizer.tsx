'use client';

import React, { useEffect, useRef } from 'react';
import { Analyser } from '@/lib/live-talk/analyser';

interface OrbVisualizerProps {
    inputNode: AudioNode | null;
    outputNode: AudioNode | null;
}

const OrbVisualizer: React.FC<OrbVisualizerProps> = ({ inputNode, outputNode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inputAnalyserRef = useRef<Analyser | null>(null);
    const outputAnalyserRef = useRef<Analyser | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (inputNode) {
            inputAnalyserRef.current = new Analyser(inputNode);
        }
    }, [inputNode]);

    useEffect(() => {
        if (outputNode) {
            outputAnalyserRef.current = new Analyser(outputNode);
        }
    }, [outputNode]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const drawBlobLayer = (
            x: number,
            y: number,
            radius: number,
            input: Uint8Array,
            output: Uint8Array,
            time: number,
            color: string,
            intensity: number
        ) => {
            const numPoints = 128;
            ctx.fillStyle = color;
            ctx.beginPath();

            for (let i = 0; i < numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;

                const inputLevel = (input[i % input.length] / 255) * 50 * intensity;
                const outputLevel = (output[i % output.length] / 255) * 50 * intensity;

                const noise = Math.sin(angle * 4 + time * 2) * 10 + Math.cos(angle * 7 - time) * 5;
                const r = radius + inputLevel + outputLevel + noise;

                const px = x + Math.cos(angle) * r;
                const py = y + Math.sin(angle) * r;

                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }

            ctx.closePath();
            ctx.fill();
        };

        const draw = () => {
            if (!inputAnalyserRef.current || !outputAnalyserRef.current) {
                animationFrameIdRef.current = requestAnimationFrame(draw);
                return;
            }

            inputAnalyserRef.current.update();
            outputAnalyserRef.current.update();

            const width = canvas.width / window.devicePixelRatio;
            const height = canvas.height / window.devicePixelRatio;
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);

            // Background Glow
            const bgGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, Math.max(width, height) / 2
            );
            bgGradient.addColorStop(0, 'rgba(20, 15, 25, 1)');
            bgGradient.addColorStop(1, 'rgba(16, 12, 20, 1)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            const inputData = inputAnalyserRef.current.data;
            const outputData = outputAnalyserRef.current.data;

            const baseRadius = 100;
            const time = performance.now() * 0.001;

            const inputLevel = inputData.reduce((a, b) => a + b, 0) / (inputData.length * 255);
            const outputLevel = outputData.reduce((a, b) => a + b, 0) / (outputData.length * 255);
            const totalLevel = inputLevel + outputLevel;

            // Outer Glow
            ctx.shadowBlur = 40 + totalLevel * 60;
            ctx.shadowColor = totalLevel > 0.1 ? 'rgba(100, 200, 255, 0.8)' : 'rgba(100, 150, 255, 0.4)';

            drawBlobLayer(centerX, centerY, baseRadius, inputData, outputData, time, 'rgba(60, 100, 255, 0.3)', 1.2);
            drawBlobLayer(centerX, centerY, baseRadius * 0.8, inputData, outputData, time * 1.5, 'rgba(120, 180, 255, 0.7)', 1.0);

            // Core
            ctx.shadowBlur = 20 + totalLevel * 30;
            ctx.fillStyle = totalLevel > 0.05 ? '#ffffff' : '#f0f0f5';
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius * 0.4 + totalLevel * 20, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;

            animationFrameIdRef.current = requestAnimationFrame(draw);
        };

        animationFrameIdRef.current = requestAnimationFrame(draw);

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ position: 'absolute', inset: 0, background: '#100c14' }}
        />
    );
};

export default OrbVisualizer;
