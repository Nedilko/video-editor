import { Footer } from "@components/layout/footer";
import { Header } from "@components/layout/header";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return <div className="bg-background flex flex-col h-screen justify-between">
    <Header />
    <main className="m-2 mb-auto h-full">
      {children}
    </main>
    <Footer />
  </div>
}