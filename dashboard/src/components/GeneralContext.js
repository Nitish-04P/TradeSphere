import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import AnalyticsWindow from "./AnalyticsWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},

  openSellWindow: (uid) => {},
  closeSellWindow: () => {},

  openAnalyticsWindow: (stock) => {},
  closeAnalyticsWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [isAnalyticsWindowOpen, setIsAnalyticsWindowOpen] = useState(false);

  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);

  // BUY
  const handleOpenBuyWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  // SELL
  const handleOpenSellWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsSellWindowOpen(true);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  // ANALYTICS
  const handleOpenAnalyticsWindow = (stock) => {
    setSelectedStock(stock);
    setIsAnalyticsWindowOpen(true);
  };

  const handleCloseAnalyticsWindow = () => {
    setSelectedStock(null);
    setIsAnalyticsWindowOpen(false);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,

        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,

        openAnalyticsWindow: handleOpenAnalyticsWindow,
        closeAnalyticsWindow: handleCloseAnalyticsWindow,
      }}
    >
      {props.children}

      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} />
      )}

      {isSellWindowOpen && (
        <SellActionWindow uid={selectedStockUID} />
      )}

      {isAnalyticsWindowOpen && (
        <AnalyticsWindow
          stock={selectedStock}
          close={handleCloseAnalyticsWindow}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;