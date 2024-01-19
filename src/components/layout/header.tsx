import { ExportDialog } from "@components/Dialogs/ExportDialog";
import { ExportStatusDialog } from "@components/Dialogs/ExportStatusDialog";
import { ThemeToggle } from "@components/theme/theme-toggle";
import { Button } from "@components/ui/button";
import { useDisclosure } from "@hooks/useDisclosure";
import { UploadIcon } from '@radix-ui/react-icons'
import { useState } from "react";

export const Header = () => {
  const [isExportDialogOpened, { open: openExportDialog, close: closeExportDialog }] = useDisclosure(false)
  const [isStatusDialogOpened, { open: openStatusDialog, close: closeStatusDialog }] = useDisclosure(false)
  const [isErrorExporting, setIsErrorExporting] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 text-4xl font-bold">
          <Button className="flex gap-2" onClick={openExportDialog}><UploadIcon/>
            <div>Export</div>
          </Button>
        </div>
        <ThemeToggle/>
      </div>
      <ExportDialog
        open={isExportDialogOpened}
        onClose={closeExportDialog}
        onError={() => {
          setIsErrorExporting(true)
          openStatusDialog()
          closeExportDialog()
        }}
        onSuccess={() => {
          setIsErrorExporting(false)
          openStatusDialog()
          closeExportDialog()
        }}
      />
      <ExportStatusDialog
        open={isStatusDialogOpened}
        onClose={closeStatusDialog}
        isError={isErrorExporting}
        onRetry={openExportDialog}
      />
    </header>
  )
}