import { Button } from "@components/ui/button";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { getIsPaused, getTime, togglePlayPause } from "@store/playback-slice";
import { getAllTimelines } from "@store/timeline-slice";
import { getFormattedTime } from "@utils/time";

export const PlayButton = () => {
  const dispatch = useAppDispatch()
  const time = useAppSelector(getTime)
  const isPaused = useAppSelector(getIsPaused)
  const timelines = useAppSelector(getAllTimelines)

  const [hours, minutes, seconds] = getFormattedTime(time).split(':')

  return (
    <Button className="flex gap-1 h-8 px-3 justify-between " onClick={() => dispatch(togglePlayPause())} disabled={!timelines.length}>
      {isPaused ? <PauseIcon className="h-4 w-4"/> : <PlayIcon className="h-4 w-4"/>}
      <div className="text-xs flex">
        <div className="w-4 mx-auto">{hours}</div>
        <div className="w-1">:</div>
        <div className="w-4 mx-auto">{minutes}</div>
        <div className="w-1">:</div>
        <div className="w-4 mx-auto">{seconds}</div>
      </div>
    </Button>
  )
}