import { BaseEdge, type EdgeProps } from '@xyflow/react';

export function StepEdge({ id, sourceX, sourceY, targetX, targetY } : EdgeProps) {
  const centerX = (targetX - sourceX) / 2 + sourceX;

  const edgePath = `M ${sourceX} ${sourceY} L ${centerX} ${sourceY} L ${centerX} ${targetY} L ${targetX} ${targetY}`;

  return <BaseEdge id={id} path={edgePath} />;
}