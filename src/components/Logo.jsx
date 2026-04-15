export default function Logo({ variant = 'dark', className = '' }) {
  // Use logo-dark.svg for light backgrounds (dark text), logo.svg for dark backgrounds (light version)
  const logoSrc = variant === 'light' ? '/logo.svg' : '/logo-dark.svg'

  return (
    <div className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt="GateFlux"
        className="h-full w-auto"
      />
    </div>
  )
}
