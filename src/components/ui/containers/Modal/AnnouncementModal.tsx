'use client'

import Modal from './Modal'
import { Button } from '@/components/ui/Button/Button'
import { ExternalLink, Package, Star, Zap, CheckCircle } from 'lucide-react'
import { JSX } from 'react'

interface AnnouncementModalProps {
  isOpen: boolean
  onRequestClose: (dontShowToday?: boolean) => void
}

export default function AnnouncementModal({
  isOpen,
  onRequestClose,
}: AnnouncementModalProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-8 w-[90vw] max-w-[800px] mx-auto overflow-y-auto max-h-[90vh]"
    >
      <Modal.CloseButton onClick={() => onRequestClose(false)} />
      
      <div className="relative">
        {/* Header with emoji and title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BREAKING NEWS: 첫 번째 npm 패키지 출시!
          </h2>
          <p className="text-lg text-gray-600 mt-2">축 데뷔 🎉</p>
        </div>

        {/* Package Info Card */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            FormKit React
          </h3>
          <p className="text-gray-600 mb-4">
            React 폼 라이브러리가 드디어 공개되었습니다!
          </p>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-500" />
              <a
                href="https://www.npmjs.com/package/@jiin.seok/formkit-react"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                npm: @jiin.seok/formkit-react
              </a>
            </div>
            
            <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm">
              npm i @jiin.seok/formkit-react
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              주요 특징
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>🎯 Compound Component Pattern으로 깔끔한 API</li>
              <li>🔒 비밀번호 토글 & 비밀번호 일치 검증 자동 생성</li>
              <li>✅ Zod 스키마 지원 (선택사항)</li>
              <li>🎮 React Hook Form 기반 상태 관리</li>
              <li>♿ 접근성 완벽 지원 (ARIA 자동 처리)</li>
              <li>🎛️ 고급 Select 컴포넌트 (Radix UI 활용)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-500" />
              이런 분들께 추천
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>😵‍💫 useState 10개 선언하다 지친 분</li>
              <li>😭 form validation 때문에 머리 아픈 분</li>
              <li>🔄 비밀번호 토글 버튼 매번 만들기 귀찮은 분</li>
              <li>⏰ 급해서 새 라이브러리 배울 시간 없는 분</li>
            </ul>
          </div>
        </div>

        {/* Smart Automation Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            똑똑한 자동화
          </h4>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm">
            <div className="text-green-400">// 👁️ 토글 자동 생성</div>
            <div>&lt;FormKit.Input type="password" /&gt;</div>
            <div className="mt-2 text-green-400">// 비밀번호 일치 자동 검증</div>
            <div>&lt;FormKit.Input name="confirmPassword" /&gt;</div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">사용 예시</h4>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <pre>{`<FormKit.Root formId="login" onSubmit={handleSubmit}>
  <FormKit.Field>
    <FormKit.Label>Email</FormKit.Label>
    <FormKit.Input name="email" type="email" required />
  </FormKit.Field>

  <FormKit.Field>
    <FormKit.Label>Password</FormKit.Label>
    <FormKit.Input name="password" type="password" required />
  </FormKit.Field>

  <FormKit.SubmitButton>Login</FormKit.SubmitButton>
</FormKit.Root>`}</pre>
          </div>
        </div>

        {/* Behind Story */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>비하인드:</strong> 사전과제 하다 너무 발전해버린 케이스...! 😅
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">많은 관심과 피드백 부탁드립니다! 🙏</p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => {
                window.open('https://www.npmjs.com/package/@jiin.seok/formkit-react', '_blank')
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              <Package className="w-4 h-4 mr-2" />
              npm 패키지 보기
            </Button>
            <Button
              onClick={() => onRequestClose(true)}
              variant="outline"
              className="border-gray-300"
            >
              오늘 그만 보기
            </Button>
            <Button
              onClick={() => onRequestClose(false)}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              닫기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}