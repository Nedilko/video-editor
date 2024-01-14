import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export const Transcript = () => {
  return <div className="flex h-full w-[300px] min-w-[250px] border rounded-md">
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Transcript</TabsTrigger>
        <TabsTrigger value="password">Summary</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="m-2">Transcription</TabsContent>
      <TabsContent value="password" className="m-2">Summary content goes here. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Asperiores commodi expedita facere harum impedit nemo, nihil obcaecati repudiandae unde.
        Adipisci aperiam architecto, aspernatur autem dolorum ea eum impedit ipsum modi obcaecati recusandae sit
        veritatis vero. Adipisci, amet autem consequuntur dolorem dolores doloribus ea eaque earum error eum fugiat
        inventore ipsum, iste maiores molestiae molestias mollitia neque nihil nulla obcaecati pariatur placeat
        quibusdam quo reprehenderit repudiandae sequi sint, sit suscipit tempore ullam. Animi architecto consectetur
        consequatur doloremque doloribus enim eveniet excepturi id, incidunt molestias officia, perspiciatis provident
        quidem quisquam quos recusandae temporibus tenetur totam velit veritatis vitae, voluptas voluptatibus. Quas,
        ut?</TabsContent>
    </Tabs>
  </div>
}