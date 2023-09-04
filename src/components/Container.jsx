import clsx from 'clsx'

export function Container({
  as: Component = 'div',
  className,
  children,
  formContainer,
}) {
  return (
    <Component
      className={clsx(
        `mx-auto max-w-7xl ${formContainer ? 'sm:px-6' : 'px-6'} lg:px-8`,
        className
      )}
    >
      <div className="mx-auto max-w-7xl lg:max-w-none">{children}</div>
    </Component>
  )
}
