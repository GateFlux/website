import { clsx } from 'clsx'

export default function Badge({ 
  children, 
  variant = 'default',
  className = '' 
}) {
  const variants = {
    default: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    dark: 'bg-primary-800 text-primary-100',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
