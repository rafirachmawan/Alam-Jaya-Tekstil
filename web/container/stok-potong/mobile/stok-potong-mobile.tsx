"use client";

import { useState } from "react";

import Jobs from "./screen/jobs";
import Home from "./screen/home";
import Stock from "./screen/stock";
import StockBahan from "@/container/potong/mobile/screen/stockBahan";
import StockProduct from "@/container/potong/mobile/screen/stockProduct";

type screenType = "home" | "stock" | "stockBahan" | "stockProduct" | "jobs";

export default function StokPotongMobile(props: any) {
  const handleLogout = props?.handleLogout || (() => {});

  const [screen, setScreen] = useState<screenType>("home");

  return (
    <>
      {/* HOME */}
      {screen === "home" && (
        <Home key="home" setScreen={setScreen} handleLogout={handleLogout} />
      )}

      {/* STOCK */}
      {screen === "stock" && <Stock key="stock" setScreen={setScreen} />}

      {/* STOCK BAHAN */}
      {screen === "stockBahan" && (
        <StockBahan key="stockBahan" setScreen={setScreen} />
      )}

      {/* STOCK PRODUCT */}
      {screen === "stockProduct" && (
        <StockProduct key="stockProduct" setScreen={setScreen} />
      )}

      {/* JOBS */}
      {screen === "jobs" && <Jobs key="jobs" setScreen={setScreen} />}
    </>
  );
}
