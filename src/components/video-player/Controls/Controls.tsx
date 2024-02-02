import { AutoCrop } from "@components/video-player/Controls/AutoCrop";
import { DurationInput } from "@components/video-player/Controls/DurationInput";
import { PlayButton } from "@components/video-player/Controls/PlayButton";
import { SkipButtons } from "@components/video-player/Controls/SkipButtons";

export const Controls = () => {


  return <div className="flex">
    <div className="flex flex-1 gap-2">
      <PlayButton/>
      <SkipButtons/>
    </div>
    <div className="flex items-center gap-12">
      <AutoCrop/>
      <DurationInput/>
    </div>
  </div>
}