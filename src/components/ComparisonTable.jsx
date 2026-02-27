import { Check, X } from 'lucide-react'
import { clsx } from 'clsx'

export default function ComparisonTable({ features, competitors }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left py-4 px-4 text-primary-600 font-medium">Features</th>
            {competitors.map((competitor) => (
              <th
                key={competitor.name}
                className={clsx(
                  'py-4 px-6 text-center font-semibold',
                  competitor.highlight
                    ? 'bg-accent-50 text-accent-700 rounded-t-2xl'
                    : 'text-primary-600'
                )}
              >
                {competitor.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={feature.name}
              className={index % 2 === 0 ? 'bg-primary-50/50' : ''}
            >
              <td className="py-4 px-4 text-primary-900 font-medium">
                {feature.name}
              </td>
              {competitors.map((competitor) => (
                <td
                  key={`${feature.name}-${competitor.name}`}
                  className={clsx(
                    'py-4 px-6 text-center',
                    competitor.highlight && 'bg-accent-50/50'
                  )}
                >
                  {feature[competitor.key] === true ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : feature[competitor.key] === false ? (
                    <X className="h-5 w-5 text-primary-300 mx-auto" />
                  ) : (
                    <span className="text-primary-600 text-sm">
                      {feature[competitor.key]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
