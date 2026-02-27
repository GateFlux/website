export default function Logo({ variant = 'dark', className = '' }) {
  // Use logo-dark.svg for light backgrounds (dark text), logo.svg for dark backgrounds (light version)
  const logoSrc = variant === 'light' ? '/logo.svg' : '/logo-dark.svg'

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="GateFlux" 
        width={160}
        height={40}
        className="h-10 w-auto"
        loading="eager"
        decoding="async"
      />
    </div>
  )
}
