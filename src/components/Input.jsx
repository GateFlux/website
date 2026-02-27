import { clsx } from 'clsx'

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  error,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-primary-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        className={clsx(
          'w-full px-4 py-3 rounded-xl border bg-white text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200',
          error ? 'border-red-300' : 'border-primary-200'
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export function Textarea({
  label,
  name,
  placeholder,
  required = false,
  rows = 4,
  className = '',
  error,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-primary-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className={clsx(
          'w-full px-4 py-3 rounded-xl border bg-white text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 resize-none',
          error ? 'border-red-300' : 'border-primary-200'
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export function Select({
  label,
  name,
  options,
  required = false,
  className = '',
  error,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-primary-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        id={name}
        required={required}
        className={clsx(
          'w-full px-4 py-3 rounded-xl border bg-white text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200',
          error ? 'border-red-300' : 'border-primary-200'
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
