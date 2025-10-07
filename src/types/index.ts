export type CustomNodeTypes = 'multi-handle-card' | 'asr-input' | 'conversation-chain' | 'tts-output';
export type NodeType = 'input' | 'output' | 'default' | CustomNodeTypes;

export interface NodeData {
  label: string;
  description?: string;
  parameters?: Record<string, any>;
  type?: NodeType;
  [key: string]: unknown; // Para props dinámicas
}