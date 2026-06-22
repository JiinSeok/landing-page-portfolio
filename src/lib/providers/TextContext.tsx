'use client'

import enMessages from '@/lib/constants/locales/en.json'
import koMessages from '@/lib/constants/locales/ko.json'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type Locale = 'ko' | 'en'

const MESSAGES: Record<Locale, unknown> = { ko: koMessages, en: enMessages }
const COOKIE_KEY = 'locale'

// 컨텍스트 값 타입 정의
type TextContextType = {
  t: (key: string, params?: Record<string, string | number>) => string | any
  locale: Locale
  setLocale: (locale: Locale) => void
}

// 기본값으로 컨텍스트 생성
const TextContext = createContext<TextContextType>({
  t: () => '',
  locale: 'ko',
  setLocale: () => {},
})

// 텍스트 컨텍스트 사용을 위한 커스텀 훅
export function useTranslations(namespace?: string) {
  const context = useContext(TextContext)

  if (!context) {
    throw new Error('useTranslations must be used within a TextProvider')
  }

  // 네임스페이스가 제공되면 키에 네임스페이스를 추가하는 함수 반환
  if (namespace) {
    return (key: string, params?: Record<string, string | number>) => {
      const fullKey = `${namespace}.${key}`
      return context.t(fullKey, params)
    }
  }

  return context.t
}

// 현재 로케일과 변경 함수를 노출하는 훅(언어 토글용)
export function useLocale() {
  const { locale, setLocale } = useContext(TextContext)
  return { locale, setLocale }
}

// 점 표기법 경로를 사용하여 객체에서 중첩 값을 가져오는 헬퍼 함수
export function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) {
      return undefined
    }
    result = result[key]
  }

  return result
}

// 프로바이더 컴포넌트
export function TextProvider({ children }: { children: ReactNode }) {
  // SSR/첫 페인트는 기본 ko로 렌더하고, 마운트 후 쿠키 값으로 동기화한다.
  const [locale, setLocaleState] = useState<Locale>('ko')

  useEffect(() => {
    // 쿠키에 저장된 로케일로 1회 동기화(하이드레이션 후). 의도적 setState.
    const saved = document.cookie.match(/(?:^|;\s*)locale=(ko|en)/)?.[1] as
      | Locale
      | undefined
    if (saved && saved !== 'ko') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(saved)
      document.documentElement.lang = saved
    }
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    document.cookie = `${COOKIE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
  }

  // 매개변수 지원이 있는 키별 텍스트 검색 함수 (en 누락 시 ko 폴백)
  const t = (
    key: string,
    params?: Record<string, string | number>,
  ): string | any => {
    const value =
      getNestedValue(MESSAGES[locale], key) ??
      (locale !== 'ko' ? getNestedValue(koMessages, key) : undefined)

    // 값이 정의되지 않은 경우 키 반환
    if (value === undefined) {
      return key
    }

    // 값이 문자열인 경우 매개변수 대체 처리
    if (typeof value === 'string') {
      if (!params) return value
      return Object.entries(params).reduce(
        (acc, [paramKey, paramValue]) =>
          acc.replace(`{${paramKey}}`, String(paramValue)),
        value,
      )
    }

    // 값이 객체나 배열인 경우 직접 반환
    return value
  }

  return (
    <TextContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TextContext.Provider>
  )
}
