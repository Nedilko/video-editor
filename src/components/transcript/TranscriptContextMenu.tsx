import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@components/ui/context-menu";
import { PropsWithChildren } from "react";

type Props = {
  onMute: () => void
  onInfo: () => void
}

export const TranscriptContextMenu = ({ children, onInfo, onMute }: PropsWithChildren<Props>) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="text-text" onClick={onInfo}>Info</ContextMenuItem>
        <ContextMenuItem className="text-destructive" onClick={onMute}>Mute</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}