/**
 * Design Tokens
 * 
 * This file contains centralized design tokens for consistent styling across the application.
 * Use these tokens instead of direct Tailwind classes to ensure uniformity.
 */

export const typography = {
  // Font sizes (using Tailwind's text-* classes)
  fontSize: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  },

  // Responsive font sizes
  responsiveFontSize: {
    // Headings
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl',
    h4: 'text-xl md:text-2xl',
    h5: 'text-lg md:text-xl',
    h6: 'text-base md:text-lg',

    // Body text
    bodyLarge: 'text-lg md:text-xl',
    bodyDefault: 'text-base md:text-lg',
    bodySmall: 'text-sm md:text-base',

    // UI text
    uiLarge: 'text-base',
    uiDefault: 'text-sm',
    uiSmall: 'text-xs',
  },

  // Font weights
  fontWeight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
}

export const spacing = {
  // Padding
  padding: {
    none: 'p-0',
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    '2xl': 'p-10',
    '3xl': 'p-12',
  },

  // Padding X (horizontal)
  paddingX: {
    none: 'px-0',
    xs: 'px-1',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
    xl: 'px-8',
    '2xl': 'px-10',
    '3xl': 'px-12',
  },

  // Padding Y (vertical)
  paddingY: {
    none: 'py-0',
    xs: 'py-1',
    sm: 'py-2',
    md: 'py-4',
    lg: 'py-6',
    xl: 'py-8',
    '2xl': 'py-10',
    '3xl': 'py-12',
  },

  // Margin
  margin: {
    none: 'm-0',
    xs: 'm-1',
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-6',
    xl: 'm-8',
    '2xl': 'm-10',
    '3xl': 'm-12',
  },

  // Margin X (horizontal)
  marginX: {
    none: 'mx-0',
    xs: 'mx-1',
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-6',
    xl: 'mx-8',
    '2xl': 'mx-10',
    '3xl': 'mx-12',
    auto: 'mx-auto',
  },

  // Margin Y (vertical)
  marginY: {
    none: 'my-0',
    xs: 'my-1',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6',
    xl: 'my-8',
    '2xl': 'my-10',
    '3xl': 'my-12',
  },

  // Margin Bottom
  marginBottom: {
    none: 'mb-0',
    xs: 'mb-1',
    sm: 'mb-2',
    md: 'mb-4',
    lg: 'mb-6',
    xl: 'mb-8',
    '2xl': 'mb-10',
    '3xl': 'mb-12',
  },

  // Margin Top
  marginTop: {
    none: 'mt-0',
    xs: 'mt-1',
    sm: 'mt-2',
    md: 'mt-4',
    lg: 'mt-6',
    xl: 'mt-8',
    '2xl': 'mt-10',
    '3xl': 'mt-12',
  },

  // Gap
  gap: {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-10',
    '3xl': 'gap-12',
  },

  // Section spacing
  section: {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20',
  },
}

export const sizing = {
  // Icon sizes
  icon: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  },

  // Image sizes
  image: {
    avatar: {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
      '2xl': 'w-32 h-32',
      '3xl': 'w-48 h-48',
      '4xl': 'w-64 h-64',
    },
    thumbnail: {
      sm: 'w-16 h-9',  // 16:9 aspect ratio
      md: 'w-32 h-18', // 16:9 aspect ratio
      lg: 'w-48 h-27', // 16:9 aspect ratio
      xl: 'w-64 h-36', // 16:9 aspect ratio
    },
  },

  // Container widths
  container: {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    prose: 'max-w-prose',
    full: 'max-w-full',
  },
}

export const layout = {
  // Responsive layouts
  responsive: {
    // Grid columns
    grid: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    },

    // Flex direction
    flexDirection: {
      row: 'flex-row',
      column: 'flex-col md:flex-row',
      columnReverse: 'flex-col-reverse md:flex-row',
      rowColumn: 'flex-row md:flex-col',
      rowColumnReverse: 'flex-row md:flex-col-reverse',
    },
  },
}

// Export all tokens as a single object
export const tokens = {
  typography,
  spacing,
  sizing,
  layout,
}

export default tokens
