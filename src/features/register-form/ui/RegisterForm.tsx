import { Button, Input } from '@/shared/ui';

export const RegisterForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <Input label="Введите e-mail" />
      <Input label="Введите пароль" />
      <Input label="Повторите пароль" />
      <Button type="submit">Зарегистрироваться</Button>
    </form>
  );
};
