import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { Controls } from "@components/video-player/Controls/Controls";
import { Properties } from "@components/video-player/Properties/Properties";
import { VideoView } from "@components/video-player/VideoView";

export const Editor = () => {
  return <div className="flex flex-col flex-1 min-w-[700px] border rounded-md overflow-auto">
    <VideoView/>
    <div className="mt-2">
      <Controls/>
    </div>
    <div className="mt-2">
      <Properties/>
    </div>
    <ScrollArea id="123" className="h-[300px] mt-4">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid aut consequuntur deleniti dicta dolor eum
      exercitationem hic, in inventore ipsa iusto labore laboriosam maiores minima necessitatibus omnis quae quaerat qui
      quibusdam quos repellendus similique, tempora velit voluptatum! Accusantium alias aliquam atque beatae blanditiis
      cum, debitis dolore eaque error et excepturi exercitationem hic inventore iure laboriosam laudantium magni modi
      mollitia natus nulla numquam officiis possimus repellat reprehenderit sit soluta sunt, suscipit tempora tempore,
      velit voluptas voluptatem voluptates voluptatibus. Aliquid aperiam blanditiis delectus dignissimos dolorum earum
      eveniet, exercitationem labore laborum libero placeat voluptate. Consequatur debitis eum labore, obcaecati
      repellendus sequi sunt. Accusantium ad aliquam amet aperiam asperiores atque autem blanditiis commodi consequatur
      consequuntur culpa cumque cupiditate delectus distinctio dolor doloremque doloribus dolorum ea earum eius
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid aut consequuntur deleniti dicta dolor eum
      exercitationem hic, in inventore ipsa iusto labore laboriosam maiores minima necessitatibus omnis quae quaerat qui
      quibusdam quos repellendus similique, tempora velit voluptatum! Accusantium alias aliquam atque beatae blanditiis
      cum, debitis dolore eaque error et excepturi exercitationem hic inventore iure laboriosam laudantium magni modi
      mollitia natus nulla numquam officiis possimus repellat reprehenderit sit soluta sunt, suscipit tempora tempore,
      velit voluptas voluptatem voluptates voluptatibus. Aliquid aperiam blanditiis delectus dignissimos dolorum earum
      eveniet, exercitationem labore laborum libero placeat voluptate. Consequatur debitis eum labore, obcaecati
      repellendus sequi sunt. Accusantium ad aliquam amet aperiam asperiores atque autem blanditiis commodi consequatur
      consequuntur culpa cumque cupiditate delectus distinctio dolor doloremque doloribus dolorum ea earum eius
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid aut consequuntur deleniti dicta dolor eum
      exercitationem hic, in inventore ipsa iusto labore laboriosam maiores minima necessitatibus omnis quae quaerat qui
      quibusdam quos repellendus similique, tempora velit voluptatum! Accusantium alias aliquam atque beatae blanditiis
      cum, debitis dolore eaque error et excepturi exercitationem hic inventore iure laboriosam laudantium magni modi
      mollitia natus nulla numquam officiis possimus repellat reprehenderit sit soluta sunt, suscipit tempora tempore,
      velit voluptas voluptatem voluptates voluptatibus. Aliquid aperiam blanditiis delectus dignissimos dolorum earum
      eveniet, exercitationem labore laborum libero placeat voluptate. Consequatur debitis eum labore, obcaecati
      repellendus sequi sunt. Accusantium ad aliquam amet aperiam asperiores atque autem blanditiis commodi consequatur
      consequuntur culpa cumque cupiditate delectus distinctio dolor doloremque doloribus dolorum ea earum eius
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid aut consequuntur deleniti dicta dolor eum
      exercitationem hic, in inventore ipsa iusto labore laboriosam maiores minima necessitatibus omnis quae quaerat qui
      quibusdam quos repellendus similique, tempora velit voluptatum! Accusantium alias aliquam atque beatae blanditiis
      cum, debitis dolore eaque error et excepturi exercitationem hic inventore iure laboriosam laudantium magni modi
      mollitia natus nulla numquam officiis possimus repellat reprehenderit sit soluta sunt, suscipit tempora tempore,
      velit voluptas voluptatem voluptates voluptatibus. Aliquid aperiam blanditiis delectus dignissimos dolorum earum
      eveniet, exercitationem labore laborum libero placeat voluptate. Consequatur debitis eum labore, obcaecati
      repellendus sequi sunt. Accusantium ad aliquam amet aperiam asperiores atque autem blanditiis commodi consequatur
      consequuntur culpa cumque cupiditate delectus distinctio dolor doloremque doloribus dolorum ea earum eius
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid aut consequuntur deleniti dicta dolor eum
      exercitationem hic, in inventore ipsa iusto labore laboriosam maiores minima necessitatibus omnis quae quaerat qui
      quibusdam quos repellendus similique, tempora velit voluptatum! Accusantium alias aliquam atque beatae blanditiis
      cum, debitis dolore eaque error et excepturi exercitationem hic inventore iure laboriosam laudantium magni modi
      mollitia natus nulla numquam officiis possimus repellat reprehenderit sit soluta sunt, suscipit tempora tempore,
      velit voluptas voluptatem voluptates voluptatibus. Aliquid aperiam blanditiis delectus dignissimos dolorum earum
      eveniet, exercitationem labore laborum libero placeat voluptate. Consequatur debitis eum labore, obcaecati
      repellendus sequi sunt. Accusantium ad aliquam amet aperiam asperiores atque autem blanditiis commodi consequatur
      consequuntur culpa cumque cupiditate delectus distinctio dolor doloremque doloribus dolorum ea earum eius
      <ScrollBar orientation="vertical"/>
    </ScrollArea>
  </div>
}
