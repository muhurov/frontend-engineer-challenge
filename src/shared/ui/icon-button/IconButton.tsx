import { ElementType } from 'react';

export type IconButtonProps = {
  icon: ElementType;
  onClick: () => void;
};

export const IconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-transparent text-typography-tertiary hover:bg-gray-100 inline-flex items-center justify-center rounded-full p-2 transition-colors"
    >
      <Icon size={20} />
    </button>
  );
};
