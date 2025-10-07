import { Handle, Position, type NodeProps } from '@xyflow/react';
import { type ASRNode as ASRNodeType, type ConversationChainNode as ConversationChainNodeType, type TtsNode as TtsNodeType } from './types';

export function ASRNode({ data }: NodeProps<ASRNodeType>) {
  return (
    <div className="cardBase">
      <div className="cardHeader">
        <div className="icon">
          🧠
        </div>
        <span>
          {data.label || 'ASR'}
        </span>
      </div>

      <div className="cardContent">
        <p>
          {data.description || 'Wrapper around OpenAI Chat large language models.'}
        </p>
        <div className="contentOptions">
          <div>
            <label>
              Model name
            </label>
            <select>
              <option>gpt-3.5-turbo</option>
              <option>gpt-4</option>
            </select>
          </div>
          <div>
            <label>
              Temperature
            </label>
            <input
              type="text"
              defaultValue="0.7"
            />
          </div>
          <div>
            <label>
              OpenAI API Key
            </label>
            <input
              type="password"
              defaultValue="••••••••••••••••••••••••"
            />
          </div>
          <div>
            <label>
              Max tokens
            </label>
            <input
              type="text"
              placeholder="Type a integer number"
            />
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="handleBase"
      />
    </div>
  );
}

export function ConversationChainNode({ data }: NodeProps<ConversationChainNodeType>) {
  return (
    <div className='cardBase'>
      <div className="cardHeader">
        <div className="icon">
          🔗
        </div>
        <span>
          {data.label || 'ConversationChain'}
        </span>
      </div>
      <div className="cardContent">
        <p>
          {data.description || 'Chain to have a conversation and load context from memory.'}
        </p>
        <div className="contentOptions">
          <div>
            <label>
              Memory
            </label>
            <div className="cellBase">
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981'
              }}></div>
              <span>Memory</span>
            </div>
          </div>
          <div>
            <label>
              LLM
            </label>
            <div className="cellBase">
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981'
              }}></div>
              <span>Llm</span>
            </div>
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="handleBase"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="handleBase"
      />
    </div>
  );
}

export function TtsNode({ data }: NodeProps<TtsNodeType>) {
  return (
    <div className='cardBase'>
      <div className='cardHeader'>
        <div className='icon'>
          📤
        </div>
        <span>
          {data.label || 'Output'}
        </span>
      </div>
      <div className='cardContent'>
        <p>
          {data.description || 'Final output node for delivering processed results.'}
        </p>
        {/* Configuration */}
        <div className='contentOptions'>
          <div>
            <label>
              Output Format
            </label>
            <select>
              <option>JSON</option>
              <option>Text</option>
              <option>Audio</option>
            </select>
          </div>
          <div>
            <label>
              Status
            </label>
            <div className='cellBase'>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e'
              }}></div>
              <span>Ready</span>
            </div>
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className='handleBase'
      />
    </div>
  );
}