import { ComponentProps } from '@/lib/types'
import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

export type StepIndex = 1 | 2 | 3
export type StepTitle = '모집 내용' | '모집 조건' | '근무 조건'

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

export type AlbatalkPropsType =
  | 'updatedAt'
  | 'createdAt'
  | 'commentCount'
  | 'likeCount'
  | 'imageUrl'
  | 'content'
  | 'title'
  | 'id'
  | 'isLiked'

export interface AlbatalkCommentProps {
  totalPages: number
  currentPage: number
  totalItemCount: number
  data: {
    writer: {
      imageUrl: string
      nickname: string
      id: number
    }
    updatedAt: string
    createdAt: string
    content: string
    id: number
  }[]
}

export interface AnnoucementProps {
  createdAt: string
  recruitmentEndDate: string
  recruitmentStartDate: string
  isPublic: boolean
}

export interface ApplicationStatusProps {
  formId: number
  formDetails: {
    recruitmentEndDate: string
  }
  applicationId?: number
  isOwner: boolean
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

export interface CurrentApplicationProps {
  ownerId: number
  applyCount: number
}

export interface ImageProps {
  imageUrls: string[] | string
}

export interface LocationProps {
  location: string
  storeName: string
}

export interface RequirementsProps {
  numberOfPositions: number
  preferred: string
  age: string
  education: string
  gender: string
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

export interface ApplicationProps {
  id: number
  applicantId: number
  name: string
  phoneNumber: string
  experienceMonths: number
  status: string
}

export const FORM_STATUS = {
  REJECTED: '거절',
  INTERVIEW_PENDING: '면접 대기',
  INTERVIEW_COMPLETED: '면접 완료',
  HIRED: '채용 완료',
} as const

export type FormStatusType = keyof typeof FORM_STATUS

export const FORM_STATUS_REVERSED = {
  거절: 'REJECTED',
  '면접 대기': 'INTERVIEW_PENDING',
  '면접 완료': 'INTERVIEW_COMPLETED',
  '채용 완료': 'HIRED',
} as const

export interface FormContextProps {
  formId: string
  onSubmit: (data: FieldValues) => void
  watch: UseFormWatch<FieldValues>
  getValues: UseFormGetValues<FieldValues>
  getFieldState: UseFormGetFieldState<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  errors: FieldErrors
  isValid: boolean
  isSubmitting: boolean
  reset: UseFormReset<any>
  register: UseFormRegister<FieldValues>
  setFocus: UseFormSetFocus<FieldValues>
}

export interface FormResetButtonProps extends ComponentProps<'button'> {
  // buttonStyle?: buttonStyle
  // color?: buttonColor
  onClick?: () => void
}

export interface FormSubmitButtonProps {
  children: ReactNode
  buttonStyle?: 'solid' | 'outline'
  color?: 'primary' | 'gray'
  isPending?: boolean
}

export interface FormProps extends ComponentProps<'form'> {
  formId: string
  onSubmit: SubmitHandler<FieldValues>
  initialValues?: Record<string, any>
  defaultValues?: any
}

export interface FieldProps extends ComponentProps {
  htmlFor?: string
  isInline?: boolean
  hidden?: boolean
}

export interface LegendProps extends ComponentProps {
  required?: boolean
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: HTMLInputElement['type']
  required?: boolean
  minLength?: number
  maxLength?: number
  hookFormPattern?: {
    value: RegExp
    message: string
  }
  value?: any
  validate?: any
  initialValues?: string
  step?: number
  onClick?: (event?: any) => void
  workDaysValue?: WorkDaysType
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  required?: boolean
  minLength?: number
  maxLength?: number
  validate?: any
}

export interface ImageInputProps extends InputProps {
  onImageChange?: (file: File) => void
}

export interface AddressSearchProps {
  name: string
  placeholder?: string
  required?: boolean
}

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
