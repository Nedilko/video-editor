import { MediaType } from "@/types";
import { MEDIA_TYPE_WIDTH } from "@components/video-player/Timeline/constants";
import { cn } from "@utils/ui";
import { FilmIcon, MusicIcon } from "lucide-react";
import { forwardRef, memo, PropsWithChildren } from "react";

type Props = {
  selected: boolean
  mediaType: MediaType
}

export const Track = memo(forwardRef<HTMLDivElement, PropsWithChildren<Props>>(({ selected, mediaType, children }, ref) => {
  return <div className={cn("flex relative border-l-2 border-transparent", {
    'border-l-2 border-foreground ': selected
  })}>
    <div id="media-type" className="h-[84px] bg-muted-foreground/50 flex justify-center items-center"
         style={{ width: MEDIA_TYPE_WIDTH }}>
      {mediaType === 'audio' ? <MusicIcon color={selected ? "var(--primary-orange)" : 'white'} size={14}/> : <FilmIcon size={14}/>}
    </div>
    <div ref={ref} className="h-[84px] relative flex w-full bg-foreground/10">
      {children}
    </div>
  </div>
}));