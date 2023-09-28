import { FadeIn } from "../FadeIn";
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
      <h2>
        {eyebrow && (
          <>
            <span
              className={clsx(
                'mb-6 block  text-base font-semibold',
                invert ? 'text-white' : 'text-orange-400'
              )}
            >
              {eyebrow}
            </span>
            <span className="sr-only"> - </span>
          </>
        )}
        <span
          className={clsx(
            'block  tracking-tight [text-wrap:balance]',
            smaller
              ? 'font-semibold sm:text-2xl'
              : 'text-base font-medium sm:text-5xl',
            invert ? 'text-white' : 'text-orange-400'
          )}
        >
          {title}
        </span>
      </h2>
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
