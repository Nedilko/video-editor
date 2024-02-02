import { MediaType } from "@/types";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  getMediaOutName, getVideoUrl,
  loadMediaMetadata,
  loadSubtitlesMetadata,
} from "@components/video-player/Timeline/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { useVideo } from "@hooks/useVideo";
import { getTime, setAudioSrc, setEnd, setVideoSrc } from "@store/playback-slice";
import { createTimeline, selectTimeline, updateTimelineDuration } from "@store/timeline-slice";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

type Props = {
  onClose: () => void;
}

const FormSchema = z.object({
  media: z.instanceof(File, {
    message: "Please provide media file.",
  }),
  subtitles: z.instanceof(File, {
    message: "Please provide subtitles file.",
  }),
})

type FormValues = z.infer<typeof FormSchema>

export const NewTimelineModal = ({ onClose }: Props) => {
  const { write, convert, getData } = useVideo()
  const dispatch = useAppDispatch()
  const currentTime = useAppSelector(getTime)
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }

  const handleSubmit = async ({ media, subtitles }: FormValues) => {
    try {
      const [{ duration }, subtitlesData] = await Promise.all([loadMediaMetadata(media), loadSubtitlesMetadata(subtitles)])
      const id = uuidv4()
      const outName = getMediaOutName(id)

      await write(URL.createObjectURL(media), media.name)
      await convert(media.name, outName)
      const videoData = await getData(outName)
      const audioData = await getData('audio.m4a')

      const videoUrl = getVideoUrl(videoData)
      const audioUrl = URL.createObjectURL(new Blob([audioData], { type: 'audio/m4a' }))

      dispatch(createTimeline({
        id,
        type: MediaType.Video,
        name: media.name,
        url: videoUrl,
        start: currentTime,
        end: currentTime + duration,
        duration: duration,
        subtitles: subtitlesData.subtitles
      }))

      dispatch(selectTimeline(id))
      dispatch(updateTimelineDuration())
      dispatch(setVideoSrc(videoUrl))
      dispatch(setAudioSrc(audioUrl))
      dispatch(setEnd(duration))
      toast.success('Timeline added', {
        action: {
          label: 'close',
          onClick: () => {
          }
        },
      })
    } catch (e) {
      console.error(e)
      toast.error('Filed to load files', {
        action: {
          label: 'close',
          onClick: () => {
          }
        },
      })
    } finally {
      onClose()
    }
  }

  return (
    <Dialog defaultOpen={true} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mx-auto">Add new timeline</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-wull space-y-2">
              <FormField
                control={form.control}
                name="media"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required={true}>Add video file<span
                      className="text-red-500 ml-1">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(event) => {
                          field.onChange(event.target.files?.[0])
                        }}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-required={true}>Add subtitles file<span
                      className="text-red-500 ml-1">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".vtt,.srt"
                        onChange={(event) => {
                          field.onChange(event.target.files?.[0])
                        }}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4 w-full">
                <Button type="submit" className="flex w-[80px]" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader className=" w-4 h-4 mr-2 animate-spin-slow"/>}
                  Add
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
