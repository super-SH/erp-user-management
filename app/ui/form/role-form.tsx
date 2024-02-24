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
import { Input } from '@/components/ui/input';
import { roleSchema } from '@/lib/validation';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { createRole, updateRole } from '@/lib/actions/role.action';

// TODO:
// This will be fetch from the database. This is a dummy placeholder.
const featureActionsOrg = [
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
];

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

type RoleFormProps =
  | {
      isEditingSession: true;
      roleData: {
        id: number;
        name: string;
        rolePermissions: number[];
      };
    }
  | { roleData?: null; isEditingSession?: false };

function RoleForm({ roleData, isEditingSession = false }: RoleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: roleData ? roleData.name : '',
      rolePermissions: roleData ? roleData.rolePermissions : [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof roleSchema>) {
    console.log(values);

    if (isEditingSession) {
      console.log('editing');
      try {
        setIsSubmitting(true);
        // Typescript complain about 'roleData is possibly null, but where are sure it wouldn't be.
        // Because , the roleData is null only if the isEditingSession is false
        await updateRole({
          id: roleData.id,
          rolename: values.name,
          rolePremissions: values.rolePermissions,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        setIsSubmitting(true);
        await createRole({
          rolename: values.name,
          rolePremissions: values.rolePermissions,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
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
                <Input placeholder='Enter a role name' {...field} />
              </FormControl>
              {/* Give the fixed height to prevent jumping the layout when the error message is displayed */}
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

              {/* Administrator Access  */}
              <div
                className='grid grid-cols-1 md:grid-cols-[144px_1fr] gap-x-2 gap-y-2'
                key={'adminPermission'}
              >
                <FormLabel className='text-lg font-semibold text-wrap'>
                  Administrator Access
                </FormLabel>

                <FormField
                  key={`adminPermission`}
                  control={form.control}
                  name='rolePermissions'
                  render={({ field }) => (
                    <FormItem
                      key={`adminPermission`}
                      className='flex flex-row items-center space-x-2 space-y-0'
                    >
                      <FormControl>
                        <Checkbox
                          className='size-6'
                          checked={featureActionsOrg.every((permission) =>
                            field.value.includes(permission.id)
                          )}
                          onCheckedChange={(checked) => {
                            const ids = featureActionsOrg.map(
                              (item) => item.id
                            );
                            field.onChange(
                              checked
                                ? [...ids]
                                : field.value.filter((id) => !ids.includes(id))
                            );
                          }}
                        />
                      </FormControl>
                      <FormLabel className='text-lg font-medium'>
                        Select All
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Separator between Administrator Access  and other role permissions */}
              <Separator className='my-4' />

              {/* Loop throught the featureAction ,whcih is fetched. Each Keys is an feature and has the value of array of actions(CRUD, import , print) corresponding to this feature  */}
              {Object.entries(featureActions).map(([feature, actionArrays]) => (
                <React.Fragment key={feature}>
                  <div
                    className='grid grid-cols-1 md:grid-cols-[144px_1fr] gap-x-2 gap-y-2 '
                    key={feature}
                  >
                    <FormLabel className='text-lg font-semibold overflow-hidden text-ellipsis'>
                      {feature}
                    </FormLabel>

                    {/* This is the selectAll Checkbox of this feature */}
                    <div className='flex gap-4 justify-start flex-wrap  items-center'>
                      <FormField
                        key={`${feature}_selectAll`}
                        control={form.control}
                        name='rolePermissions'
                        render={({ field }) => (
                          <FormItem
                            key={`${feature}-select-all`}
                            className='flex flex-row items-center space-x-2 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={actionArrays.every((permission) =>
                                  field.value.includes(permission.id)
                                )}
                                onCheckedChange={(checked) => {
                                  const ids = actionArrays.map(
                                    (item) => item.id
                                  );
                                  field.onChange(
                                    checked
                                      ? [
                                          ...field.value.filter(
                                            (id) => !ids.includes(id)
                                          ),
                                          ...ids,
                                        ]
                                      : field.value.filter(
                                          (id) => !ids.includes(id)
                                        )
                                  );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='text-base font-medium'>
                              Select All
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      {/* Loop through the array of action of each featuer and display checkbox. */}

                      {actionArrays.map((item) => (
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

                  {/* Seperator between each feature */}
                  <Separator className='my-4' />
                </React.Fragment>
              ))}
              <div className='h-5'>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isSubmitting}>
          {isEditingSession ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}

export default RoleForm;
