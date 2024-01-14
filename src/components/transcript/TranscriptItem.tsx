type Props = {
  firstname: string
  lastname: string
  text: string
  time: string
}

export const TranscriptItem = ({ firstname, lastname, time, text }: Props) => {
  return <div className="flex flex-col gap-2">
    <div className="flex flex-row gap-2 items-center">
      <div className="flex items-center justify-center rounded-full bg-accent w-6 h-6 text-sm">{firstname.charAt(0)}{lastname.charAt(0)}</div>
      <div className="font-bold text-sm">{firstname} {lastname}</div>
      <div className="text-muted-foreground text-sm">{time}</div>
    </div>
    <div className="ml-8 text-sm">{text}</div>
  </div>
}