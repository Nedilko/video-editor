import { Layout } from "@components/layout/layout";
import { ThemeProvider } from "@components/theme/theme-provider";
import { Toaster } from "@components/toast/toast-provider";
import { Sidebar } from "@components/transcript/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/resizable";
import { Editor } from "@components/video-player/Editor";
import { useDisclosure } from "@hooks/useDisclosure";

function App() {
  const [isSidebarOpened, { open: openSidebar, close: closeSidebar }] = useDisclosure(true)
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="panels-position"
          className="flex gap-2"
        >
          <ResizablePanel order={1} id="editor" defaultSize={80} className="border rounded-md">
            <Editor isSidebarOpened={isSidebarOpened} onOpenSidebar={openSidebar}/>
          </ResizablePanel>
          {isSidebarOpened && (
            <>
              <ResizableHandle withHandle/>
              <ResizablePanel order={2} id="sidebar" defaultSize={20} className="border rounded-md" minSize={20} maxSize={40}>
                <Sidebar onClose={closeSidebar}/>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </Layout>
      <Toaster/>
    </ThemeProvider>
  )
}

export default App
