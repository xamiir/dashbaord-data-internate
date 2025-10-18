import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  onChange: (value: string) => void;
  value: string;
  className?: string;
};

export function DatePicker(props: Props) {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState(value || "");

  const date = isValid(new Date(inputValue))
    ? parse(inputValue, "yyyy-MM-dd", new Date())
    : null;

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    setInputValue(formattedDate);
    onChange(formattedDate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const parsedDate = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      onChange(format(parsedDate, "yyyy-MM-dd"));
    } else {
      onChange("");
    }
  };

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              type="text"
              placeholder="YYYY-MM-DD"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full pl-10"
            />
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <ReactDatePicker
            className={"bg-white dark:bg-gray-800"}
            selected={date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            inline
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
