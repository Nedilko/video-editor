import { useCallback, useState } from 'react';

export const useDisclosure = (isDefaultOpen: boolean = false) => {
  const [opened, setOpened] = useState(isDefaultOpen);

  const open = useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        return true
      }
      return isOpened
    });
  }, [])

  const close = useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        return false
      }
      return isOpened
    });
  }, [])

  const toggle = useCallback(() => {
    opened ? close() : open()
  }, [close, open, opened])

  return [opened, {
    open,
    close,
    toggle
  }] as const;
};