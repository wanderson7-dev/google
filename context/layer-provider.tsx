"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

// BALANCE VARIATIONS
const balances: Record<string, Record<number, number>> = {
  "new": {
    0: 0,
    1: 71,
    2: 142,
    3: 204,
    4: 204,
    5: 204,
    6: 204,
  },
};

type LayerContext = {
  host: string,
  layer: number,
  content: string,
  params: string,
  frontLink: string,
  promoLink: string,
  balances: Record<string, Record<number, number>>,
  page: number,
  setPage: (page: number) => void,
  active: boolean,
  setActive: (active: boolean) => void,
  balanceModal: boolean,
  withdrawModal: boolean,
  setBalanceModal: (balanceModal: boolean) => void,
  setWithdrawModal: (withdrawModal: boolean) => void,
  handleButtonClick: () => void,
  handleOptionClick: () => void,
  handleWithdrawClick: () => void,
};

const LayerContext = createContext<LayerContext | undefined>(undefined);

type LayerProviderProps = {
  host: string,
  layer: number,
  params: string,
  content: string,
  children: ReactNode,
};

export function LayerProvider({
  host,
  layer,
  params,
  content,
  children,
}: LayerProviderProps) {

  const [page, setPage] = useState(0);
  const [active, setActive] = useState<boolean>(false);
  const [balanceModal, setBalanceModal] = useState<boolean>(false);
  const [withdrawModal, setWithdrawModal] = useState<boolean>(false);

  // SET LINKS
  const frontLink = 'https://pay.hotmart.com/X103097700L?off=sizrj8es';
  const promoLink = 'https://app.monetizze.com.br/checkout/DEB367058';

  // PLAY SOUND
  const handlePlaySound = () => {
    const audio = new Audio('/songs/caching.mp3');
    audio.play();
  };

  // HANDLE BUTTON CLICK
  const handleButtonClick = () => {
    if (active) return;
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setPage(page + 1);
      setBalanceModal(false);
      setWithdrawModal(false);
    }, 500);
  };

  // HANDLE OPTION CLICK
  const handleOptionClick = () => {
    if (active) return;
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setBalanceModal(true);
      handlePlaySound();
    }, 100);
  };

  // HANDLE WITHDRAW CLICK
  const handleWithdrawClick = () => {
    if (active) return;
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setWithdrawModal(true);
      handlePlaySound();
    }, 100);
  };

  // NEXT PAGE
  useEffect(() => {
    if (balanceModal) {
      setTimeout(() => {
        setPage(page + 1);
        setActive(false);
        setBalanceModal(false);
      }, 2000);
    };
  }, [balanceModal, page, setPage, setActive, setBalanceModal])

  const contextValue = {
    host,
    layer,
    params,
    content,
    frontLink,
    promoLink,
    balances,
    page,
    setPage,
    active,
    setActive,
    balanceModal,
    withdrawModal,
    setBalanceModal,
    setWithdrawModal,
    handleButtonClick,
    handleOptionClick,
    handleWithdrawClick,
  };

  return (
    <LayerContext.Provider value={contextValue}>
      {children}
    </LayerContext.Provider>
  );

};

export function useLayer() {

  const layer = useContext(LayerContext);

  if (!layer) {
    throw new Error("useLayer deve ser usado dentro de LayerProvider");
  };

  return layer;

};