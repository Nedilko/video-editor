import { AutoCrop } from "@components/video-player/Controls/AutoCrop";
import { DurationInput } from "@components/video-player/Controls/DurationInput";
import { PlayButton } from "@components/video-player/Controls/PlayButton";

export const Controls = () => {


  return <div className="flex">
    <div className="flex flex-1 ml-4">
      <PlayButton/>
    </div>
    <div className="flex items-center gap-12  mr-8">
      <AutoCrop/>
      <DurationInput/>
    </div>
  </div>
}