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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Paragraph } from '../typography';
import { userSchema } from '@/lib/validation';
import { Checkbox } from '@/components/ui/checkbox';

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
        <div className='px-6 py-3 bg-white rounded-md shadow-md space-y-1'>
          <Paragraph size='body' weight='semi' className='my-3'>
            User information
          </Paragraph>

          {/* Name */}
          <div className='flex flex-col md:flex-row md:gap-3 lg:gap-6 w-full justify-between'>
            <FormField
              control={form.control}
              name='firstname'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='font-semibold'>
                    First Name <span className='text-red-500'>&#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Peter' {...field} />
                  </FormControl>
                  <div className='h-5'>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastname'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='font-semibold'>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Parker' {...field} />
                  </FormControl>
                  <div className='h-5'>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='font-semibold'>
                  Email <span className='text-red-500'>&#42;</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='peterparker@gmail.com' {...field} />
                </FormControl>
                <div className='h-5'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default UserForm;
