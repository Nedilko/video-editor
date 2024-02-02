import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

export const Container = ({children}: Props) => {
  return (
    <div className="absolute bottom-2 bg-muted/70 p-2 rounded max-w-[400px]">
      {children}
    </div>
  )
}