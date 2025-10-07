import type { Node, BuiltInNode } from '@xyflow/react';
import { NodeData } from '../../types';

export type MultiHandleCardNode = Node<NodeData, 'multi-handle-card'>;
export type ASRNode = Node<NodeData, 'asr-input'>;
export type ConversationChainNode = Node<NodeData, 'conversation-chain'>;
export type TtsNode = Node<NodeData, 'tts-output'>;
export type AppNode = BuiltInNode | MultiHandleCardNode | ASRNode | ConversationChainNode | TtsNode;
