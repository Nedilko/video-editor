import { Button } from "@components/ui/button";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const PlayButton = () => {
  const time = "04:10"
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)
  }


  return <Button className="rounded-full flex gap-1 h-8 px-3" onClick={handlePlayClick}>
    {isPlaying ? <PauseIcon className="h-4 w-4"/> : <PlayIcon className="h-4 w-4"/>}
    <div className="text-xs">
      {time}
    </div>
  </Button>
}