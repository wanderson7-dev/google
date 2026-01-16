"use client";

import Button from "@/components/button";
import { useLayer } from "@/context/layer-provider";
import Image from "next/image";
import { Wallet, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';

export default function Page() {

  // IMPORT CONTEXT DATA
  const { active, handleOptionClick, handleButtonClick, page } = useLayer();

  // STEP DATA
  const steps = [
    { id: 1, type: "code", code: "APPL", value: 42.35, company: "Apple", balanceAfter: 142.35 },
    { id: 2, type: "code", code: "AMZN", value: 45.15, company: "Amazon", balanceAfter: 187.50 },
    { id: 3, type: "code", code: "NIKE", value: 42.50, company: "Nike", balanceAfter: 230.00 },
    { id: 4, type: "success", code: "", value: 0, company: "", balanceAfter: 230.00 }, // Success Screen
    { id: 5, type: "fallback", code: "GOOG", value: 0, company: "Google", balanceAfter: 230.00 },
  ];

  // Adjust page index. 
  const currentStepIndex = (page >= 1 ? page - 1 : 0);
  const currentStep = steps[currentStepIndex] || steps[steps.length - 1];

  const baseBalance = 100.00;
  const currentBalance = currentStepIndex === 0 ? baseBalance : (steps[currentStepIndex - 1]?.balanceAfter || baseBalance);


  const [inputCode, setInputCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);

  // Reset state when page changes
  useEffect(() => {
    setInputCode(["", "", "", ""]);
    setError(false);

    // Focus first input if it's a code step
    if (currentStep.type === "code") {
      const t = setTimeout(() => {
        document.getElementById('code-input-0')?.focus();
      }, 100);
      return () => clearTimeout(t);
    }
  }, [page, currentStep.type]);

  // Handle Confetti on success step mount
  useEffect(() => {
    if (currentStep.type === "success") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    }
  }, [currentStep.type]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);

    const newCode = [...inputCode];
    newCode[index] = value.toUpperCase();
    setInputCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }

    if (error) setError(false);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !inputCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    if (currentStep.type === "success") {
      handleButtonClick();
      return;
    }

    const enteredCode = inputCode.join("");
    if (enteredCode === currentStep.code) {
      handleOptionClick();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans selection:bg-green-100 pb-10">

      {/* COMPACT HEADER */}
      <div className="bg-white py-2 px-4 shadow-md sticky top-0 z-50 flex items-center justify-between h-14">
        <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
            width={75}
            height={24}
            className="w-[75px] h-auto object-contain"
            unoptimized
          />
          <div className="h-5 w-px bg-gray-300 mx-1"></div>
          <span className="text-gray-600 text-sm font-semibold tracking-tight mt-0.5">CashBacks</span>
        </div>

        <div className="bg-gradient-to-r from-[#34A853] to-[#2E8B46] text-white pl-2.5 pr-3 py-1.5 rounded-full shadow-sm shadow-green-100 flex items-center gap-2 transition-all duration-500" key={currentBalance}>
          <div className="p-1 bg-white/20 rounded-full">
            <Wallet size={12} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-wide">$ {currentBalance.toFixed(2)}</span>
        </div>
      </div>

      {/* SUB-HEADER INFO */}
      <div className="bg-[#f8f9fa] py-3 px-4 border-b border-gray-200 mb-6 shadow-sm">
        <p className="text-gray-500 text-[11px] sm:text-xs text-center font-medium">
          Recover your balance quickly and safely.
        </p>
      </div>

      {/* PROGRESS SECTION */}
      {currentStep.type !== "success" && (
        <div className="px-6 mb-4">
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            <span>Your Progress</span>
            <span className="text-green-700">{Math.min(currentStepIndex * 33 + 10, 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden shadow-inner border border-gray-200">
            <div
              className="bg-[#34A853] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max((currentStepIndex) * 33 + 10, 5)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 flex flex-col items-center pb-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 sm:p-8 text-center border border-gray-100 relative overflow-hidden">

          {currentStep.type === "code" ? (
            <>
              {/* CODE STEP DESIGN */}
              <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                Rescue {currentStepIndex + 1} / 3
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-8 leading-tight">
                Rescue your Cashback
              </h1>

              <div className="bg-[#E6F4EA] border border-dashed border-[#34A853] p-5 rounded-xl mb-8 shadow-sm">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-1.5">Value to Receive</span>
                <span className="text-4xl font-black text-[#137333] tracking-tight">
                  $ {currentStep.value.toFixed(2)}
                </span>
              </div>

              <div className={`p-6 rounded-xl mb-8 transition-all ${error ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"} border-2 border-dashed`}>
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Code: {currentStep.company}</span>
                <span className="text-4xl font-mono font-bold text-gray-800 tracking-[0.2em]">
                  {currentStep.code.split("").join(" ")}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-4 font-medium">
                Enter the code above to release
              </p>

              <div className="flex justify-center gap-3 mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    id={`code-input-${i}`}
                    type="text"
                    maxLength={1}
                    value={inputCode[i]}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-14 h-16 rounded-xl border-2 text-center text-3xl font-bold focus:outline-none focus:ring-4 focus:ring-green-100 transition-all caret-green-500 shadow-sm ${error ? "border-red-300 text-red-600 bg-white" : "border-gray-200 text-gray-800 bg-white focus:border-[#34A853]"
                      }`}
                  />
                ))}
              </div>

              <Button
                active={active}
                onClick={handleSubmit}
                className="!w-full !rounded-xl !bg-[#34A853] !text-white !font-bold !text-base !py-4 !shadow-green-200 !shadow-lg hover:!translate-y-[-2px] hover:!shadow-xl transition-all uppercase tracking-wide"
              >
                RESCUE CASHBACK
              </Button>
            </>
          ) : (
            <>
              {/* SUCCESS / FINAL STEP DESIGN */}
              <div className="flex justify-center mb-6 mt-2">
                <div className="bg-[#34A853] rounded-full p-4 shadow-lg shadow-green-100 animate-bounce-slow">
                  <CheckCircle2 size={48} className="text-white" strokeWidth={3} />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                Congratulations! 🎉
              </h1>

              <p className="text-gray-600 mb-8 leading-relaxed px-2">
                You successfully completed all rescues and your balance is available for withdrawal!
              </p>

              <div className="bg-[#E6F4EA] border border-[#34A853] py-8 px-4 rounded-2xl mb-8 shadow-sm">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Released Balance</span>
                <span className="text-5xl font-black text-[#137333] tracking-tight">
                  $ {currentStep.balanceAfter.toFixed(2)}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[80px] flex items-center justify-center mb-8">
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[280px]">
                  Watch a quick presentation to learn how to withdraw your money via bank transfer.
                </p>
              </div>

              <Button
                active={active}
                onClick={handleSubmit}
                className="!w-full !rounded-xl !bg-[#34A853] !text-white !font-bold !text-base !py-4 !shadow-green-200 !shadow-lg hover:!translate-y-[-2px] hover:!shadow-xl transition-all uppercase tracking-wide"
              >
                WATCH VIDEO NOW
              </Button>
            </>
          )}

        </div>

        {/* Footer Trust Elements */}
        <div className="mt-8 flex items-center gap-4 opacity-50 grayscale pb-4">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" width={60} height={20} unoptimized />
          <div className="h-4 w-px bg-gray-400"></div>
          <span className="text-xs font-semibold text-gray-500">Secure 256-bit SSL</span>
        </div>
      </div>

    </div>
  );
};