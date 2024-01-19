import { Button } from "@components/ui/button";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@components/ui/dialog";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
export const ConfirmRemoveDialog = ({ open, onClose, onConfirm }: Props) => {
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }

  const handleClickOutside = (event: Event) => {
    event.preventDefault()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onPointerDownOutside={handleClickOutside}>
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={() => {
            onConfirm();
            onClose();
          }}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}