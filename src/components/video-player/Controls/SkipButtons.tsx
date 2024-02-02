import { Button } from "@components/ui/button";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { goToEnd, goToStart } from "@store/playback-slice";
import { getAllTimelines } from "@store/timeline-slice";
import { SkipBackIcon, SkipForwardIcon } from "lucide-react";

export const SkipButtons = () => {
  const dispatch = useAppDispatch()
  const timelines = useAppSelector(getAllTimelines)

  return (
    <div className="flex">
      <Button
        className="flex h-8 px-3"
        onClick={() => dispatch(goToStart())}
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        disabled={!timelines.length}
      >
        <SkipBackIcon className="h-4 w-4"/>
      </Button>
      <div className="w-px h-full bg-accent" />
      <Button
        className="flex h-8 px-3"
        onClick={() => dispatch(goToEnd())}
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        disabled={!timelines.length}
      >
        <SkipForwardIcon className="h-4 w-4"/>
      </Button>
    </div>
  )
}