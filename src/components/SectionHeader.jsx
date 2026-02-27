import { clsx } from 'clsx'

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  className = '',
}) {
  return (
    <div
      className={clsx(
        'max-w-3xl',
        centered && 'mx-auto text-center',
        className
      )}
    >
      {badge && (
        <span
          className={clsx(
            'inline-flex items-center px-3 py-1 rounded text-sm font-medium mb-4',
            light
              ? 'bg-white/5 border border-white/10 text-white'
              : 'bg-primary-50 text-primary-700'
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={clsx(
          'text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight',
          light ? 'text-white' : 'text-primary-900'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'mt-4 text-base md:text-lg leading-relaxed',
            light ? 'text-primary-300' : 'text-primary-700'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
