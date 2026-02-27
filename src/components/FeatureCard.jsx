import { clsx } from 'clsx'

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  className = '',
}) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg p-5 border border-primary-100',
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-primary-700" />
      </div>
      <h3 className="text-base font-semibold text-primary-900 mb-2">{title}</h3>
      <p className="text-primary-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
