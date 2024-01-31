import { FormProp, TaskWithoutKey } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroupItem, RadioGroup } from "./ui/radio-group";

export const FormComponent = ({
  form,
  formLabel,
}: {
  form: UseFormReturn<TaskWithoutKey>;
  formLabel: FormProp;
}) => {
  return (
    <FormField
      control={form.control}
      name={formLabel.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel.label}</FormLabel>
          <FormControl>
            {formLabel.type === "radio" ? (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-5"
              >
                {formLabel.options.map((option) => {
                  return (
                    <FormItem className="flex items-center space-y-0 gap-2">
                      <FormControl>
                        <RadioGroupItem value={Object.values(option)[0]} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {Object.keys(option)[0]}
                      </FormLabel>
                    </FormItem>
                  );
                })}
              </RadioGroup>
            ) : (
              <Input placeholder={formLabel.name} {...field} />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};
