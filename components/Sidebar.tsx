'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    MessageSquare,
    Mic2,
    CheckSquare,
    LayoutDashboard,
    Settings,
    Menu,
    ChevronLeft,
    Users,
    LogOut,
    UserCircle,
    FilePlus,
    Search,
    Files
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';

const navItems = [
    { name: 'LLM Chat', path: '/llm', icon: MessageSquare },
    { name: 'LLM Rag', path: '/llm-rag', icon: Search },
    { name: 'Audio WIP', path: '/audio', icon: Mic2 },
    { name: 'File Plus', path: '/upload-files', icon: FilePlus },
    { name: 'Loaded Files', path: '/files', icon: Files },
    { name: 'Search', path: '/search', icon: Search },
];

const Sidebar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user, logout } = useAuth();

    if (pathname === '/login') return null;

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? '80px' : '260px' }}
            className="flex flex-col h-screen bg-[#0f1115] border-r border-gray-800 sticky top-0 transition-all duration-300 ease-in-out z-50 overflow-hidden"
        >
            <div className="p-6 flex items-center justify-between">
                <AnimatePresence mode="wait">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <span className="text-white font-bold text-lg">F</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Flow
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                >
                    {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative
                                ${isActive
                                    ? 'bg-purple-600/10 text-purple-400'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon size={22} className={isActive ? 'text-purple-400' : 'group-hover:scale-110 transition-transform'} />

                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.name}
                                </motion.span>
                            )}

                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full"
                                />
                            )}

                            {isCollapsed && (
                                <div className="absolute left-16 bg-gray-950 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-gray-800 shadow-xl">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800 space-y-2">
                {user && !isCollapsed && (
                    <div className="px-4 py-2 flex items-center gap-3 bg-white/5 rounded-xl border border-white/10">
                        <UserCircle className="text-purple-400 shrink-0" size={20} />
                        <div className="overflow-hidden">
                            <p className="text-xs font-medium text-white truncate">{user.email}</p>
                            <p className="text-[10px] text-gray-500">Authenticated</p>
                        </div>
                    </div>
                )}

                <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group relative overflow-hidden`}>
                    <Settings size={22} className="group-hover:rotate-45 transition-transform duration-500" />
                    {!isCollapsed && (
                        <span className="font-medium text-sm text-gray-400 group-hover:text-white">Settings</span>
                    )}
                </button>

                {user && (
                    <button
                        onClick={() => logout()}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all group relative overflow-hidden`}
                    >
                        <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                        {!isCollapsed && (
                            <span className="font-medium text-sm">Sign Out</span>
                        )}
                    </button>
                )}
            </div>
        </motion.aside>
    );
};

export default Sidebar;
