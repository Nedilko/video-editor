import { MediaType } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@components/ui/dialog";
import { Label } from "@components/ui/label";

type Props = {
  open: boolean;
  onClose: () => void;
  name: string;
  duration: number;
  start: number;
  end: number;
  url: string;
  type: MediaType
}
export const TimelineInfoDialog = ({ open, onClose, type, name, duration, start, end, url }: Props) => {
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }

  const mediaTypeText = type === MediaType.Video ? 'Video' : 'Audio';

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mediaTypeText} File {name}</DialogTitle>
          <DialogDescription className="flex flex-col gap-2 pt-8">
            <Label>Duration: {duration} seconds</Label>
            <Label>URL: {url}</Label>
            <Label>Starts at: {start}s</Label>
            <Label>Ends at: {end}s</Label>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}