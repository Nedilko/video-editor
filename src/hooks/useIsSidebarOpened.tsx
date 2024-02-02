import { useCallback, useState } from "react";

const LS_KEY = 'isSidebarOpened'

export const useIsSidebarOpened = () => {
  const [opened, setOpened] = useState(() => {
    const savedValue = localStorage.getItem(LS_KEY)
    return savedValue === 'true' ? true : savedValue === 'false' ? false : !savedValue;
  });

  const openSidebar = useCallback(() => {
    setOpened((isOpened) => {
      localStorage.setItem(LS_KEY, 'true')
      if (!isOpened) {
        return true
      }
      return isOpened
    });
  }, [])

  const closeSidebar = useCallback(() => {
    localStorage.setItem(LS_KEY, 'false')
    setOpened((isOpened) => {
      if (isOpened) {
        return false
      }
      return isOpened
    });
  }, [])

  const toggleSidebar = useCallback(() => {
    opened ? openSidebar() : closeSidebar()
  }, [closeSidebar, openSidebar, opened])

  return [opened, {
    openSidebar,
    closeSidebar,
    toggleSidebar
  }] as const;
}