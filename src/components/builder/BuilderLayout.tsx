"use client";

import React, { useState } from "react";
import BuilderHeader from "./BuilderHeader";
import BuilderSidebar from "./BuilderSidebar";
import BuilderCanvas from "./BuilderCanvas";
import { BuilderProvider } from "./BuilderContext";
import "./BuilderLayout.css";

const BuilderLayout = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <BuilderProvider activePage={activePage}>
      <div className="builder-layout">
        <BuilderHeader />
        <div className="builder-main">
          <BuilderSidebar activePage={activePage} setActivePage={setActivePage} />
          <BuilderCanvas />
        </div>
      </div>
    </BuilderProvider>
  );
};

export default BuilderLayout;
