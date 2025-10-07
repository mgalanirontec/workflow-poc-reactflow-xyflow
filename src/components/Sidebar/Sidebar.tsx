// src/components/Sidebar.tsx
import type { Node } from '@xyflow/react';
import { useState, useEffect } from 'react';
import type { NodeData } from '../../types';
import {
  SidebarContainer,
  SidebarEmpty,
  SidebarHeader,
  NodeTypeBadge,
  SidebarContent,
  FormGroup,
  SidebarInfo,
} from './Sidebar.styles';

interface SidebarProps {
  selectedNode: Node<NodeData> | null;
  onNodeUpdate: (nodeId: string, newData: Partial<NodeData>) => void;
}

function Sidebar({ selectedNode, onNodeUpdate }: SidebarProps) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
      setDescription(selectedNode.data.description || '');
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

  if (!selectedNode) {
    return (
      <SidebarContainer>
        <SidebarEmpty>
          <p>Selecciona un nodo para editar sus propiedades</p>
        </SidebarEmpty>
      </SidebarContainer>
    );
  }

  return (
    <SidebarContainer>
      <SidebarHeader>
        <h3>Nodos</h3>
      </SidebarHeader>
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
            placeholder="Descripción del nodo"
            rows={4}
          />
        </FormGroup>
        <SidebarInfo>
          <small>ID: {selectedNode.id}</small>
        </SidebarInfo>
      </SidebarContent>
    </SidebarContainer>
  );
}

export default Sidebar;