import { type EdgeProps } from '@xyflow/react';

export default ({ id, sourceX, sourceY, targetX, targetY, sourceHandleId }: EdgeProps) => {
  const strokeColor = sourceHandleId ?? '#b1b1b7';

  const centerX = (targetX - sourceX) / 2 + sourceX;

  const edgePath = `M ${sourceX} ${sourceY} L ${centerX} ${sourceY} L ${centerX} ${targetY} L ${targetX} ${targetY}`;

  return (
    <g>
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        className="animatedEdge"
        d={edgePath}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke={strokeColor}
        strokeWidth={1.5}
      />
    </g>
  );
};
