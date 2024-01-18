import { Layout } from "@components/layout/layout";
import { ThemeProvider } from "@components/theme/theme-provider";
import { Toaster } from "@components/toast/toast-provider";
import { Sidebar } from "@components/transcript/Sidebar";
import { Editor } from "@components/video-player/Editor";

function App() {
  return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Layout>
      <div className="flex gap-2">
        <Editor/>
        <Sidebar/>
      </div>
    </Layout>
    <Toaster/>
  </ThemeProvider>
}

export default App
