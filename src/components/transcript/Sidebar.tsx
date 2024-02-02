import { Summary } from "@components/transcript/Summary";
import { Transcript } from "@components/transcript/Transcript";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { SidebarOpenIcon } from 'lucide-react'

type Props = {
  onClose: () => void
}

export const Sidebar = ({ onClose }: Props) => {
  return <Tabs defaultValue="transcript" className="w-full group">
    <div
      className="w-8 h-8 opacity-0 group-hover:opacity-100 bg-secondary transition-all ease-in-out delay-150 duration-300 absolute -translate-x-8 translate-y-8 rounded-tl-md rounded-bl-md border-border shadow-xl"
      onClick={onClose}
    >
      <SidebarOpenIcon className="w-4 h-4 m-2"/>
    </div>
    <TabsList>
      <TabsTrigger value="transcript">Transcript</TabsTrigger>
      <TabsTrigger value="summary">Summary</TabsTrigger>
    </TabsList>
    <TabsContent value="transcript" className="m-2 !ring-0">
      <Transcript/>
    </TabsContent>
    <TabsContent value="summary" className="m-2">
      <Summary/>
    </TabsContent>
  </Tabs>
}