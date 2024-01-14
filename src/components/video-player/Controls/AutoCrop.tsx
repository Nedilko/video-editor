import { Label } from "@components/ui/label";
import { Switch } from "@components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import { cn } from "@utils/ui";
import { useState } from "react";
import {QuestionMarkCircledIcon} from '@radix-ui/react-icons'

export const AutoCrop = () => {
  const [autoCrop, setAutoCrop] = useState(false)

  const handleSetAutoCrop = () => {
    setAutoCrop(!autoCrop)
  }

  return <div className="flex items-center gap-2">
    <Label className={cn({
      "text-muted-foreground": !autoCrop,
      "text-text": autoCrop,
    }, "text-sm")}>Auto Crop</Label>
    <Switch
      checked={autoCrop}
      onCheckedChange={handleSetAutoCrop}
    />
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <QuestionMarkCircledIcon color="gray"/>
        </TooltipTrigger>
        <TooltipContent className="bg-popover">
          <p>Crops when no voice at the start or at the end of video</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
}