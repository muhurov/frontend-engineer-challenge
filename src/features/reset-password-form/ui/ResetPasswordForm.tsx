import { Button, Input } from '@/shared/ui';

export const ResetPasswordForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <Input label="Введите пароль" />
      <Input label="Повторите пароль" />
      <Button type="submit">Изменить пароль</Button>
    </form>
  );
};
