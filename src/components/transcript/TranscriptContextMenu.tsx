import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "@components/ui/context-menu";
import { VolumeX } from "lucide-react";
import { PropsWithChildren } from "react";

type Props = {
  onMute: () => void
  onInfo: () => void
  onSeekTo: () => void
}

export const TranscriptContextMenu = ({ children, onInfo, onMute, onSeekTo }: PropsWithChildren<Props>) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="text-text" onClick={onInfo}>Info</ContextMenuItem>
        <ContextMenuItem className="text-text" onClick={onSeekTo}>Seek to this item</ContextMenuItem>
        <ContextMenuSeparator/>
        <ContextMenuItem className="text-destructive" onClick={onMute}><VolumeX size={16} className="text-sm stroke-destructive mr-2"/> Mute</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}