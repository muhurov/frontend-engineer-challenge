'use client';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Input, InputProps } from '../input';

export type InputControllerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
} & InputProps;

export const InputController = <TFieldValues extends FieldValues>({
  control,
  name,
  ...other
}: InputControllerProps<TFieldValues>) => {
  return (
    <Controller
      name={name as Path<TFieldValues>}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Input ref={ref} {...field} {...other} error={error?.message} />
      )}
    />
  );
};
