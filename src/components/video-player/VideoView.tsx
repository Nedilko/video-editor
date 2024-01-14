import { AspectRatio } from "@components/ui/aspect-ratio";

export const VideoView = () => {
  return <div className="mx-auto h-auto max-w-[800px] w-full">
    <div className="bg-black">
      <AspectRatio id="123" ratio={16 / 9} className="flex justify-center">
        <img src="https://placehold.co/600x338" alt="Image" className="object-fill"/>
      </AspectRatio>
    </div>
  </div>
}