"use client";

import BalanceModal from "@/components/balance-modal";
import WithdrawModal from "@/components/withdraw-modal";
import { useLayer } from "@/context/layer-provider";
import Start from "@/components/pages/black/new/start";
import Quiz from "@/components/pages/black/new/quiz";
import Video from "@/components/pages/black/new/video";

export default function Page() {

  // IMPORT CONTEXT DATA
  const { balanceModal, withdrawModal, content, page } = useLayer();

  // ROUTES VARIATIONS
  const routes: Record<string, Record<number, React.ReactNode>> = {
    "new": {
      0: <Start />,
      1: <Quiz />,
      2: <Quiz />,
      3: <Quiz />,
      4: <Quiz />, // Success Screen
      5: <Video />,
    },
  };

  const pageContent = routes[content]?.[page] || null;

  return (
    <>
      {pageContent}
      {balanceModal && <BalanceModal />}
      {withdrawModal && <WithdrawModal />}
    </>
  );

};