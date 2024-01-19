import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@components/ui/dialog";
import { Label } from "@components/ui/label";
import {CheckCircle, AlertCircle} from 'lucide-react'

type Props = {
  isError: boolean;
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export const ExportStatusDialog = ({ isError, open, onClose, onRetry }: Props) => {
  const handleClickOutside = (event: Event) => {
    event.preventDefault()
  }

  const handleRetry = () => {
    onRetry()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onPointerDownOutside={handleClickOutside}>
        <DialogHeader>
          {isError
            ? <DialogTitle className="text-destructive flex gap-4 items-center">
              <AlertCircle className="w-8 h-8"/>
              <div>Export failed</div>
            </DialogTitle>
            : <DialogTitle className="text-green-500 flex gap-4 items-center">
              <CheckCircle className="w-8 h-8"/>
              <div>Export succeeded</div>
            </DialogTitle>
          }
          {isError && <DialogDescription className="flex flex-col gap-2 pt-8">
            <Label className="text-md">By clicking Retry button, you will be returned to export dialog where you can try again.</Label>
          </DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {isError && <Button type="button" onClick={handleRetry}>
              Retry
          </Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}