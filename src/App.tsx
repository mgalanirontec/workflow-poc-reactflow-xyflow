import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Connection,
  type OnConnect,
  type OnConnectEnd,
  type NodeMouseHandler,
  type OnReconnect,
  type Edge,
} from '@xyflow/react';
import type { AppNode } from './reactflow/nodes/types';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './reactflow/nodes';
import { initialEdges, edgeTypes } from './reactflow/edges';
import Sidebar from './components/Sidebar/Sidebar';
import { DnDProvider } from './components/DnDContext/DnDContext';
import { useDnD } from './hooks/useDnd';
import { isValidConnection, getConnectionError } from './utils/validations';

let id = parseInt(localStorage.getItem('workflow-poc-id-counter') || '0', 10);
const getId = () => {
  const currentId = id++;
  localStorage.setItem('workflow-poc-id-counter', id.toString());
  return `dndnode_${currentId}`;
};

// Ubicación LocalStorage
const FLOW_KEY = 'workflow-poc-flow';

const DnDFlow = (): JSX.Element => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<AppNode | null>(null);
  const [rfInstance, setRfInstance] = useState<any>(null);
  const {
    screenToFlowPosition,
    deleteElements,
    updateNode,
    setViewport
  } = useReactFlow();
  const [type] = useDnD();
  const [error, setError] = useState<string | null>(null);

  // LocalStorage flow
  useEffect(() => {
    const savedFlow = localStorage.getItem(FLOW_KEY);
    if (savedFlow) {
      try {
        const flow = JSON.parse(savedFlow);
        if (flow.nodes) setNodes(flow.nodes);
        if (flow.edges) setEdges(flow.edges);
        // El viewport se restaura después de onInit
        if (flow.viewport && rfInstance) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setViewport({ x, y, zoom });
        }
      } catch (error) {
        console.error('Error loading saved flow:', error);
      }
    }
  }, [setNodes, setEdges, setViewport, rfInstance]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(FLOW_KEY, JSON.stringify(flow));
      console.log('Flow saved to localStorage');
    }
  }, [rfInstance]);

  const onClear = useCallback(() => {
    localStorage.removeItem(FLOW_KEY);
    localStorage.removeItem('workflow-poc-id-counter');
    id = 0; // Resetear el contador en memoria
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    console.log('Flow cleared');
  }, [setNodes, setEdges]);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      // Determinar el nodo origen
      const sourceNode = nodes.find(node => node.id === connection.source);

      const edgeType = sourceNode?.type === 'multi-handle-card' ? 'status-edge' : undefined;

      const newEdge = {
        ...connection,
        type: edgeType
      };

      setEdges((edges) => addEdge(newEdge, edges));
    },
    [setEdges, nodes]
  );

  const onReconnect: OnReconnect = useCallback((oldEdge, newConnection) => {
    setEdges((edges) => {
      const filteredEdges = edges.filter((edge) => edge.id !== oldEdge.id);

      // Preservar el tipo de edge del edge original
      const newEdge = {
        ...newConnection,
        type: oldEdge.type
      };
      return addEdge(newEdge, filteredEdges);
    })
  }, [setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedNode(node as AppNode);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onNodeUpdate = useCallback((nodeId: string, newData: any) => {
    updateNode(nodeId, {
      data: newData
    });
  }, [updateNode]);

  const onNodeDelete = useCallback(async (nodeId: string) => {
    await deleteElements({
      nodes: [{ id: nodeId }]
    });
    setSelectedNode(null);
  }, [deleteElements]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: AppNode = {
        id: getId(),
        type: type as any,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, type, setNodes],
  );

  const validateConnection = useCallback((edge: Edge | Connection) => {
    return isValidConnection(edge, nodes);
  }, [nodes]);

  const onConnectEnd: OnConnectEnd = useCallback((event, connectionState) => {
    if (connectionState.fromNode && connectionState.toNode && !connectionState.isValid) {
      const tempConnection = {
        source: connectionState.fromNode.id,
        target: connectionState.toNode.id
      };

      const error = getConnectionError(tempConnection, nodes);
      if (error) {
        setError(error);
        setTimeout(() => setError(null), 3000);
      }
    }
  }, [nodes]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={{ type: 'step-edge' }}
          isValidConnection={validateConnection}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setRfInstance}
          onReconnect={onReconnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
          <Panel position="top-left">
            <div className="panel">
              <button
                onClick={onSave}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                title="Save flow to localStorage"
              >
                💾 Save
              </button>
              <button
                onClick={onClear}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                title="Clear all nodes and edges"
              >
                🗑️ Clear
              </button>
            </div>
          </Panel>
          { error && (
            <Panel position="top-right">
            <div className="panel">
              <p style={{ fontSize: '12px', color: '#dc2626', margin: 0 }}>⚠️ {error}</p>
            </div>
          </Panel>
          )}
        </ReactFlow>
      </div>
      <Sidebar
        selectedNode={selectedNode}
        onNodeUpdate={onNodeUpdate}
        onNodeDelete={onNodeDelete}
      />
    </div>
  );
}

export default function App() {
  return (
    <DnDProvider>
      <ReactFlowProvider>
        <DnDFlow />
      </ReactFlowProvider>
    </DnDProvider>
  );
}