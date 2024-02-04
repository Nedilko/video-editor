import { Checkbox } from "@components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "@components/ui/context-menu";
import { Label } from "@components/ui/label";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { getIsPaused, goToStart, pause, setEnd, setStart, setVideoSrc, togglePlayPause } from "@store/playback-slice";
import { showSubtitles, toggleSubtitles } from "@store/properties-slice";
import { deselectTimeline, getAllTimelines, getHasMedia, removeTimeline } from "@store/timeline-slice";
import { cn } from "@utils/ui";
import { PropsWithChildren, useCallback } from "react";
import { Play, Pause } from 'lucide-react'
import { toast } from "sonner";

export const EditorContextMenu = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const isPaused = useAppSelector(getIsPaused)
  const hasSubtitles = useAppSelector(showSubtitles)
  const disabled = !useAppSelector(getHasMedia)
  const timelines = useAppSelector(getAllTimelines)

  if (disabled) {
    return <>
      {children}
    </>
  }

  const handleTogglePlayPause = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    dispatch(togglePlayPause())
  } , [])

  const handleRemove = (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    timelines.forEach(timeline => {
      dispatch(removeTimeline(timeline.id))
    })
    dispatch(deselectTimeline())

    dispatch(setVideoSrc(''))
    dispatch(pause())
    dispatch(setStart(0))
    dispatch(setEnd(10))
    dispatch(goToStart())

    toast.error(`All Timelines removed`, {
      action: {
        label: 'close',
        onClick: () => {
        }
      },
    })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="text-muted-foreground" onClick={handleTogglePlayPause}>
          {isPaused ? (
            <div className="flex gap-2 items-center">
              <Pause size={16}/>
              <div>Pause</div>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Play size={16}/>
              <div>Play</div>
            </div>
          )}
        </ContextMenuItem>
        <ContextMenuItem className="text-muted-foreground" onClick={e => e.stopPropagation()}>
          <div className="flex gap-2 items-center">
            <Checkbox id="subtitles" checked={hasSubtitles}
                      onCheckedChange={() => dispatch(toggleSubtitles())}/>
            <Label htmlFor="subtitles" className={cn({
              "text-muted-foreground": !hasSubtitles,
              "text-text": hasSubtitles,
            }, "text-sm")}>Subtitles</Label>
          </div>
        </ContextMenuItem>
        <ContextMenuSeparator/>
        <ContextMenuItem className="text-destructive" onClick={handleRemove}>Remove all</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}