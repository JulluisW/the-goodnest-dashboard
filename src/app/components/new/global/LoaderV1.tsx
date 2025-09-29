import React from "react";
import "@/app/styles/components/LoaderV1.scss";

type Props = {
  className?: string;
};

const LoaderV1 = ({ className = "" }: Props) => {
  return (
    <div className={`goodnest-loader ${className}`}>
      <div className="leaf"></div>
      <div className="shadow"></div>
      <div className="fruit">
        <div className="stem"></div>
        <div className="bump left"></div>
        <div className="bump right"></div>
      </div>
      <span className="text">Goodnest...</span>
    </div>
  );
};

export default LoaderV1;
