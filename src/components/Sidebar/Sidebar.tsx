import { useState, useEffect } from 'react';
import type { AppNode } from '../../reactflow/nodes/types';
import { useDnD } from '../../hooks/useDnd';
import { NodeType } from '../../types';
import {
  SidebarContainer,
  SidebarHeader,
  NodeTypeBadge,
  SidebarContent,
  FormGroup,
  SidebarInfo,
} from './Sidebar.styles';
import DragCard from '../DragCard/DragCard';

interface SidebarProps {
  selectedNode: AppNode | null;
  onNodeUpdate: (nodeId: string, newData: any) => void;
  onNodeDelete: (nodeId: string) => void;
}

const Sidebar = (props: SidebarProps): JSX.Element => {

  const {
    selectedNode,
    onNodeUpdate,
    onNodeDelete,
  } = props;

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [, setType] = useDnD();

  useEffect(() => {
    if (selectedNode) {
      setLabel((selectedNode.data as any)?.label || '');
      setDescription((selectedNode.data as any)?.description || '');
    } else {
      setLabel('');
      setDescription('');
    }
  }, [selectedNode]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, { label: newLabel });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, { description: newDescription });
    }
  };

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    setType(nodeType);
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <h3>Nodos</h3>
      </SidebarHeader>
      <SidebarContent>
        <FormGroup>
          <label>Arrastra para agregar nodos:</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <DragCard
              onDragStart={onDragStart}
              type="asr-input"
              label="🧠 ASR Input"
            />
            <DragCard
              onDragStart={onDragStart}
              type="conversation-chain"
              label="🔗 Conversation Chain"
            />
            <DragCard
              onDragStart={onDragStart}
              type="tts-output"
              label="📤 TTS Output"
            />
            <DragCard
              onDragStart={onDragStart}
              type="multi-handle-card"
              label="🔄 Multi Handle Card"
            />
          </div>
        </FormGroup>
      </SidebarContent>
      {selectedNode && (
        <>
          <SidebarHeader>
            <h3>Propiedades</h3>
            <NodeTypeBadge>{selectedNode.type || 'default'}</NodeTypeBadge>
          </SidebarHeader>
          <SidebarContent>
            <FormGroup>
              <label htmlFor="node-label">Label</label>
              <input
                id="node-label"
                type="text"
                value={label}
                onChange={handleLabelChange}
                placeholder="Nombre del nodo"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="node-description">Description</label>
              <textarea
                id="node-description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder='Descripción del nodo...'
                rows={4}
              />
              <button
                onClick={() => onNodeDelete(selectedNode.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#fff',
                  color: '#f44336',
                  border: '1px solid #f44336',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginTop: '12px',
                }}
              >
                🗑️ Eliminar Nodo
              </button>
            </FormGroup>
            <SidebarInfo>
              <small>ID: {selectedNode.id}</small>
            </SidebarInfo>
          </SidebarContent>
        </>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;