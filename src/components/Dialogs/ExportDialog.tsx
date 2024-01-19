import { Button } from "@components/ui/button";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@components/ui/dialog";
import { Label } from "@components/ui/label";
import { Progress } from "@components/ui/progress";
import { cn } from "@utils/ui";
import { useEffect, useState } from "react";
import { Loader } from 'lucide-react'

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export const ExportDialog = ({ open, onClose, onSuccess, onError }: Props) => {
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    if (isExporting) {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }
  }, [isExporting])

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }

  const handleFileChoose = () => {
    // getNewFileHandle().then((fileHandle) => {
    //   console.log(fileHandle)
    // })
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      Math.random() > 0.5 ? onSuccess() : onError()
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export project</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={handleFileChoose}>Choose folder</Button>
          <Label className="text-sm text-muted-foreground w-[192px]">Choose folder where to save exported file.</Label>
        </div>
        <div className={cn("flex gap-4", !isExporting && "justify-start")}>
          <div className={cn("flex flex-col gap-2 flex-1", {
            "invisible": !isExporting,
          })}>
            <Progress className="h-2" value={progress}/>
            <Label className="text-muted-foreground">Exporting...</Label>
          </div>
          <div className="flex gap-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleExport} disabled={isExporting} className="flex w-[100px]">
              {isExporting && <Loader className=" w-4 h-4 mr-2 animate-spin-slow"/>}
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// async function getNewFileHandle() {
//   const opts = {
//     types: [
//       {
//         description: "Text file",
//         accept: { "text/plain": [".txt"] },
//       },
//     ],
//   };
//   return await window.showSaveFilePicker(opts);
// }

