import { clsx } from 'clsx'

const variants = {
  primary: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-soft hover:shadow-enterprise',
  secondary: 'bg-white text-primary-900 border-2 border-primary-200 hover:border-primary-900 hover:bg-primary-50 focus:ring-primary-500',
  outline: 'bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 focus:ring-white',
  ghost: 'text-primary-600 hover:text-primary-900 hover:bg-primary-50',
  'outline-dark': 'bg-transparent text-primary-900 border-2 border-primary-200 hover:border-primary-900 hover:bg-primary-50 focus:ring-primary-500',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as = 'button',
  href,
  ...props
}) {
  const Component = as === 'link' ? 'a' : 'button'

  return (
    <Component
      href={href}
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
