import Link from 'next/link'
import clsx from 'clsx'

export function CallToAction({ invert, className, children, ...props }) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-orange-400 hover:bg-neutral-200'
      : 'bg-orange-400 text-white hover:bg-orange-600'
  )

  let inner = <span className="relative top-px">{children}</span>

  return (
    <button className={className} {...props}>
      {inner}
    </button>
  )
}

export function CallToActionLink({ invert, className, children, ...props }) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-orange-400 hover:bg-neutral-200'
      : 'bg-orange-400 text-white hover:bg-orange-600'
  )

  let inner = <span className="relative top-px">{children}</span>

  return (
    <a className={className} {...props}>
      {inner}
    </a>
  )
}
