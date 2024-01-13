import { Footer } from "@components/footer";
import { Header } from "@components/header";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return <div className="bg-background flex flex-col h-screen justify-between">
    <Header />
    <main className="m-2 mb-auto">
      {children}
    </main>
    <Footer />
  </div>
}