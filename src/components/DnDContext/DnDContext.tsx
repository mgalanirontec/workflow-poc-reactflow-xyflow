import { createContext, useState } from 'react';

type DnDContextType = [string | null, (type: string | null) => void];

export const DnDContext = createContext<DnDContextType>([null, (_: string | null) => {}]);

interface DnDProviderProps {
  children: React.ReactNode;
}

export const DnDProvider = ({ children }: DnDProviderProps): JSX.Element => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}
