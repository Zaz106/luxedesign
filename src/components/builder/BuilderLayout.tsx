import React from "react";
import BuilderHeader from "./BuilderHeader";
import BuilderSidebar from "./BuilderSidebar";
import BuilderCanvas from "./BuilderCanvas";
import "./BuilderLayout.css";

const BuilderLayout = () => {
  return (
    <div className="builder-layout">
      <BuilderHeader />
      <div className="builder-main">
        <BuilderSidebar />
        <BuilderCanvas />
      </div>
    </div>
  );
};

export default BuilderLayout;
