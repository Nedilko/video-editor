import { MediaType } from "@/types";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { FilmIcon, MusicIcon } from 'lucide-react'
import { useState } from "react";

type Props = {
  mediaType: MediaType
  startTime: number
  time: number
  endTime: number
  onChange: (values: [number, number, number]) => void
}

export const MediaTimeline = ({ mediaType, startTime, time, endTime, onChange }: Props) => {
  const [min, setMin] = useState(startTime)
  const [max, setMax] = useState(endTime)
  const handleChange = (values: number[]) => {
    const [start, current, end] = values;
    setMin(start)
    setMax(end)
    onChange([start, current, end])
  }

  return (
    <div className="flex">
      <div className="w-6 h-20 bg-muted-foreground/50 flex justify-center items-center">
        {mediaType === 'audio' ? <MusicIcon size={14} /> : <FilmIcon size={14}/> }
      </div>
      {/*<Slider className="border border-secondary" value={[min, time, max]} onValueChange={handleChange}/>*/}
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center border border-secondary"
        value={[min, time, max]} onValueChange={handleChange}
      >
        <SliderPrimitive.Track className="relative h-20 w-full grow overflow-hidden bg-foreground/10">
          <SliderPrimitive.Range className="absolute h-full bg-primary/20" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-[84px] w-2 rounded border border-foreground bg-primary-orange transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
        <SliderPrimitive.Thumb className="block h-24 w-1 bg-primary transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
        <SliderPrimitive.Thumb className="block h-[82px] w-2 rounded border border-foreground bg-primary-orange transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  )
}