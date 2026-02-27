import { Check } from 'lucide-react'
import Link from 'next/link'
import { clsx } from 'clsx'

export default function PricingCard({
  name,
  description,
  price,
  period = '/unit/month',
  features,
  highlighted = false,
  ctaText = 'Get Started',
  ctaHref = '/contact',
}) {
  return (
    <div
      className={clsx(
        'relative rounded-xl p-6 transition-colors',
        highlighted
          ? 'bg-primary-900 text-white border-2 border-accent-500'
          : 'bg-white border border-primary-100'
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-0.5 rounded">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={clsx(
            'text-xl font-bold mb-2',
            highlighted ? 'text-white' : 'text-primary-900'
          )}
        >
          {name}
        </h3>
        <p
          className={clsx(
            'text-sm',
            highlighted ? 'text-primary-300' : 'text-primary-600'
          )}
        >
          {description}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className={clsx(
              'text-4xl font-bold',
              highlighted ? 'text-white' : 'text-primary-900'
            )}
          >
            {price}
          </span>
          <span
            className={clsx(
              'text-sm',
              highlighted ? 'text-primary-300' : 'text-primary-500'
            )}
          >
            {period}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className={clsx(
                'h-5 w-5 flex-shrink-0 mt-0.5',
                highlighted ? 'text-green-400' : 'text-green-600'
              )}
            />
            <span
              className={clsx(
                'text-sm',
                highlighted ? 'text-primary-200' : 'text-primary-600'
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={clsx(
          'block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300',
          highlighted
            ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-soft'
            : 'bg-primary-900 text-white hover:bg-primary-800'
        )}
      >
        {ctaText}
      </Link>
    </div>
  )
}
