import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";

export const DurationInput = () => {
  const start = "00:00"
  const end = "18:59"

  return <div className="flex items-center gap-2">
    <Label className="text-sm text-muted-foreground">Start</Label>
    <div className="text-sm text-muted-foreground bg-muted p-1 rounded-sm">{start}</div>
    <Separator orientation="horizontal" className="h-px w-2 bg-muted-foreground"/>
    <Label className="text-sm text-muted-foreground">End</Label>
    <div className="text-sm text-muted-foreground bg-muted p-1 rounded-sm">{end}</div>
  </div>
}