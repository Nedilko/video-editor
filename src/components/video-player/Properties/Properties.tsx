import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { cn } from "@utils/ui";
import { useState } from "react";

export const Properties = () => {
  const [subtitles, setSubtitles] = useState(false);
  const [addIntro, setAddIntro] = useState(false);
  const [addOutro, setAddOutro] = useState(false);
  const [addLogoOn, setAddLogoOn] = useState(false);

  return <div className="flex items-center">
    <Label className="text-text">Properties:</Label>
    <div className="flex items-center gap-8 ml-4">
      <div className="flex gap-2 items-center">
        <Checkbox id="subtitles" checked={subtitles} onCheckedChange={value => setSubtitles(value === true)}/>
        <Label htmlFor="subtitles" className={cn({
          "text-muted-foreground": !subtitles,
          "text-text": subtitles,
        }, "text-sm")}>Subtitles</Label>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox id="addIntro" checked={addIntro} onCheckedChange={value => setAddIntro(value === true)}/>
        <Label htmlFor="addIntro" className={cn({
          "text-muted-foreground": !addIntro,
          "text-text": addIntro,
        }, "text-sm")}>Add Intro</Label>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox id="addOutro" checked={addOutro} onCheckedChange={value => setAddOutro(value === true)}/>
        <Label htmlFor="addOutro" className={cn({
          "text-muted-foreground": !addOutro,
          "text-text": addOutro,
        }, "text-sm")}>Add Outro</Label>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox id="addLogoOn" checked={addLogoOn} onCheckedChange={value => setAddLogoOn(value === true)}/>
        <Label htmlFor="addLogoOn" className={cn({
          "text-muted-foreground": !addLogoOn,
          "text-text": addLogoOn,
        }, "text-sm")}>Add Logo on</Label>
        <Select disabled={!addLogoOn}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Top left"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="topLeft">Top Left</SelectItem>
            <SelectItem value="topRight">Top Right</SelectItem>
            <SelectItem value="bottomLeft">Bottom Left</SelectItem>
            <SelectItem value="bottomRight">Bottom Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

  </div>
}