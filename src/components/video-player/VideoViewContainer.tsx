import { AspectRatio } from "@components/ui/aspect-ratio";
import { useAppDispatch } from "@hooks/store";
import { togglePlayPause } from "@store/playback-slice";
import { ReactNode, useCallback, useEffect } from "react";

type Props = {
  children: ReactNode
}

export const VideoViewContainer = ({children}: Props) => {
  const dispatch = useAppDispatch()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case ' ':
        e.preventDefault()
        e.stopPropagation()
        dispatch(togglePlayPause())
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
      <div className="bg-background" onClick={() => dispatch(togglePlayPause())}>
        <AspectRatio ratio={16 / 9} className="flex justify-center">
          {children}
        </AspectRatio>
      </div>
    </div>
  )
}