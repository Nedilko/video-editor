import { Sidebar } from "@components/transcript/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/resizable";
import { Editor } from "@components/video-player/Editor";
import { useAppDispatch } from "@hooks/store";
import { useIsSidebarOpened } from "@hooks/useIsSidebarOpened";
import { deselectTimeline } from "@store/timeline-slice";

export const MainView = () => {
  const dispatch = useAppDispatch()
  const [isSidebarOpened, { openSidebar, closeSidebar }] = useIsSidebarOpened()

  const handleDeselectTimeline = () => {
    dispatch(deselectTimeline())
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="panels-position"
      className="flex gap-2 min-w-[1000px] overflow-x-scroll"
    >
      <ResizablePanel
        id="editor"
        order={1}
        defaultSize={80}
        className="border rounded-md"
        onClick={handleDeselectTimeline}
      >
        <Editor isSidebarOpened={isSidebarOpened} onOpenSidebar={openSidebar}/>
      </ResizablePanel>
      {isSidebarOpened && (
        <>
          <ResizableHandle withHandle/>
          <ResizablePanel
            id="sidebar"
            order={2}
            defaultSize={20}
            className="border rounded-md"
            minSize={20}
            maxSize={40}
          >
            <Sidebar onClose={closeSidebar}/>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}