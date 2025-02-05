import { useEffect } from 'react';

export default function useDebounedFunction(fn: Function, delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => fn(), delay);
    return () => clearTimeout(handler);
  }, [fn, delay]);
}
