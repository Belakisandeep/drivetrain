import { FadeIn } from '../FadeIn'
import clsx from 'clsx'

export function Intro({
  eyebrow,
  title,
  children,
  smaller = false,
  invert = false,
  ...props
}) {
  return (
    // <Container {...props}>
    <FadeIn className="w-full">
      <span>
        {eyebrow && (
          <>
            <h1
              className={clsx(
                'mb-6 block  text-base font-semibold',
                invert ? 'text-white' : 'text-orange-400'
              )}
            >
              {eyebrow}
            </h1>
            <span className="sr-only"> - </span>
          </>
        )}
        <h2
          className={clsx(
            'block  tracking-tight [text-wrap:balance]',
            smaller
              ? 'font-semibold sm:text-2xl'
              : 'text-base font-lighter sm:text-3xl',
            invert ? 'text-white' : 'text-neutral-600'
          )}
        >
          {title}
        </h2>
      </span>
      {children && (
        <div
          className={clsx(
            'mt-6 sm:text-xl',
            invert ? 'text-neutral-300' : 'text-neutral-600'
          )}
        >
          {children}
        </div>
      )}
    </FadeIn>
    // </Container>
  )
}
