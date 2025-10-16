import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type MultiHandleCardNode } from './types';

export const MultiHandleCard = ({ data }: NodeProps<MultiHandleCardNode>) => {
  const options = [
    { id: 'option-1', label: 'Success Path', color: '#10b981' },
    { id: 'option-2', label: 'Error Path', color: '#ef4444' },
  ];

  return (
    <div className='cardBase'>
      <div className='cardHeader'>
        <div className='icon'>
          🔄
        </div>
        <span>
          {data.label || 'Multi Handle Card'}
        </span>
      </div>

      <div className='cardContent'>
        <p>
          {data.description || 'Multi-path processing node with conditional routing capabilities.'}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map((option) => (
            <div 
              key={option.id} 
              className='optionNodeLabel'
              style={{
                border: `1px solid ${option.color}`
              }}
            >
              <Handle
                type="target"
                position={Position.Left}
                id={`${option.id}-input`}
                className='handleBase'
                style={{
                  background: option.color,
                  left: '-18px'
                }}
              />
                {option.label}
              <Handle
                type="source"
                position={Position.Right}
                id={option.color}
                className='handleBase'
                style={{
                  background: option.color,
                  right: '-18px'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}