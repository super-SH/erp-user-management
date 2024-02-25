'use client';

import React, { useState } from 'react';

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
import { Paragraph } from '../typography';
import { userSchema } from '@/lib/validation';
import { Checkbox } from '@/components/ui/checkbox';
import FormFieldInput from './form-field-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RoleType } from '@/types/collection';
import { createUser } from '@/lib/actions/user.action';

type UserFormProps = {
  roles: RoleType[];
};

function UserForm({ roles }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      role: '',
      isActive: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userSchema>) {
    console.log(values);

    try {
      setIsSubmitting(true);
      await createUser({
        newUser: { ...values, role: Number(values.role) },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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
              fieldName='firstName'
              label={
                <>
                  First Name <span className='text-red-500'>&#42;</span>
                </>
              }
              inputPlaceholder='Peter'
            />
            <FormFieldInput
              form={form}
              fieldName='lastName'
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

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>
                  Role name <span className='text-red-500'>&#42;</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.length > 0 ? (
                      roles.map((role) => (
                        <SelectItem value={String(role.id)} key={role.id}>
                          {role.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className='relative w-full cursor-not-allowed rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none bg-slate-300 text-slate-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:bg-slate-700 dark:text-slate-200'>
                        There is no role yet. Please create a role first.
                      </div>
                    )}
                  </SelectContent>
                </Select>
                <div className='h-5'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
