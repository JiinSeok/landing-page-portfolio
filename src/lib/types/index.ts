import { JSX, ReactNode } from 'react'

export interface ChildrenProps {
  children?: ReactNode
}

export interface ClassNameProps {
  className?: string
}

export interface ParentProps extends ChildrenProps, ClassNameProps {}

export type ComponentProps<T extends keyof JSX.IntrinsicElements = 'div'> =
  ParentProps & {
    as?: keyof JSX.IntrinsicElements
    id?: string
  } & JSX.IntrinsicElements[T]

export type LayoutProps = Readonly<ChildrenProps>
