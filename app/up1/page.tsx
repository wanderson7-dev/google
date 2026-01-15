import { TriangleAlert } from "lucide-react";

export default function Up1Page() {
    return (
        <div className="flex flex-col w-full max-w-md bg-gray-50 min-h-screen font-[family-name:var(--font-red-hat-display)]">
            {/* Warning Header */}
            <div className="bg-[#D92828] text-white p-4 flex flex-col items-center text-center space-y-2 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                    <TriangleAlert className="text-yellow-400 fill-yellow-400 text-shadow" size={20} />
                    <span>Attention! Your access to the APP is not yet 100% complete...</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-12 space-y-8 text-center bg-white">

                <div className="space-y-6">
                    <p className="text-slate-800 text-lg leading-snug">
                        The app was recently updated to <span className="font-extrabold">version 2.0</span> — only your final activation is missing.
                    </p>

                    <p className="text-slate-800 text-lg leading-snug">
                        <span className="font-extrabold">Activate it now</span> and start earning up to <span className="font-extrabold">3x more</span>. 🚀
                    </p>

                    <p className="text-slate-600 text-sm">
                        Click the button below to start the activation process.
                    </p>
                </div>

                {/* Action Button */}
                <button id="activate-button" className="w-full bg-[#22C55E] hover:bg-[#1ea851] text-white font-bold py-4 rounded-lg shadow-lg text-lg tracking-wide uppercase transition-transform active:scale-95">
                    ACTIVATE APP 2.0
                </button>

                {/* Circular Progress Widget */}
                <div className="relative pt-8">
                    <div className="relative w-64 h-64">
                        {/* Background Circle */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r="110"
                                stroke="#E5E7EB"
                                strokeWidth="24"
                                fill="none"
                            />
                            {/* Progress Circle (0% for now as per image) */}
                            <circle
                                cx="128"
                                cy="128"
                                r="110"
                                stroke="#22C55E"
                                strokeWidth="24"
                                fill="none"
                                strokeDasharray="691"
                                strokeDashoffset="691"
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>

                        {/* Text Center */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                            <span className="text-3xl font-bold text-slate-600">0%</span>
                            <span className="text-sm font-medium">Click the button to start</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
