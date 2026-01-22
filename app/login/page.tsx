"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, Github, Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-pink-600/20 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                        {isLogin ? "Welcome Back" : "Join the Flow"}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {isLogin ? "Enter your credentials to continue" : "Create an account to get started"}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                {isLogin ? "Sign In" : "Sign Up"}
                                <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-gray-900/0 px-2 text-gray-500 backdrop-blur-md">Or continue with</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 text-gray-300 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Google
                </button>

                <div className="text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
