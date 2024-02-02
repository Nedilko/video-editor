import { useVideo } from "@hooks/useVideo";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader } from "lucide-react";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
}
export const VideoLoadModal = ({ open, onClose }: Props) => {
  const { loaded } = useVideo()
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }

  useEffect(() => {
    if (loaded) {
      handleClose(false)
    }
  }, [loaded]);

  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <div className="fixed left-0 top-0 bottom-0 right-0 z-50 flex justify-center items-center w-full">
          <Loader size={32} className="animate-spin-slow"/>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}