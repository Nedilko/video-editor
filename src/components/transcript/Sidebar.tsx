import { Summary } from "@components/transcript/Summary";
import { Transcript } from "@components/transcript/Transcript";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export const Sidebar = () => {
  return <div className="flex w-[300px] min-w-[250px] border rounded-md">
    <Tabs defaultValue="transcript" className="w-full">
      <TabsList>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
      <TabsContent value="transcript" className="m-2">
        <Transcript/>
      </TabsContent>
      <TabsContent value="summary" className="m-2">
        <Summary/>
      </TabsContent>
    </Tabs>
  </div>
}