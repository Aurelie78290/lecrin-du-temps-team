import type React from "react";

import { useEffect, useRef } from "react";

import "./WatchAnimation.css";

const WatchAnimation: React.FC = () => {
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const h = now.getHours();

      const m = now.getMinutes();

      const s = now.getSeconds();

      const rotations: Record<string, string> = {
        "--sec-start": `${s * -36}deg`,

        "--sec-ten-start": `${Math.floor(s / 10) * -60}deg`,

        "--min-start": `${(m + 1) * -36}deg`,

        "--min-ten-start": `${Math.floor(m / 10) * -60}deg`,

        "--hour-start": `${(h % 12) * -30}deg`,

        "--hour-ten-start": `${Math.floor(h / 10) * -90}deg`,
      };

      if (clockRef.current) {
        for (const [key, value] of Object.entries(rotations)) {
          clockRef.current.style.setProperty(key, value);
        }
      }
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderSpans = (values: number[], prefix: string) =>
    values.map((v, i) => {
      const uniqueId = `${prefix}-val-${v}-pos-${i}`;

      return <span key={uniqueId} data-val={v} />;
    });

  return (
    <div className="clock-container" ref={clockRef}>
      <div className="clock">
        <figure className="hour-ten">{renderSpans([1, 0, 0, 0], "h10")}</figure>

        <figure className="hour">
          {renderSpans([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2], "h")}
        </figure>

        <figure className="min-ten">
          {renderSpans([0, 1, 2, 3, 4, 5], "m10")}
        </figure>

        <figure className="min">
          {renderSpans([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "m")}
        </figure>

        <figure className="sec-ten">
          {renderSpans([0, 5, 4, 3, 2, 1], "s10")}
        </figure>

        <figure className="sec">
          {renderSpans([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "s")}
        </figure>

        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/111863/clock-mask.svg"
          alt="mask"
        />
      </div>
    </div>
  );
};

export default WatchAnimation;
