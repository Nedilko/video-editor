import { VideoLoadModal } from "@components/Dialogs/VideoLoadModal";
import { Layout } from "@components/layout/layout";
import { MainView } from "@components/MainView";
import { ThemeProvider } from "@components/theme/theme-provider";
import { Toaster } from "@components/toast/toast-provider";
import { VideoProvider } from "@components/video-player/video-provider";
import { useDisclosure } from "@hooks/useDisclosure";
import { store } from "@store/store";
import { Provider as StoreProvider } from 'react-redux';

function App() {
  const [isLoadingVideoModalOpened, { close: closeLoadingVideoModal }] = useDisclosure(true)

  return (
    <StoreProvider store={store}>
      <VideoProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            <MainView />
            <VideoLoadModal open={isLoadingVideoModalOpened} onClose={closeLoadingVideoModal}/>
          </Layout>
          <Toaster/>
        </ThemeProvider>
      </VideoProvider>
    </StoreProvider>
  )
}

export default App
