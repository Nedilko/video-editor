import { LogoPosition } from "@/types";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import {
  showIntro,
  addLogo,
  getLogoPosition,
  showOutro,
  showSubtitles, setLogoPosition,
  toggleIntro, toggleLogo, toggleOutro,
  toggleSubtitles
} from "@store/properties-slice";
import { getHasMedia } from "@store/timeline-slice";
import { cn } from "@utils/ui";

export const Properties = () => {
  const hasSubtitles = useAppSelector(showSubtitles)
  const hasIntro = useAppSelector(addLogo)
  const hasOutro = useAppSelector(showOutro)
  const hasLogo = useAppSelector(showIntro)
  const logoPosition = useAppSelector(getLogoPosition)
  const dispatch = useAppDispatch()
  const disabled = !useAppSelector(getHasMedia)

  return <div className="flex items-center">
    <Label aria-disabled={disabled} className={cn({
      "text-text": !disabled,
      "text-muted-foreground": disabled,
    })}>Properties:</Label>
    <div className="flex items-center gap-6 ml-4">
      <div className="flex gap-2 items-center">
        <Checkbox disabled={disabled} id="subtitles" checked={hasSubtitles} onCheckedChange={() => dispatch(toggleSubtitles())}/>
        <Label aria-disabled={disabled} htmlFor="subtitles" className={cn({
          "text-muted-foreground": !hasSubtitles,
          "text-text": hasSubtitles,
        }, "text-sm")}>Subtitles</Label>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox disabled={disabled} id="addIntro" checked={hasIntro} onCheckedChange={() => dispatch(toggleIntro())}/>
        <Label aria-disabled={disabled} htmlFor="addIntro" className={cn({
          "text-muted-foreground": !hasIntro,
          "text-text": hasIntro,
        }, "text-sm")}>Add Intro</Label>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox disabled={disabled} id="addOutro" checked={hasOutro} onCheckedChange={() => dispatch(toggleOutro())}/>
        <Label aria-disabled={disabled} htmlFor="addOutro" className={cn({
          "text-muted-foreground": !hasOutro,
          "text-text": hasOutro,
        }, "text-sm")}>Add Outro</Label>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox disabled={disabled} id="addLogoOn" checked={hasLogo} onCheckedChange={() => dispatch(toggleLogo())}/>
        <Label aria-disabled={disabled} htmlFor="addLogoOn" className={cn({
          "text-muted-foreground": !hasLogo,
          "text-text": hasLogo,
        }, "text-sm")}>Add Logo on</Label>
        <Select disabled={!hasLogo || disabled} value={logoPosition} onValueChange={(value) => dispatch(setLogoPosition(value))}>
          <SelectTrigger className="w-[140px] h-8 ">
            <SelectValue placeholder="Top left"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={LogoPosition.TopLeft}>Top Left</SelectItem>
            <SelectItem value={LogoPosition.TopRight}>Top Right</SelectItem>
            <SelectItem value={LogoPosition.BottomLeft}>Bottom Left</SelectItem>
            <SelectItem value={LogoPosition.BottomRight}>Bottom Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

  </div>
}