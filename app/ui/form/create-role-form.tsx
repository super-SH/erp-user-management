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
import { roleSchema } from '@/lib/validation';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

// TODO:
// This will be fetch from the database. This is a dummy placeholder.
// const featureActions = [
//   {
//     id: 1,
//     feature: 'User',
//     actionType: 'Create',
//   },
//   {
//     id: 2,
//     feature: 'User',
//     actionType: 'Read',
//   },
//   {
//     id: 3,
//     feature: 'User',
//     actionType: 'Update',
//   },
//   {
//     id: 4,
//     feature: 'User',
//     actionType: 'Delete',
//   },
//   {
//     id: 5,
//     feature: 'Role',
//     actionType: 'Create',
//   },
//   {
//     id: 6,
//     feature: 'Role',
//     actionType: 'Read',
//   },
//   {
//     id: 7,
//     feature: 'Role',
//     actionType: 'Update',
//   },
//   {
//     id: 8,
//     feature: 'Role',
//     actionType: 'Delete',
//   },
//   {
//     id: 9,
//     feature: 'Contact',
//     actionType: 'Create',
//   },
//   {
//     id: 10,
//     feature: 'Contact',
//     actionType: 'Read',
//   },
//   {
//     id: 11,
//     feature: 'Contact',
//     actionType: 'Update',
//   },
//   {
//     id: 12,
//     feature: 'Contact',
//     actionType: 'Delete',
//   },
// ];

const featureActions = {
  User: [
    {
      id: 1,
      feature: 'User',
      actionType: 'Create',
    },
    {
      id: 2,
      feature: 'User',
      actionType: 'Read',
    },
    {
      id: 3,
      feature: 'User',
      actionType: 'Update',
    },
    {
      id: 4,
      feature: 'User',
      actionType: 'Delete',
    },
  ],
  Role: [
    {
      id: 5,
      feature: 'Role',
      actionType: 'Create',
    },
    {
      id: 6,
      feature: 'Role',
      actionType: 'Read',
    },
    {
      id: 7,
      feature: 'Role',
      actionType: 'Update',
    },
    {
      id: 8,
      feature: 'Role',
      actionType: 'Delete',
    },
  ],
  Contact: [
    {
      id: 9,
      feature: 'Contact',
      actionType: 'Create',
    },
    {
      id: 10,
      feature: 'Contact',
      actionType: 'Read',
    },
    {
      id: 11,
      feature: 'Contact',
      actionType: 'Update',
    },
    {
      id: 12,
      feature: 'Contact',
      actionType: 'Delete',
    },
  ],
};

function CreateRoleForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      rolePermissions: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof roleSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>
                Role name <span className='text-red-500'>&#42;</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter a role name'
                  className='focus:ring-0'
                  {...field}
                />
              </FormControl>
              {/* Give the fix height to prevent jumping the layout when the error message is displayed */}
              <div className='h-5'>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rolePermissions'
          render={() => (
            <FormItem className='flex flex-col'>
              <FormLabel className='font-semibold mb-3'>
                Role permissions
              </FormLabel>

              {Object.keys(featureActions).map((feature) => (
                <>
                  <div
                    className='grid grid-cols-[144px_1fr] gap-x-2 '
                    key={feature}
                  >
                    <FormLabel className='text-lg font-semibold overflow-hidden text-ellipsis'>
                      {feature}
                    </FormLabel>

                    {/* FIXME: need to fix typescript error */}
                    <div className='flex gap-4 justify-start  items-center'>
                      {featureActions[feature].map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name='rolePermissions'
                          render={({ field }) => (
                            <FormItem
                              key={item.id}
                              className='flex flex-row items-center space-x-2 space-y-0'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='text-base font-medium'>
                                {item.actionType}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator className='my-4' />
                </>
              ))}
              <div className='h-5'>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type='submit'>Create Role</Button>
      </form>
    </Form>
  );
}

export default CreateRoleForm;
