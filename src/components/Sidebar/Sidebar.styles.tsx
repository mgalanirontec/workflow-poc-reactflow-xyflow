import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  width: 300px;
  height: 100vh;
  background: #ffffff;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
SidebarContainer.displayName = 'SidebarContainer';

export const SidebarEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #6b7280;
`;
SidebarEmpty.displayName = 'SidebarEmpty';

export const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }
`;
SidebarHeader.displayName = 'SidebarHeader';

export const NodeTypeBadge = styled.span`
  background: #e0e7ff;
  color: #4338ca;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
`;  
NodeTypeBadge.displayName = 'NodeTypeBadge';

export const SidebarContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;
SidebarContent.displayName = 'SidebarContent';

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;  
FormGroup.displayName = 'FormGroup';

export const SidebarInfo = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;

  small {
    color: #6b7280;
    font-size: 12px;
  }
`;
SidebarInfo.displayName = 'SidebarInfo';