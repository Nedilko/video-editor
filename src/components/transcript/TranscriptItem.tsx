import { TranscriptInfoDialog } from "@components/Dialogs/TranscriptInfoDialog";
import { TranscriptContextMenu } from "@components/transcript/TranscriptContextMenu";
import { TranscriptText } from "@components/transcript/TranscriptText";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { useDisclosure } from "@hooks/useDisclosure";
import { setTime } from "@store/playback-slice";
import { getAllTimelines, toggleMuteSubtitle } from "@store/timeline-slice";
import { getFormattedTime } from "@utils/time";
import { cn } from "@utils/ui";
import { forwardRef } from "react";
import { VolumeX } from 'lucide-react'

type Props = {
  mediaId: string
  id: string
  active: boolean
  firstname: string
  lastname: string
  start: number
  end: number
  searchText: string
  text: string
  isMuted: boolean
}

export const TranscriptItem = forwardRef<HTMLDivElement, Props>(({
                                                                   mediaId,
                                                                   id,
                                                                   active,
                                                                   firstname,
                                                                   lastname,
                                                                   text,
                                                                   start,
                                                                   end,
                                                                   searchText,
                                                                   isMuted,
                                                                 }, ref) => {
  const dispatch = useAppDispatch()
  const selectedTimeline = useAppSelector(getAllTimelines)[0]
  const [isInfoModalOpened, { open: openInfoDialog, close: closeInfoDialog }] = useDisclosure()

  const handleClick = () => {
    dispatch(setTime(start))
  }

  const handleMute = async () => {
    if (selectedTimeline) {
      dispatch(toggleMuteSubtitle({ id: mediaId, subtitleId: id }))
    }
  }

  return (
    <TranscriptContextMenu onMute={handleMute} onInfo={openInfoDialog}>
      <div ref={ref}
           className={cn("flex flex-col gap-2 transition-all cursor-pointer hover:bg-muted py-1 px-2", {
             "border-l border-l-red-500 rounded-tr rounded-br": active,
             "border-l border-l-transparent rounded": !active,
           })}
           onClick={handleClick}>
        <div className="flex flex-row gap-2 items-center">
          <div
            className="flex items-center justify-center rounded-full bg-accent w-6 h-6 text-sm">{firstname.charAt(0)}{lastname.charAt(0)}</div>
          <div className={cn("font-bold text-sm text-muted-foreground", {
            "text-text": active,
          })}>{firstname} {lastname}</div>
          <div className="text-muted-foreground text-sm">{getFormattedTime(start)}</div>
          {isMuted && <VolumeX size={16} className="text-sm stroke-destructive"/>}
        </div>
        <div className={cn("ml-8 text-sm text-muted-foreground", {
          "text-text": active,
        })}>
          <TranscriptText text={text} searchText={searchText}/>
        </div>
      </div>
      <TranscriptInfoDialog open={isInfoModalOpened} onClose={closeInfoDialog} id={id} start={start} end={end}/>
    </TranscriptContextMenu>
  )
})
