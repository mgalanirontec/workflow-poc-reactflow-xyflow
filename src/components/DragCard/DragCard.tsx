import type { NodeType } from '../../types';

interface DragCardProps {
  onDragStart: (event: React.DragEvent, nodeType: NodeType, config?: any) => void;
  type: NodeType;
  label: string;
}

const DragCard = (props: DragCardProps): JSX.Element => {

  const {
    onDragStart,
    type,
    label,
  } = props;

  const getBgColor = (nodeType: NodeType): string => {
    switch (nodeType) {
      case 'input':
        return '#e3f2fd';
      case 'output':
        return '#e8f5e8';
      case 'default':
        return '#f3e5f5';
      case 'multi-handle-card':
        return '#fce4ec';
      default:
        return '#e3f2fd';
    }
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      style={{
        padding: '6px 12px',
        backgroundColor: getBgColor(type),
        border: '1px solid #1976d2',
        borderLeft: '10px solid #1976d2',
        borderRadius: '4px',
        cursor: 'grab',
        textAlign: 'center',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        gap: '6px'
      }}
    > 
      <p style={{ fontSize: '14px', fontWeight: 'bold', width: '100%' }}>{label}</p>
      <div style={{ fontSize: '18px', color: '#1976d2', }}>=</div>
    </div>
  );
}

export default DragCard;