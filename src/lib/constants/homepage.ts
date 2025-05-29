import koMessages from './locales/ko.json'

// CTA section text
export const CTA_TEXT = {
  CONTACT: '문의하기',
  PREVIEW: '미리보기',
}

// Demo image paths
export const DEMO_IMAGES = {
  DEMO_1: '/images/demo/examples/home-screen.svg',
  DEMO_2: '/images/demo/examples/home-screen-quick-actions.svg',
  DEMO_3: '/images/demo/examples/notifications.svg',
}

// Demo video paths
export const DEMO_VIDEOS = {
  MAIN_DEMO: '/images/demo/examples/picker.svg',
}

// Demo poster path pattern
export const DEMO_POSTER_PATH = (id: number) => `/images/demo/poster-${id}.jpg`

// Demo item types
export type DemoItemType = 'image' | 'video'

// Demo item interface
export interface DemoItem {
  id: number
  type: DemoItemType
  src: string
  alt: string
  callout: string
}

// Demo items for the demo showcase section
export const demoItems = [
  {
    id: 1,
    type: 'image' as const,
    src: DEMO_IMAGES.DEMO_1,
    alt: koMessages.HomePage.sections.demo.item1.alt,
    callout: koMessages.HomePage.sections.demo.item1.callout,
  },
  {
    id: 2,
    type: 'image' as const,
    src: DEMO_IMAGES.DEMO_2,
    alt: koMessages.HomePage.sections.demo.item2.alt,
    callout: koMessages.HomePage.sections.demo.item2.callout,
  },
  {
    id: 3,
    type: 'image' as const,
    src: DEMO_IMAGES.DEMO_3,
    alt: koMessages.HomePage.sections.demo.item3.alt,
    callout: koMessages.HomePage.sections.demo.item3.callout,
  },
  {
    id: 4,
    type: 'image' as const,
    src: DEMO_VIDEOS.MAIN_DEMO,
    alt: koMessages.HomePage.sections.demo.item4.alt,
    callout: koMessages.HomePage.sections.demo.item4.callout,
  },
]

// Benefits list for the benefits section
export const benefits = [
  {
    title: koMessages.HomePage.sections.benefits.productivity.title,
    description: koMessages.HomePage.sections.benefits.productivity.description,
  },
  {
    title: koMessages.HomePage.sections.benefits.costs.title,
    description: koMessages.HomePage.sections.benefits.costs.description,
  },
  {
    title: koMessages.HomePage.sections.benefits['time-to-market'].title,
    description:
      koMessages.HomePage.sections.benefits['time-to-market'].description,
  },
]

// Metrics for the benefits section
export const metrics = {
  accuracy: {
    value: '98%',
    width: '98%',
  },
  responseTime: {
    value: '120ms',
    width: '85%',
  },
  uptime: {
    value: '99.9%',
    width: '99.9%',
  },
}

// Features list for the features section
export const features = [
  {
    title: koMessages.HomePage.sections.features['model-management'].title,
    description:
      koMessages.HomePage.sections.features['model-management'].description,
    icon: '🤖',
  },
  {
    title: koMessages.HomePage.sections.features.analytics.title,
    description: koMessages.HomePage.sections.features.analytics.description,
    icon: '📊',
  },
  {
    title: koMessages.HomePage.sections.features.infrastructure.title,
    description:
      koMessages.HomePage.sections.features.infrastructure.description,
    icon: '☁️',
  },
  {
    title: koMessages.HomePage.sections.features.collaboration.title,
    description:
      koMessages.HomePage.sections.features.collaboration.description,
    icon: '👥',
  },
  {
    title: koMessages.HomePage.sections.features.api.title,
    description: koMessages.HomePage.sections.features.api.description,
    icon: '🔌',
  },
  {
    title: koMessages.HomePage.sections.features.security.title,
    description: koMessages.HomePage.sections.features.security.description,
    icon: '🔒',
  },
]

// ===== IMAGE CONSTANTS =====

//@TODO 이미지 인덱스 타입
export const PROFILE_LOGO = {
  src: '/images/profile/profile_icon.png',
  alt: '석지인 프로필 아이콘',
}

// ===== MESSAGE CONSTANTS =====

export const DEFAULT_ERROR_MESSAGE = {
  title: '오류',
}

// ===== ROUTER CONSTANTS =====

export const ROUTER = {
  Home: {
    path: '/', // 페이지 라우트
    getName: (customName?: string) => customName || 'Home', // 가변 페이지 이름 (실제 사용 시 전달한 값 우선)
  },
  User: {
    path: '/user',
    getName: (customName?: string) => customName || '일반 사용자',
  },
  SignIn: {
    path: '/sign-in',
    getName: (customName?: string) => customName || 'Sign In',
  },
  // @TODO SignUp
  // @TODO SignOut
  SuspendedAccount: {
    path: '/_suspended-account',
    getName: (customName?: string) => customName || 'Suspended Account',
  },
  Me: {
    path: '/me',
    getName: (customName?: string) => customName || 'My Page',
  },
  AIAgent: {
    path: '/ai-agent',
    getName: (customName?: string) => customName || 'AI Agent',
  },
  AppManagement: {
    path: '/app-management',
    getName: (customName?: string) => customName || 'App Management',
  },
  AccountManagement: {
    path: '/account-management',
    getName: (customName?: string) => customName || 'Account Management',
  },
  AdminAppManagement: {
    path: '/_admin/dashboard/app-management',
    getName: (customName?: string) => customName || 'Admin App Management',
  },
} as const

// ===== SIZE CONSTANTS =====

// Icon sizes based on context
export const ICON_SIZES = {
  // Extra small icons (16px) - Used in small buttons, badges, or as indicators
  xs: 'h-4 w-4 size-4',

  // Small icons (20px) - Used in medium buttons or compact UI elements
  sm: 'h-5 w-5 size-5',

  // Medium icons (24px) - Default size for most UI contexts
  md: 'h-6 w-6 size-6',

  // Large icons (32px) - Used for emphasis or primary actions
  lg: 'h-8 w-8 size-8',

  // Extra large icons (40px) - Used for hero elements or major focal points
  xl: 'h-10 w-10 size-10',
}

// Button sizes
export const BUTTON_SIZES = {
  // Small buttons
  sm: {
    height: 'h-8',
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    icon: ICON_SIZES.xs,
    rounded: 'rounded-md',
  },

  // Default/medium buttons
  md: {
    height: 'h-9',
    padding: 'px-4 py-2',
    text: 'text-md',
    icon: ICON_SIZES.sm,
    rounded: 'rounded-md',
  },

  // Large buttons
  lg: {
    height: 'h-10',
    padding: 'px-6 py-2.5',
    text: 'text-lg',
    icon: ICON_SIZES.md,
    rounded: 'rounded-md',
  },

  // Icon-only buttons (square)
  icon: {
    sm: 'size-8 rounded-md',
    md: 'size-9 rounded-md',
    lg: 'size-10 rounded-md',
  },

  // Floating action buttons (circular)
  floating: {
    sm: 'size-10 rounded-full',
    md: 'size-12 rounded-full',
    lg: 'size-14 rounded-full',
  },
}

// Typography sizes
export const TEXT_SIZES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
}

// Badge sizes
export const BADGE_SIZES = {
  sm: {
    padding: 'px-1.5 py-0.5',
    text: TEXT_SIZES.xs,
    icon: ICON_SIZES.xs,
  },
  md: {
    padding: 'px-2 py-1',
    text: TEXT_SIZES.sm,
    icon: ICON_SIZES.xs,
  },
  lg: {
    padding: 'px-2.5 py-1.5',
    text: TEXT_SIZES.md,
    icon: ICON_SIZES.sm,
  },
}
