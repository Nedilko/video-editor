import { cn } from "@utils/ui";

type Props = {
  text: string
  searchText: string
}

export const TranscriptText = ({ text, searchText }: Props) => {
  return text.split(' ').map((item, index) => {
    const highlight = searchText !== '' && item.toLowerCase().includes(searchText.toLowerCase())
    return (
      <span key={index} className={cn("transition-all", {
        "text-primary": highlight,
      })}>{item} </span>
    )
  })
}