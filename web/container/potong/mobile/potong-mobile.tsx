"use client";

import { useState, useEffect } from "react";

import Jobs from "./screen/jobs";
import Home from "./screen/home";
import Stock from "./screen/stock";
import StockBahan from "./screen/stockBahan";
import StockProduct from "./screen/stockProduct";

type screenType = "home" | "stock" | "stockBahan" | "stockProduct" | "jobs";

export default function PotongMobile(props: any) {
  const handleLogout = props?.handleLogout || (() => {});

  const [screen, setScreen] = useState<screenType>("home");

  return (
    <>
      {screen === "home" && (
        <Home key="home" setScreen={setScreen} handleLogout={handleLogout} />
      )}

      {screen === "stock" && <Stock key="stock" setScreen={setScreen} />}

      {screen === "stockBahan" && (
        <StockBahan key="stockBahan" setScreen={setScreen} />
      )}

      {screen === "stockProduct" && (
        <StockProduct key="stockProduct" setScreen={setScreen} />
      )}

      {screen === "jobs" && <Jobs setScreen={setScreen} />}
    </>
  );
}
