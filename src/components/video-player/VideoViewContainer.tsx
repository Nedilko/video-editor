import { AspectRatio } from "@components/ui/aspect-ratio";
import { EditorContextMenu } from "@components/video-player/EditorContextMenu";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { togglePlayPause } from "@store/playback-slice";
import { getHasMedia } from "@store/timeline-slice";
import { ReactNode, useCallback, useEffect } from "react";

type Props = {
  children: ReactNode
}

export const VideoViewContainer = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const canPlayPause = useAppSelector(getHasMedia)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case ' ':
        e.preventDefault()
        e.stopPropagation()
        if (canPlayPause) {
          dispatch(togglePlayPause())
        }
        break
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="mx-auto h-auto max-w-[800px] w-full">
      <div className="bg-background" onClick={() => {
        if (canPlayPause) {
          dispatch(togglePlayPause())
        }
      }}>
        <EditorContextMenu>
          <AspectRatio ratio={16 / 9} className="flex justify-center">
            {children}
          </AspectRatio>
        </EditorContextMenu>
      </div>
    </div>
  )
}