import { Layout } from "@components/layout/layout";
import { ThemeProvider } from "@components/theme/theme-provider";
import { Transcript } from "@components/transcript/Transcript";
import { Editor } from "@components/video-player/Editor";

function App() {
  return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Layout>
      <div className="flex gap-2 h-full">
        <Editor/>
        <Transcript/>
      </div>
    </Layout>
  </ThemeProvider>
}

export default App
