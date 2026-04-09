import { Button, Input } from '@/shared/ui';

export const RecoverPasswordForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <Input label="Введите e-mail" />
      <Button type="submit" variant="secondary">
        Восстановить пароль
      </Button>
    </form>
  );
};
