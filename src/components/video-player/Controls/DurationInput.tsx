import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";
import { useAppSelector } from "@hooks/store";
import { getEnd, getStart } from "@store/playback-slice";
import { getFormattedTime } from "@utils/time";

export const DurationInput = () => {
  const start = getFormattedTime(useAppSelector(getStart))
  const end = getFormattedTime(useAppSelector(getEnd))

  return <div className="flex items-center gap-2">
    <Label className="text-sm text-muted-foreground">Start</Label>
    <div className="text-sm text-muted-foreground bg-muted p-1 rounded-sm">{start}</div>
    <Separator orientation="horizontal" className="h-px w-2 bg-muted-foreground"/>
    <Label className="text-sm text-muted-foreground">End</Label>
    <div className="text-sm text-muted-foreground bg-muted p-1 rounded-sm">{end}</div>
  </div>
}