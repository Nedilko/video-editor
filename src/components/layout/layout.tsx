import { Header } from "@components/layout/header";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return <div className="bg-background flex flex-col justify-between">
    <Header/>
    <main className="m-2 h-[calc(100vh-74px)] container  max-w-screen-2xl mx-auto">
      {children}
    </main>
  </div>
}