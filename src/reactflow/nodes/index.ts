import type { NodeTypes } from '@xyflow/react';

import { MultiHandleCard } from './MultiHandleCard';
import { ASRNode, ConversationChainNode, TtsNode } from './ConversationalNodes';
import { AppNode } from './types';

export const initialNodes: AppNode[] = [
];

export const nodeTypes = {
  'multi-handle-card': MultiHandleCard,
  'asr-input': ASRNode,
  'conversation-chain': ConversationChainNode,
  'tts-output': TtsNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;