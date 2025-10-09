import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ASRNode } from '../ConversationalNodes';
import { ReactFlowProvider } from '@xyflow/react';

// Necesario nestear componente de ReactFlow en el Provider
const renderWithReactFlow = (component: React.ReactElement) => {
  return render(
    <ReactFlowProvider>
      {component}
    </ReactFlowProvider>
  );
};

const mockNodeData = {
  label: 'Test ASR Node',
  description: 'Test description for ASR node'
};

const mockNodeProps = {
  id: 'test-asr-node',
  data: mockNodeData,
  width: 200,
  height: 100,
  sourcePosition: undefined,
  targetPosition: undefined,
  dragHandle: undefined,
  parentId: undefined,
  type: 'asr-input' as const,
  dragging: false,
  zIndex: 1,
  selectable: true,
  deletable: true,
  selected: false,
  draggable: true,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0
};

describe('ASRNode', () => {
  test('renderiza correctamente con los datos proporcionados', () => {
    renderWithReactFlow(<ASRNode {...mockNodeProps} />);

    // Verificar que el label se muestra correctamente
    expect(screen.getByText('Test ASR Node')).toBeInTheDocument();

    // Verificar que la descripción se muestra
    expect(screen.getByText('Test description for ASR node')).toBeInTheDocument();

  });

  test('renderiza con valores por defecto cuando no se proporcionan datos', () => {
    const propsWithoutData = {
      id: 'test-asr-node-empty',
      data: { label: '' },
      width: 200,
      height: 100,
      sourcePosition: undefined,
      targetPosition: undefined,
      dragHandle: undefined,
      parentId: undefined,
      type: 'asr-input' as const,
      dragging: false,
      zIndex: 1,
      selectable: true,
      deletable: true,
      selected: false,
      draggable: true,
      isConnectable: true,
      positionAbsoluteX: 0,
      positionAbsoluteY: 0
    };

    renderWithReactFlow(<ASRNode {...propsWithoutData} />);

    // Verificar que se muestra el label por defecto
    expect(screen.getByText('ASR')).toBeInTheDocument();

    // Verificar que se muestra la descripción por defecto
    expect(screen.getByText('Wrapper around OpenAI Chat large language models.')).toBeInTheDocument();
  });

  test('contiene todos los campos de configuración esperados', () => {
    renderWithReactFlow(<ASRNode {...mockNodeProps} />);

    // Verificar que están presentes todos los labels de los campos
    expect(screen.getByText('Model name')).toBeInTheDocument();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('OpenAI API Key')).toBeInTheDocument();
    expect(screen.getByText('Max tokens')).toBeInTheDocument();

    // Verificar que existen los inputs correspondientes
    expect(screen.getByDisplayValue('0.7')).toBeInTheDocument(); // Temperature input
    expect(screen.getByDisplayValue('••••••••••••••••••••••••')).toBeInTheDocument(); // API Key input
    expect(screen.getByPlaceholderText('Type a integer number')).toBeInTheDocument(); // Max tokens input
  });

  test('el select de modelo contiene las opciones esperadas', () => {
    renderWithReactFlow(<ASRNode {...mockNodeProps} />);

    // Verificar que el select tiene las opciones correctas
    expect(screen.getByText('gpt-3.5-turbo')).toBeInTheDocument();
    expect(screen.getByText('gpt-4')).toBeInTheDocument();
  });

  test('renderiza con la estructura de clases CSS correcta', () => {
    const { container } = renderWithReactFlow(<ASRNode {...mockNodeProps} />);

    // Verificar que tiene las clases CSS esperadas
    expect(container.querySelector('.cardBase')).toBeInTheDocument();
    expect(container.querySelector('.cardHeader')).toBeInTheDocument();
    expect(container.querySelector('.cardContent')).toBeInTheDocument();
    expect(container.querySelector('.icon')).toBeInTheDocument();
    expect(container.querySelector('.contentOptions')).toBeInTheDocument();
  });

  test('renderiza el Handle con las propiedades correctas', () => {
    const { container } = renderWithReactFlow(<ASRNode {...mockNodeProps} />);

    // Verificar que el Handle está presente con la clase correcta
    expect(container.querySelector('.handleBase')).toBeInTheDocument();
  });
});