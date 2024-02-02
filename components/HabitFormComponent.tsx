import { FormProp, HabitForForm, HabitFormProp, TaskWithoutKey } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroupItem, RadioGroup } from "./ui/radio-group";

export const HabitFormComponent = ({
  form,
  formLabel,
}: {
  form: UseFormReturn<HabitForForm>;
  formLabel: HabitFormProp;
}) => {
  return (
    <FormField
      control={form.control}
      name={formLabel.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel.label}</FormLabel>
          <FormControl>
            <Input placeholder={formLabel.name} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
