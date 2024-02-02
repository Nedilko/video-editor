import { TextInput } from "@components/ui/text-input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  onChange: (value: string) => void
}

export const Search = ({ onChange }: Props) => {
  const [searchText, setSearchText] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    // onChange(e.target.value)
  };

  useEffect(
    () => {
      // Выставить debouncedValue равным value (переданное значение)
      // после заданной задержки
      const handler = setTimeout(() => {
        onChange(searchText);
      }, 10);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [onChange, searchText]
  );

  return <TextInput leftIcon={<MagnifyingGlassIcon/>} placeholder="Search" className="rounded-full"
                    onChange={handleChange}/>
}