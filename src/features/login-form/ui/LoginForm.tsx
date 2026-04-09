import { Button, Input, Link } from '@/shared/ui';

export const LoginForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <Input label="Введите e-mail" />
      <Input label="Введите пароль" />
      <Button type="submit">Войти</Button>
    </form>
  );
};
