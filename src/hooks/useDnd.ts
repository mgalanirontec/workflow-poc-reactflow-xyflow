import { useContext } from 'react';
import { DnDContext } from '../components/DnDContext/DnDContext';

export const useDnD = (): [string | null, (type: string | null) => void] => {
  return useContext(DnDContext);
}