import Image from 'next/image'

export default function Logo({ variant = 'dark', className = '' }) {
  // Use logo-dark.svg for light backgrounds (dark text), logo.svg for dark backgrounds (light version)
  const logoSrc = variant === 'light' ? '/logo.svg' : '/logo-dark.svg'

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={logoSrc} 
        alt="GateFlux" 
        width={160}
        height={40}
        style={{ width: 'auto', height: 'auto' }}
        priority
      />
    </div>
  )
}
