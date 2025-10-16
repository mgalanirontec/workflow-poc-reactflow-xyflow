import type { Edge, EdgeTypes } from '@xyflow/react';

import { StepEdge } from './StepEdge';
import StatusEdge from './StatusEdge';

export const initialEdges: Edge[] = [];

export const edgeTypes = {
  'step-edge': StepEdge,
  'status-edge': StatusEdge,
  // Add your custom edge types here!
} satisfies EdgeTypes;
