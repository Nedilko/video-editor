import { NewTimelineModal } from "@components/Dialogs/NewTimelineModal";
import { Button } from "@components/ui/button";
import { useAppSelector } from "@hooks/store";
import { useDisclosure } from "@hooks/useDisclosure";
import { getAllTimelines } from "@store/timeline-slice";
import { PlusIcon } from "lucide-react";

export const AddMediaButton = () => {
  const [isNewTimelineModalOpen, { open: openNewTimelineModal, close: closeNewTimelineModal }] = useDisclosure(false)
  const timelines = useAppSelector(getAllTimelines)

  return (
    <>
      <Button variant="outline" className="mt-2 flex gap-2 rounded-full h-8" onClick={openNewTimelineModal} disabled={timelines.length > 1}>
        <PlusIcon size={16}/>
        <span>Add Media</span>
      </Button>
      {isNewTimelineModalOpen && <NewTimelineModal onClose={closeNewTimelineModal} />}
    </>
  )
}