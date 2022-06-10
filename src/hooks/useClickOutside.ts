/* eslint-disable no-unused-vars */
import { RefObject, useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

function useClickOutside(refs: RefObject<HTMLElement>[], handler: (event: AnyEvent) => void): void {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i]?.current;

        if (!el || el.contains(event.target as Node)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
}

export default useClickOutside;