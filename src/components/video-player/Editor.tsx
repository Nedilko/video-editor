import { MediaFileData, MediaType } from "@/types";
import { Button } from "@components/ui/button";
import { Controls } from "@components/video-player/Controls/Controls";
import { Properties } from "@components/video-player/Properties/Properties";
import { Timeline } from "@components/video-player/Timeline/Timeline";
import { VideoView } from "@components/video-player/VideoView";
import { CONTAINER_PADDING } from "@components/video-player/Timeline/constants";
import { PlusIcon, SidebarCloseIcon } from 'lucide-react';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type Props = {
  isSidebarOpened: boolean
  onOpenSidebar: () => void
}
export const Editor = ({ isSidebarOpened, onOpenSidebar }: Props) => {

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
    },
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

  const handleFileRemove = (id: string) => {
    setMediaFiles((prev) => prev.filter((file) => file.id !== id))
  }

  return <div className="flex flex-col relative group">
    {!isSidebarOpened && <div
        className="w-8 h-8 opacity-0 group-hover:opacity-100 bg-secondary transition-all ease-in-out delay-150 duration-300 absolute right-0 translate-y-8 rounded-tl-md rounded-bl-md border-border shadow-xl"
        onClick={onOpenSidebar}
    >
        <SidebarCloseIcon className="w-4 h-4 m-2"/>
    </div>}
    <VideoView/>
    <div className="mt-2 ml-4 mr-8">
      <Controls/>
    </div>
    <div className="mt-2 pl-4 py-1 border-t border-b">
      <Properties/>
    </div>
    <div
      className="mt-4 relative overflow-hidden"
      style={{ marginLeft: CONTAINER_PADDING, marginRight: CONTAINER_PADDING, paddingBottom: 10 }}
    >
      <div className="h-full w-full overflow-y-scroll min-h-auto max-h-[320px]">
        <Timeline files={mediaFiles} onRemoveFile={handleFileRemove}/>
      </div>
    </div>
    <div className="flex justify-center">
      <Button variant="outline" className="mt-2 flex gap-2 rounded-full h-8" onClick={handleAddMedia}>
        <PlusIcon size={16}/>
        <span>Add Media</span>
      </Button>
    </div>
  </div>
}
