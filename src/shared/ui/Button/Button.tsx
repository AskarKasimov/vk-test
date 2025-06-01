import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  additionalClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({
  children,
  onClick = () => {},
  additionalClassName,
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      className={
        additionalClassName
          ? `${styles.button} ${additionalClassName}`
          : styles.button
      }
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
