/**
 * Style Utilities
 *
 * This file contains utility functions for working with design tokens and styles.
 */

import { cn } from './classnames'
import tokens from '@/lib/styles/design-tokens'

/**
 * Combines design tokens with additional class names
 *
 * @param tokenClasses - Array of token classes from the design system
 * @param additionalClasses - Additional custom classes to apply
 * @returns Combined class string
 */
export function combineStyles(
  tokenClasses: string | string[],
  additionalClasses?: string,
): string {
  const classes = Array.isArray(tokenClasses)
    ? tokenClasses.join(' ')
    : tokenClasses
  return cn(classes, additionalClasses)
}

/**
 * Typography utilities for consistent text styling
 */
export const text = {
  /**
   * Apply heading styles
   *
   * @param level - Heading level (1-6)
   * @param className - Additional classes
   * @returns Combined class string
   */
  heading: (level: 1 | 2 | 3 | 4 | 5 | 6, className?: string): string => {
    const headingToken =
      tokens.typography.responsiveFontSize[
        `h${level}` as keyof typeof tokens.typography.responsiveFontSize
      ]
    const fontWeight = tokens.typography.fontWeight.bold
    return combineStyles([headingToken, fontWeight], className)
  },

  /**
   * Apply body text styles
   *
   * @param size - Size variant
   * @param className - Additional classes
   * @returns Combined class string
   */
  body: (
    size: 'large' | 'default' | 'small' = 'default',
    className?: string,
  ): string => {
    const sizeMap = {
      large: tokens.typography.responsiveFontSize.bodyLarge,
      default: tokens.typography.responsiveFontSize.bodyDefault,
      small: tokens.typography.responsiveFontSize.bodySmall,
    }
    return combineStyles(sizeMap[size], className)
  },

  /**
   * Apply UI text styles (buttons, labels, etc.)
   *
   * @param size - Size variant
   * @param className - Additional classes
   * @returns Combined class string
   */
  ui: (
    size: 'large' | 'default' | 'small' = 'default',
    className?: string,
  ): string => {
    const sizeMap = {
      large: tokens.typography.responsiveFontSize.uiLarge,
      default: tokens.typography.responsiveFontSize.uiDefault,
      small: tokens.typography.responsiveFontSize.uiSmall,
    }
    return combineStyles(sizeMap[size], className)
  },
}

/**
 * Layout utilities for consistent spacing and sizing
 */
export const layout = {
  /**
   * Apply section spacing
   *
   * @param size - Section size
   * @param className - Additional classes
   * @returns Combined class string
   */
  section: (size: 'sm' | 'md' | 'lg' = 'md', className?: string): string => {
    return combineStyles(tokens.spacing.section[size], className)
  },

  /**
   * Apply container width
   *
   * @param size - Container size
   * @param className - Additional classes
   * @returns Combined class string
   */
  container: (
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'prose' | 'full' = 'xl',
    className?: string,
  ): string => {
    return combineStyles([tokens.sizing.container[size], 'mx-auto'], className)
  },

  /**
   * Apply responsive grid
   *
   * @param columns - Number of columns
   * @param className - Additional classes
   * @returns Combined class string
   */
  grid: (columns: 1 | 2 | 3 | 4, className?: string): string => {
    return combineStyles(
      ['grid', tokens.layout.responsive.grid[columns]],
      className,
    )
  },

  /**
   * Apply responsive flex direction
   *
   * @param direction - Flex direction
   * @param className - Additional classes
   * @returns Combined class string
   */
  flex: (
    direction:
      | 'row'
      | 'column'
      | 'columnReverse'
      | 'rowColumn'
      | 'rowColumnReverse' = 'row',
    className?: string,
  ): string => {
    return combineStyles(
      ['flex', tokens.layout.responsive.flexDirection[direction]],
      className,
    )
  },
}

/**
 * Spacing utilities for consistent margins and padding
 */
export const spacing = {
  /**
   * Apply padding
   *
   * @param size - Padding size
   * @param className - Additional classes
   * @returns Combined class string
   */
  padding: (
    size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.padding[size], className)
  },

  /**
   * Apply horizontal padding
   *
   * @param size - Padding size
   * @param className - Additional classes
   * @returns Combined class string
   */
  paddingX: (
    size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.paddingX[size], className)
  },

  /**
   * Apply vertical padding
   *
   * @param size - Padding size
   * @param className - Additional classes
   * @returns Combined class string
   */
  paddingY: (
    size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.paddingY[size], className)
  },

  /**
   * Apply margin
   *
   * @param size - Margin size
   * @param className - Additional classes
   * @returns Combined class string
   */
  margin: (
    size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.margin[size], className)
  },

  /**
   * Apply horizontal margin
   *
   * @param size - Margin size
   * @param className - Additional classes
   * @returns Combined class string
   */
  marginX: (
    size:
      | 'none'
      | 'xs'
      | 'sm'
      | 'md'
      | 'lg'
      | 'xl'
      | '2xl'
      | '3xl'
      | 'auto' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.marginX[size], className)
  },

  /**
   * Apply vertical margin
   *
   * @param size - Margin size
   * @param className - Additional classes
   * @returns Combined class string
   */
  marginY: (
    size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.marginY[size], className)
  },

  /**
   * Apply bottom margin
   *
   * @param size - Margin size
   * @param className - Additional classes
   * @returns Combined class string
   */
  marginBottom: (
    size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.marginBottom[size], className)
  },

  /**
   * Apply top margin
   *
   * @param size - Margin size
   * @param className - Additional classes
   * @returns Combined class string
   */
  marginTop: (
    size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.marginTop[size], className)
  },

  /**
   * Apply gap
   *
   * @param size - Gap size
   * @param className - Additional classes
   * @returns Combined class string
   */
  gap: (
    size: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.spacing.gap[size], className)
  },
}

/**
 * Sizing utilities for consistent element dimensions
 */
export const sizing = {
  /**
   * Apply icon size
   *
   * @param size - Icon size
   * @param className - Additional classes
   * @returns Combined class string
   */
  icon: (
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.sizing.icon[size], className)
  },

  /**
   * Apply avatar image size
   *
   * @param size - Avatar size
   * @param className - Additional classes
   * @returns Combined class string
   */
  avatar: (
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.sizing.image.avatar[size], className)
  },

  /**
   * Apply thumbnail image size
   *
   * @param size - Thumbnail size
   * @param className - Additional classes
   * @returns Combined class string
   */
  thumbnail: (
    size: 'sm' | 'md' | 'lg' | 'xl' = 'md',
    className?: string,
  ): string => {
    return combineStyles(tokens.sizing.image.thumbnail[size], className)
  },
}

// Export all utilities as a single object
export const styles = {
  text,
  layout,
  spacing,
  sizing,
  combineStyles,
}

export default styles
