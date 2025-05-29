'use client'

import koMessages from '@/lib/constants/locales/ko.json'
import React, { createContext, ReactNode, useContext } from 'react'

// 컨텍스트 값 타입 정의
type TextContextType = {
  t: (key: string, params?: Record<string, string | number>) => string | any
}

// 기본값으로 컨텍스트 생성
const TextContext = createContext<TextContextType>({
  t: () => '',
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
  // 매개변수 지원이 있는 키별 텍스트 검색 함수
  const t = (
    key: string,
    params?: Record<string, string | number>,
  ): string | any => {
    // 점 표기법으로 번역 가져오기
    const keyParts = key.split('.')
    let translationValue: any = koMessages

    // 중첩 객체 구조 탐색
    for (const part of keyParts) {
      if (translationValue && typeof translationValue === 'object') {
        translationValue =
          translationValue[part as keyof typeof translationValue]
      } else {
        translationValue = undefined
        break
      }
    }

    // 값이 정의되지 않은 경우 키 반환
    if (translationValue === undefined) {
      return key
    }

    // 값이 문자열인 경우 매개변수 대체 처리
    if (typeof translationValue === 'string') {
      let translation = translationValue

      // 매개변수가 제공된 경우 번역에서 대체
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          translation = translation.replace(`{${paramKey}}`, String(paramValue))
        })
      }

      return translation
    }

    // 값이 객체나 배열인 경우 직접 반환
    return translationValue
  }

  return <TextContext.Provider value={{ t }}>{children}</TextContext.Provider>
}
