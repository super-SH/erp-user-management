import React from 'react';
import { FieldName, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userSchema } from '@/lib/validation';
import { z } from 'zod';

type InputAssignableType = string | number | readonly string[] | undefined;

type ExcludeNonAssignable<T, U> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends U ? K : never;
  }[keyof T]
>;
type formSchema = z.infer<typeof userSchema>;

type InputAssignableFormSchema = ExcludeNonAssignable<
  formSchema,
  InputAssignableType
>;

type FormFieldInputProps = {
  form: UseFormReturn<z.infer<typeof userSchema>>;
  fieldName: FieldName<InputAssignableFormSchema>;
  label: React.ReactNode | string;
  inputPlaceholder: string;
};

function FormFieldInput({
  form,
  fieldName,
  label,
  inputPlaceholder,
}: FormFieldInputProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel className='font-semibold'>{label}</FormLabel>
          <FormControl>
            <Input placeholder={inputPlaceholder} {...field} />
          </FormControl>
          <div className='h-5'>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

export default FormFieldInput;
