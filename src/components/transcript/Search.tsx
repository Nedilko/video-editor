import { TextInput } from "@components/ui/text-input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEvent } from "react";

export const Search = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('changed', e.target.value);
  };

  return <TextInput leftIcon={<MagnifyingGlassIcon/>} placeholder="Search" className="rounded-full"
                    onChange={handleChange}/>
}