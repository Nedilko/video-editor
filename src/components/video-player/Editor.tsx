import { MediaFileData, MediaType } from "@/types";
import { Button } from "@components/ui/button";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { Controls } from "@components/video-player/Controls/Controls";
import { Properties } from "@components/video-player/Properties/Properties";
import { Timeline } from "@components/video-player/Timeline/Timeline";
import { VideoView } from "@components/video-player/VideoView";
import { CONTAINER_PADDING } from "@components/video-player/Timeline/constants";
import { PlusIcon } from 'lucide-react';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const Editor = () => {

  const DURATION = 200
  const [mediaFiles, setMediaFiles] = useState<MediaFileData[]>([
    {
      id: uuidv4(),
      start: 40,
      end: 150,
      duration: DURATION,
      type: MediaType.Video,
      name: 'video.mp4',
      url: '',
    },
    {
      id: uuidv4(),
      start: 50,
      end: 130,
      duration: 250,
      type: MediaType.Audio,
      name: 'audio.mp4',
      url: '',
    }
  ])

  const handleAddMedia = () => {
    setMediaFiles((prev) => [...prev, {
      id: uuidv4(),
      start: 10,
      end: 180,
      duration: 300,
      type: MediaType.Video,
      name: 'video.mp4',
      url: '',
    }])
  }

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
      <Timeline files={mediaFiles} />
      <ScrollBar orientation="vertical"/>
    </ScrollArea>
    <div className="flex justify-center">
      <Button variant="outline" className="mt-2 flex gap-2 rounded-full h-8" onClick={handleAddMedia}>
        <PlusIcon size={16}/>
        <span>Add Media</span>
      </Button>
    </div>
  </div>
}
