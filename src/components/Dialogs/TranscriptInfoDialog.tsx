import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@components/ui/dialog";
import { Label } from "@components/ui/label";

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
  start: number;
  end: number;
}
export const TranscriptInfoDialog = ({ open, onClose, id, start, end }: Props) => {
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transcript item id: {id}</DialogTitle>
          <DialogDescription className="flex flex-col gap-2 pt-8">
            <Label>Starts at: {start}s</Label>
            <Label>Ends at: {end}s</Label>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}