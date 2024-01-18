import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@components/ui/context-menu";
import { memo, PropsWithChildren } from "react";

type Props = {
  onRemove: () => void
  onInfo: () => void
}

export const TimelineBarContextMenu = memo(function TimelineBarContextMenu({
                                                                             children,
                                                                             onRemove,
                                                                             onInfo
                                                                           }: PropsWithChildren<Props>) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="text-text" onClick={onInfo}>Info</ContextMenuItem>
        <ContextMenuItem className="text-destructive" onClick={onRemove}>Remove</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
});