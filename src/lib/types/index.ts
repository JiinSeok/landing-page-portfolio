import React, {JSX, ReactNode} from 'react'

// ==========================================
// Base Types
// ==========================================

/**
 * Base interface for components that can be clicked
 */
export interface ClickableProps {
  onClick?: () => void
}

/**
 * Base interface for components that can have children
 */
export interface ChildrenProps {
  children?: ReactNode
}

/**
 * Base interface for components that can have a className
 */
export interface ClassNameProps {
  className?: string
}

/**
 * Base interface for components that can have both children and className
 */
export interface ParentProps extends ChildrenProps, ClassNameProps {}

/**
 * Base interface for components that can have children, className, and an HTML element type
 */
export type ComponentProps<
  T extends keyof React.JSX.IntrinsicElements = 'div',
> = ParentProps & {
  as?: keyof JSX.IntrinsicElements
  id?: string
} & React.JSX.IntrinsicElements[T]

/**
 * Base interface for UI components with common properties
 */
export interface UIComponentProps extends ParentProps {
  id?: string
  role?: string
  'aria-label'?: string
}

/**
 * Base interface for form components
 */
export interface FormComponentProps extends UIComponentProps {
  name: string
  required?: boolean
}

// Alias for backward compatibility
export type ClickProps = ClickableProps

// ==========================================
// Button Types
// ==========================================

export interface ButtonBaseProps extends UIComponentProps {
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

export interface AppDownloadButtonProps extends ButtonBaseProps {
  label: string
}

export interface ContentCardProps extends ParentProps {
  title: string
  icon?: ReactNode
}

export type FloatingButtonContextType = {
  activeButton: 'none' | 'contact' | 'share' | 'toc' | 'help'
  setActiveButton: (
    button: 'none' | 'contact' | 'share' | 'toc' | 'help',
  ) => void
  copied: 'none' | 'contact' | 'url'
  setCopied: (type: 'none' | 'contact' | 'url') => void
  headings: Array<{
    id: string
    text: string
    level: number
    element: HTMLElement
  }>
  activeId: string
  viewedIds: Set<string>
  isMobile: boolean
  scrollToHeading: (id: string) => void
  copyContactToClipboard: () => Promise<void>
  copyUrlToClipboard: () => Promise<void>
  shareOnTwitter: () => void
  shareOnFacebook: () => void
  githubLink: string
  linkedinLink: string
}

export interface ToggleButtonProps {
  type: 'toc' | 'contact' | 'share' | 'help'
  icon: React.ReactNode
  iconSize?: string
  ariaLabelOpen?: string
  ariaLabelClose?: string
}

export interface FloatingMenuProps extends ParentProps {
  type: 'contact' | 'share' | 'help' | 'toc'
  title: string
}

// ==========================================
// Form Types
// ==========================================

export type StepIndex = 1 | 2 | 3
export type StepTitle = '모집 내용' | '모집 조건' | '근무 조건'

export const STEP_BUTTONS: { index: StepIndex; title: StepTitle }[] = [
  { index: 1, title: '모집 내용' },
  { index: 2, title: '모집 조건' },
  { index: 3, title: '근무 조건' },
]

export interface FormCreateStepProp {
  step: StepIndex
}

export type FormInProgress = { step: StepIndex; isProgress: boolean }

export type NumberOfPositionsType = '00명 (인원미정)' | '직접입력' | number
export type GenderType = '성별무관' | '남성' | '여성'
export type EducationType = '학력무관' | '고등학교 졸업' | '대학교 졸업'
export type AgeType =
  | '20세 ~ 29세'
  | '30세 ~ 39세'
  | '40세 ~ 49세'
  | '50세 ~ 59세'
  | '60세 이상'
  | '직접입력'
  | string
export type PreferredType = '없음' | '직접입력' | string
export type WorkDaysType = '일' | '월' | '화' | '수' | '목' | '금' | '토'

export interface ImageUrl {
  /** 이미지 주소 */
  url: string
  /** 이미지 이름 */
  name: string
}

export interface FormStep1 {
  title: string
  description: string
  recruitmentStartDate: Date | string
  recruitmentEndDate: Date | string
  imageUrls: ImageUrl[]
}

export interface FormStep2 {
  numberOfPositions: NumberOfPositionsType
  gender: GenderType
  education: EducationType
  age: AgeType
  preferred: PreferredType
}

export interface FormStep3 {
  location: string
  workStartDate: Date | string
  workEndDate: Date | string
  workStartTime: string
  workEndTime: string
  workDays: WorkDaysType[]
  isNegotiableWorkDays: boolean
  hourlyWage: number
  isPublic: boolean
}

export interface EditingFormData extends FormStep1, FormStep2, FormStep3 {}

export type EditingFormDataTypes = keyof EditingFormData
export type EditingFormDataValues = EditingFormData[EditingFormDataTypes]

export interface AnnoucementProps {
  createdAt: string
  recruitmentEndDate: string
  recruitmentStartDate: string
  isPublic: boolean
}

export interface ContactInfoProps {
  id: number
  title: string
  ownerId: number
  recruitmentEndDate: string
  recruitmentStartDate: string
  storePhoneNumber: string
  phoneNumber: string
}

export interface WorkScheduleProps {
  hourlyWage: number
  workEndDate: string
  workStartDate: string
  isNegotiableWorkDays: boolean
  workDays: string[]
  workEndTime: string
  workStartTime: string
}

export const FORM_STATUS = {
  REJECTED: '거절',
  INTERVIEW_PENDING: '면접 대기',
  INTERVIEW_COMPLETED: '면접 완료',
  HIRED: '채용 완료',
} as const

export type FormStatusType = keyof typeof FORM_STATUS

export interface FormDetailsProps {
  updatedAt?: string
  createdAt?: string
  preferred?: string
  age?: string
  education?: string
  gender?: string
  numberOfPositions?: number
  isPublic?: boolean
  hourlyWage?: number
  workDays?: string[]
  workEndTime?: string
  workStartTime?: string
  workEndDate?: string
  workStartDate?: string
  location?: string
  imageUrls?: string[]
  recruitmentEndDate?: string
  recruitmentStartDate?: string
  description?: string
  title?: string
  ownerId?: number
  id?: number
  scrapCount?: number
  applyCount?: number
  isScrapped?: boolean
  phoneNumber?: string
  storePhoneNumber?: string
  storeName?: string
}

export type CombinedFormDetailsProps = FormDetailsProps &
  AnnoucementProps &
  WorkScheduleProps &
  ContactInfoProps & {
    location: string
  }

// ==========================================
// Layout Types
// ==========================================

export interface FooterLink {
  href: string
  label: string | ReactNode
}

// ==========================================
// Modal Types
// ==========================================

export interface ModalProps extends UIComponentProps {
  isOpen: boolean
  onAfterOpen?: () => void
  onRequestClose: () => void
}

export type ModalTitleProps = ComponentProps
export type ModalBodyProps = ComponentProps
export type ModalFooterProps = ComponentProps
export type ModalIconProps = ComponentProps

export const HttpStatus = {
  UNAUTHORIZED: {
    code: '401',
    message: '인증 오류. 다시 로그인 해주세요.',
  },
  FORBIDDEN: {
    code: '403',
    message: '접근이 금지되었습니다.',
  },
  NOT_FOUND: {
    code: '404',
    message: '요청한 자원을 찾을 수 없습니다.',
  },
  INTERNAL_SERVER_ERROR: {
    code: '500',
    message: '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  DEFAULT: {
    code: '0',
    message: '문제가 발생했습니다. 다시 시도해 주세요.',
  },
} as const

export type HttpStatusType = keyof typeof HttpStatus

// ==========================================
// General Types
// ==========================================

export interface HeaderProps extends UIComponentProps {
  title?: string
  description?: string
}

export type LayoutProps = Readonly<ChildrenProps>

export interface CustomMessage {
  title?: string
  message?: string
}

export interface MenuItem {
  id: string
  name: string
  icon: ReactNode
  path: string
}

// ==========================================
// SliderKit Types
// ==========================================

export interface DemoShowcaseContextType {
  currentIndex: number
  setCurrentIndex: (index: number | ((prev: number) => number)) => void
  itemsCount: number
  setItemsCount: (count: number) => void
  goToSlide: (index: number) => void
  sliderRef: React.RefObject<HTMLDivElement | null>
}

export interface DemoShowcaseProps {
  children: ReactNode
  className?: string
  autoSlideInterval?: number
}

export interface SliderKitHeaderProps {
  title: string
  description?: string
  className?: string
  id?: string
}

export interface SliderProps {
  children: ReactNode
  className?: string
}

export interface SliderItemProps {
  children: ReactNode
  className?: string
  href?: string
  title?: string
}

export interface SliderKitImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

export interface VideoProps {
  src: string
  className?: string
  title?: string
  ariaLabel?: string
  poster?: string
}

export interface IndicatorsProps {
  className?: string
  labelledBy?: string
  role?: string
  'aria-label'?: string
}

export interface NavigationButtonsProps {
  className?: string
  'aria-label'?: string
}

export interface SliderItemSkeletonProps {
  className?: string
}

// ==========================================
// StepperKit Types
// ==========================================

export interface StepperContextType {
  currentStep: number
  totalSteps: number
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export interface StepperProps {
  children: React.ReactNode
  initialStep?: number
  className?: string
}

export interface StepProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
}

export interface StepContentProps {
  children: React.ReactNode
  step: number
  className?: string
}

export interface StepNavigationProps {
  className?: string
  nextLabel?: string
  prevLabel?: string
  finishLabel?: string
  onFinish?: () => void
}
