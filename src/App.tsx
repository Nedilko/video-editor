import { Layout } from "@components/layout/layout";
import { ThemeProvider } from "@components/theme/theme-provider";
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
  </ThemeProvider>
}

export default App
