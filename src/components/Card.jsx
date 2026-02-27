import { clsx } from 'clsx'

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  dark = false,
  padding = 'default'
}) {
  const paddingStyles = {
    none: '',
    small: 'p-4',
    default: 'p-5',
    large: 'p-6',
  }

  return (
    <div
      className={clsx(
        'rounded-xl transition-colors',
        paddingStyles[padding],
        dark
          ? 'bg-primary-800 text-white border border-primary-700'
          : 'bg-white border border-primary-100',
        hover && !dark && 'hover:border-primary-200',
        hover && dark && 'hover:border-primary-600',
        className
      )}
    >
      {children}
    </div>
  )
}
