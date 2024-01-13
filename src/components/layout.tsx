import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return <div className="m-4">
    {children}
  </div>
}