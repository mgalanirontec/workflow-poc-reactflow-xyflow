import { Connection, Node, Edge } from "@xyflow/react";

export const isValidConnection = (
  edge: Edge | Connection,
  nodes: Node[],
) => {
  const sourceNode = nodes.find((node) => node.id === edge.source);
  const targetNode = nodes.find((node) => node.id === edge.target);

  if (!sourceNode || !targetNode) {
    return false;
  }

  if (sourceNode.type === 'conversation-chain' && targetNode.type !== 'tts-output') {
    return false;
  }

  return true;
};

export const getConnectionError = (
  connection: { source: string; target: string },
  nodes: Node[]
): string | null => {
  const sourceNode = nodes.find((node) => node.id === connection.source);
  const targetNode = nodes.find((node) => node.id === connection.target);

    if (!sourceNode || !targetNode) {
      return 'Nodos no encontrados';
    }

    if (sourceNode.type === 'conversation-chain' && targetNode.type !== 'tts-output') {
      return 'Conversation Chain solo puede conectarse a TTS Output';
    }

    return null;
}