import React from "react";
import {
  FormControl,
  FormField as ReactHookFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, ChevronDown, InfoIcon, Loader } from "lucide-react";
import { DatePicker } from "./date-picker";
import { TooltipWrapper } from "../ui/tooltip-wrapper";
import { MultiSelect } from "../ui/multiselect";

export interface FormInputProp {
  multiple?: boolean;
  label?: string;
  setFileLink: (e: any) => void;
  fileLink: string[];
  fileType: "image" | "document";
  showLabel?: boolean;
}

export interface FormProps {
  form: UseFormReturn<any, any, undefined>;
  name: string;
  secondname?: any;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  cols?: number;
  rows?: number;
  step?: string;
  fieldType?:
    | "command"
    | "switch"
    | "select"
    | "input"
    | "date"
    | "multiselect";
  url?: string;
  hasLabel?: boolean;
  isLoading?: boolean;
  setSearch?: (e: string) => void;
  search?: string;
  data?: Item[];
  more?: string;
}

export interface Item {
  value: string;
  label: string;
  acc?: string;
}

export function FormWrapper({
  form,
  name,
  label,
  isLoading,
  hasLabel = true,
  data,
  search,
  setSearch,
  more,
  ...props
}: FormProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <ReactHookFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="flex justify-between items-center">
            {hasLabel && <FormLabel>{label}</FormLabel>}

            {more && (
              <TooltipWrapper
                children={<InfoIcon className="w-4 h-4" />}
                content={<span className="text-xs text-gray-500">{more}</span>}
              />
            )}
          </div>

          {props?.fieldType === "command" ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data?.find((item) => item.value === field.value)?.label
                      : "Select item"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-xl p-0">
                <Command shouldFilter={true}>
                  <CommandInput
                    onValueChange={
                      setSearch ? (value) => setSearch(value) : undefined
                    }
                    value={search}
                    placeholder="Search item..."
                    className="h-9"
                  />
                  <CommandEmpty>
                    {isLoading ? (
                      <div className="flex justify-center">
                        <Loader className="w-8 h-8 animate-spin" />
                      </div>
                    ) : (
                      "No item found."
                    )}
                  </CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {data?.map((item) => (
                        <CommandItem
                          value={item.label}
                          key={item.value}
                          onSelect={() => {
                            form.setValue(name, item.value);
                            if (props.secondname) {
                              form.setValue(props.secondname, item.acc);
                            }
                            setOpen(false);
                          }}
                        >
                          {item.label}

                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              item.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          ) : props?.fieldType === "switch" ? (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          ) : props?.fieldType === "select" ? (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.map((item) => (
                  <SelectItem key={item.value} value={item?.value}>
                    {item?.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : props?.fieldType === "date" ? (
            <div>
              <DatePicker
                onChange={(date) => {
                  field.onChange(date);
                }}
                value={field.value}
                className={
                  "border p-1 border-gray-300 bg-transparent rounded-lg w-full dark:text-gray-600 dark:border-gray-400"
                }
              />
            </div>
          ) : props?.fieldType === "multiselect" ? (
            <MultiSelect
              options={data || []}
              value={field.value}
              onValueChange={(value) => {
                form.setValue(name, value);
              }}
            />
          ) : (
            <FormControl>
              {props.cols && props.rows ? (
                <Textarea {...field} {...props} />
              ) : (
                <Input {...field} {...props} />
              )}
            </FormControl>
          )}

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
