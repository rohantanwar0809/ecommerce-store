import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface IconButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactElement;
}

const IconButton: React.FC<IconButtonProps> = ({
  className,
  onClick,
  icon,
}) => {
  return (
    <button
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transistion",
        className
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
