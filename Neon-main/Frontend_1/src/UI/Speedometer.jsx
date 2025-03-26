import React from "react";
import { smileyReviews } from "../utils/utils";

const Speedometer = ({ value, width = 500, height = 400, down = 0, emojix = 50, emojir = 40 }) => {
  const numSegments = 30;
  const outerRadius = 180;
  const thickness = 30;
  const innerRadius = outerRadius - thickness;
  const gapPx = 3;
  const gapAngleDeg = (gapPx / outerRadius) * (180 / Math.PI);
  const segmentAngleDeg = (180 - numSegments * gapAngleDeg) / numSegments;
  console.log('smileyReviews :>> ', smileyReviews);
  const colors = [
    "#40bf4c", // segments 0-4
    "#93cc39", // segments 5-9
    "#a4e541", // segments 10-14
    "#d6d93e", // segments 15-19
    "#ffb14a", // segments 20-24
    "#ff3e5b", // segments 25-29
  ];
  const svgWidth = width;
  const svgHeight = height;
  const cx = svgWidth / 2;
  const cy = outerRadius - down;
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY - radius * Math.sin(angleInRadians),
    };
  };
  const describeSegment = (startAngle, endAngle) => {
    const startOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
    const endOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
    const startInner = polarToCartesian(cx, cy, innerRadius, endAngle);
    const endInner = polarToCartesian(cx, cy, innerRadius, startAngle);
    const largeArcFlag = "0";
    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
      `L ${startInner.x} ${startInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${endInner.x} ${endInner.y}`,
      "Z",
    ].join(" ");
  };
  const segments = [];
  let currentAngle = 180;
  for (let i = 0; i < numSegments; i++) {
    const startAngle = currentAngle;
    const endAngle = startAngle + segmentAngleDeg;
    const colorIndex = Math.floor(i / 5);
    const fillColor = colors[colorIndex] || colors[colors.length - 1];
    segments.push(
      <path
        key={i}
        d={describeSegment(startAngle, endAngle)}
        fill={fillColor}
        stroke="none"
      />
    );
    currentAngle = endAngle + gapAngleDeg;
  }
  const needleAngle = 180 - (value / 30) * 180;
  const needleLength = outerRadius - thickness / 2 - 20;
  const needleTip = polarToCartesian(cx, cy, needleLength, needleAngle);
  const numEmojis = smileyReviews.length;
  const emojiArcSpan = 140;
  const emojiAngleIncrement = emojiArcSpan / (numEmojis - 1);
  const emojiStartAngle = 180 - ((180 - emojiArcSpan) / 2);

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`scale(1,-1) translate(0,-${svgHeight})`}>
        {segments}
        <line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="black"
          strokeWidth="6"
        />
        <circle cx={cx} cy={cy} r="8" fill="black" />
      </g>
      {smileyReviews.map((src, index) => {
        const reversedIndex = numEmojis - 1 - index;
        const emojiAngle = emojiStartAngle - reversedIndex * emojiAngleIncrement;
        const emojiPos = polarToCartesian(cx, cy + emojix, outerRadius + emojir, emojiAngle);
        return (
          <image
            key={index}
            href={src}
            x={emojiPos.x - 15}
            y={emojiPos.y - 15}
            width="30"
            height="30"
          />
        );
      })}
    </svg>
  );
};

export default Speedometer;