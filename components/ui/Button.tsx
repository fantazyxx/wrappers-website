import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'ghost-dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base = clsx(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
    {
      'bg-gold text-navy hover:bg-gold-dark shadow-sm hover:shadow-md': variant === 'primary',
      'border-2 border-navy text-navy hover:bg-navy hover:text-white': variant === 'secondary',
      'border-2 border-white/40 text-white hover:bg-white hover:text-navy': variant === 'ghost',
      'border-2 border-gold/60 text-gold hover:bg-gold hover:text-navy': variant === 'ghost-dark',
      'text-sm px-4 py-2 leading-none': size === 'sm',
      'text-base px-6 py-3': size === 'md',
      'text-base px-8 py-4 tracking-wide': size === 'lg',
    },
    className
  );

  if (href) {
    return (
      <a href={href} className={base} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
