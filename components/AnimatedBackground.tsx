"use client";

import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="background" aria-hidden="true">
      <div className="cloud-layer" />
      <div className="pattern-layer" />

      <style jsx>{`
        .background {
          position: fixed;
          inset: 0;
          height: 100vh;
          width: 100vw;
          z-index: -10;
          overflow: hidden;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 40%, #e2e8f0 100%);
        }

        .cloud-layer,
        .pattern-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .cloud-layer {
          background:
            radial-gradient(circle at 18% 25%, rgba(30, 58, 138, 0.16) 0%, transparent 42%),
            radial-gradient(circle at 82% 75%, rgba(5, 150, 105, 0.14) 0%, transparent 45%),
            radial-gradient(circle at 45% 15%, rgba(51, 65, 85, 0.15) 0%, transparent 38%),
            radial-gradient(circle at 25% 70%, rgba(15, 118, 110, 0.13) 0%, transparent 40%),
            radial-gradient(circle at 75% 30%, rgba(71, 85, 105, 0.12) 0%, transparent 35%),
            radial-gradient(circle at 60% 85%, rgba(30, 41, 59, 0.11) 0%, transparent 32%);
          animation: cloudFloat 40s ease-in-out infinite;
        }

        .pattern-layer {
          background:
            radial-gradient(circle, rgba(51, 65, 85, 0.12) 2px, transparent 2px),
            radial-gradient(circle, rgba(30, 58, 138, 0.09) 1px, transparent 1px);
          background-size: 75px 75px, 37px 37px;
          background-position: 0 0, 37px 37px;
          mask-image: radial-gradient(circle, rgba(0, 0, 0, 0.8) 35%, transparent 65%);
          -webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 0.8) 35%, transparent 65%);
          animation: dotShift 35s ease-in-out infinite;
        }

        @keyframes cloudFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1.1);
          }
          25% {
            transform: translate3d(1.5%, -0.8%, 0) scale(1.12);
          }
          50% {
            transform: translate3d(-0.8%, 1.2%, 0) scale(1.14);
          }
          75% {
            transform: translate3d(1%, -0.5%, 0) scale(1.13);
          }
        }

        @keyframes dotShift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1.05);
          }
          50% {
            transform: translate3d(12px, 8px, 0) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
