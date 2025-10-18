// components/MeasuringTape.tsx
import React from "react";

const MeasuringTape: React.FC = () => {
  return (
    <div className="overflow-hidden w-full h-12 relative bg-gray-200">
      <div className="tape h-full bg-[repeating-linear-gradient(to right, yellow 0 10px, black 10px 12px)] animate-slideTape" />
    </div>
  );
};

export default MeasuringTape;