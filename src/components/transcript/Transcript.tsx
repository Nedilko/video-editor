import { Search } from "@components/transcript/Search";
import { TranscriptItem } from "@components/transcript/TranscriptItem";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

export const Transcript = () => {
  return <div className="overflow-auto">
    <Search/>
    <ScrollArea className="h-[calc(100vh-180px)] mt-4">
      <div className="flex flex-col gap-4">
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
        <TranscriptItem firstname="Katie" lastname="Rowe" time="00:01"
                        text="Hi, I'm Katie Rowe. I'm a senior software engineer at Vite Labs. I'm going to show you how to use Vite's new video editor."/>
      </div>
      <ScrollBar/>
    </ScrollArea>
  </div>
}