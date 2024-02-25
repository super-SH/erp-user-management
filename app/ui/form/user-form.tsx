'use client';
import React from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Paragraph } from '../typography';
import { userSchema } from '@/lib/validation';
import { Checkbox } from '@/components/ui/checkbox';
import FormFieldInput from './form-field-input';

function UserForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof userSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* User Info form card */}
        <div className='px-6 py-3 bg-slate-100 rounded-md shadow-md space-y-1'>
          <Paragraph size='body' weight='semi' className='my-3'>
            User information
          </Paragraph>

          {/* Name */}
          <div className='flex flex-col md:flex-row md:gap-3 lg:gap-6 w-full justify-between'>
            <FormFieldInput
              form={form}
              fieldName='firstname'
              label={
                <>
                  First Name <span className='text-red-500'>&#42;</span>
                </>
              }
              inputPlaceholder='Peter'
            />
            <FormFieldInput
              form={form}
              fieldName='lastname'
              label={'Last Name'}
              inputPlaceholder='Parker'
            />
          </div>

          {/* Email */}
          <FormFieldInput
            form={form}
            fieldName='email'
            label={
              <>
                Email <span className='text-red-500'>&#42;</span>
              </>
            }
            inputPlaceholder='peterparker@gmail.com'
          />

          {/* Is active checkbox */}
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='w-full flex gap-4 items-center !mb-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='w-5 h-5'
                  />
                </FormControl>
                <FormLabel className='space-y-1 text-slate-800'>
                  <div className='font-bold text-sm'>Is Active?</div>
                  <div className='text-xs'>
                    User account is activate or deactivate
                  </div>
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Role and Permission card */}
        <div className='px-6 py-3 bg-slate-100 rounded-md shadow-md space-y-1'>
          <Paragraph size='body' weight='semi' className='my-3'>
            Role & Permissions
          </Paragraph>

          <FormFieldInput
            form={form}
            fieldName='username'
            label={
              <>
                User Name <span className='text-red-500'>&#42;</span>
              </>
            }
            inputPlaceholder='peter_parker1234'
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default UserForm;
