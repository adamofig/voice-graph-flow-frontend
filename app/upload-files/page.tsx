'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CloudUpload,
    File,
    X,
    CheckCircle2,
    Upload,
    FileText,
    Image as ImageIcon,
    Film
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const removeFile = () => {
        setFile(null);
        setUploadSuccess(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Upload response success data:", data);
                setUploadSuccess(true);
                // Automatically reset after some time if desired, or keep showing success
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("Upload response error data:", errorData);
                alert("Upload failed. please try again.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("An error occurred during upload.");
        } finally {
            setIsUploading(false);
        }
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <ImageIcon className="text-blue-400" />;
        if (type.startsWith('video/')) return <Film className="text-purple-400" />;
        return <FileText className="text-gray-400" />;
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl"
            >
                {/* Header Section */}
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-gray-400 bg-clip-text text-transparent mb-3"
                    >
                        Upload Files
                    </motion.h1>
                    <p className="text-gray-400">Select or drag files to process them with AI.</p>
                </div>

                {/* Main Upload Zone */}
                <motion.div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !file && fileInputRef.current?.click()}
                    whileHover={!file ? { scale: 1.01 } : {}}
                    whileTap={!file ? { scale: 0.99 } : {}}
                    className={cn(
                        "relative group cursor-pointer transition-all duration-300",
                        "aspect-[16/9] flex flex-col items-center justify-center rounded-3xl",
                        "border-2 border-dashed overflow-hidden",
                        "bg-white/5 backdrop-blur-xl",
                        isDragging
                            ? "border-purple-500 bg-purple-500/10 scale-[1.02]"
                            : "border-gray-800 hover:border-purple-500/50 hover:bg-white/[0.07]",
                        file && "border-solid border-purple-500/30 bg-purple-500/5 cursor-default"
                    )}
                >
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="upload-prompt"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-4 text-center p-8"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                    <CloudUpload size={40} className="text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-white mb-2">
                                        Click or Drag File Here
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Supports Images, Videos, and Documents
                                    </p>
                                </div>
                                <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all active:scale-95">
                                    Browse Files
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="file-info"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="relative mb-6">
                                    <div className="w-24 h-32 bg-gray-900 rounded-lg border border-white/10 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 right-0 p-2">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                                                <CheckCircle2 size={14} className="text-green-500" />
                                            </div>
                                        </div>
                                        {getFileIcon(file.type)}
                                        <div className="mt-4 px-2 w-full">
                                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 1 }}
                                                    className="h-full bg-purple-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors shadow-lg"
                                    >
                                        <X size={16} />
                                    </motion.button>
                                </div>

                                <h3 className="text-lg font-medium text-white truncate max-w-[250px]">
                                    {file.name}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>

                                <div className="mt-8 flex gap-4 w-full max-w-sm">
                                    <button
                                        className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all"
                                        onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={isUploading}
                                        className={cn(
                                            "flex-1 px-6 py-3 rounded-xl font-medium shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2",
                                            uploadSuccess
                                                ? "bg-green-500 text-white cursor-default"
                                                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/40"
                                        )}
                                        onClick={(e) => { e.stopPropagation(); !uploadSuccess && handleUpload(); }}
                                    >
                                        {isUploading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                >
                                                    <Upload size={18} />
                                                </motion.div>
                                                Processing...
                                            </>
                                        ) : uploadSuccess ? (
                                            <>
                                                <CheckCircle2 size={18} />
                                                Success
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={18} />
                                                Process
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Footer Tip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-widest"
                >
                    <div className="h-[1px] w-8 bg-gray-800"></div>
                    Secure End-to-End Processing
                    <div className="h-[1px] w-8 bg-gray-800"></div>
                </motion.div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </motion.div>
        </div>
    );
}