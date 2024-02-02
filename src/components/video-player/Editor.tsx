import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/resizable";
import { AddMediaButton } from "@components/video-player/Controls/AddMediaButton";
import { Controls } from "@components/video-player/Controls/Controls";
import { Properties } from "@components/video-player/Properties/Properties";
import { Timeline } from "@components/video-player/Timeline/Timeline";
import { CONTAINER_PADDING } from "@components/video-player/Timeline/constants";
import { VideoView } from "@components/video-player/VideoView";
import { SidebarCloseIcon } from 'lucide-react';

type Props = {
  isSidebarOpened: boolean
  onOpenSidebar: () => void
}
export const Editor = ({ isSidebarOpened, onOpenSidebar }: Props) => {
  return (
    <ResizablePanelGroup
      direction="vertical"
      autoSaveId="panels-position-2"
    >
      <ResizablePanel
        id="video-view"
        order={2}
        minSize={55}
        defaultSize={55}
        className="flex flex-col relative group overflow-y-scroll"
      >
        {!isSidebarOpened && <div
            className="w-8 h-8 opacity-0 group-hover:opacity-100 bg-secondary transition-all ease-in-out delay-150 duration-300 absolute right-0 translate-y-8 rounded-tl-md rounded-bl-md border-border shadow-xl"
            onClick={onOpenSidebar}
        >
            <SidebarCloseIcon className="w-4 h-4 m-2"/>
        </div>}
        <div id="vide-view" className="flex flex-1">
          <VideoView/>
        </div>
        <div className="mt-2 ml-4 mr-8 mb-2">
          <Controls/>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="py-2 border-t border-b"/>
      <ResizablePanel
        order={3}
        id="timeline"
        minSize={30}
        className="flex flex-col relative group"
      >
        <div className="pl-4 py-1 border-b">
          <Properties />
        </div>
        <div
          className="mt-4 relative overflow-hidden"
          style={{ marginLeft: CONTAINER_PADDING, marginRight: CONTAINER_PADDING, paddingBottom: 10 }}
        >
          <div className="h-full w-full overflow-y-scroll overflow-x-hidden min-h-auto max-h-[310px]">
            <Timeline/>
          </div>
        </div>
        <div className="flex justify-center">
          <AddMediaButton/>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
