import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { Controls } from "@components/video-player/Controls/Controls";
import { Properties } from "@components/video-player/Properties/Properties";
import { Timeline } from "@components/video-player/Timeline/Timeline";
import { VideoView } from "@components/video-player/VideoView";
import { CONTAINER_PADDING } from "@components/video-player/Timeline/constants";

export const Editor = () => {
  return <div className="flex flex-col flex-1 min-w-[700px] border rounded-md overflow-auto">
    <VideoView/>
    <div className="mt-2 ml-4 mr-8">
      <Controls/>
    </div>
    <div className="mt-2 pl-4 py-1 border-t border-b">
      <Properties/>
    </div>
    <ScrollArea className="min-h-auto max-h-[320px] mt-4"
                style={{ marginLeft: CONTAINER_PADDING, marginRight: CONTAINER_PADDING, paddingBottom: 10 }}>
      <Timeline/>
      <ScrollBar orientation="vertical"/>
    </ScrollArea>
  </div>
}
