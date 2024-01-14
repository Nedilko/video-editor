import { ThemeToggle } from "@components/theme/theme-toggle";
import { Button } from "@components/ui/button";
import {UploadIcon} from '@radix-ui/react-icons'

export const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <h1 className="flex flex-1 text-4xl font-bold">
          <Button className="flex gap-2"><UploadIcon/><div>Export</div></Button>
        </h1>
        <ThemeToggle/>
      </div>
    </header>
  )
}