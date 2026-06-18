/**
 * tappytype 랜딩 SEO 메타데이터 — 단일 소스(상수).
 *
 * 검색·공유 미리보기에 쓰는 모든 값을 여기 한 곳에서만 고친다.
 * 정적 페이지라 OG·Twitter 메타는 초기 HTML에 있어야 하므로(카카오톡·Slack·
 * Twitter 스크레이퍼는 JS를 실행하지 않음) 런타임이 아니라 빌드타임에 주입한다.
 *
 * 값을 바꾼 뒤 `pnpm tappytype:meta`를 실행하면
 * public/tappytype/index.html 의 <!-- SEO:START --> ~ <!-- SEO:END --> 블록이 갱신된다.
 */
export const TAPPYTYPE_SEO = {
  url: 'https://usejiin.link/tappytype',
  siteName: 'TappyType',
  title: 'TappyType — 내 손글씨가 진짜 폰트가 돼요',
  /** 검색 결과·meta description 용 (조금 더 설명적으로) */
  description:
    '아이패드와 애플펜슬로 만드는 나만의 한글 손글씨 폰트. 몇 글자만 쓰면 AI가 나머지를 내 글씨체로 채우고, 진짜 .ttf 폰트로 내보내요.',
  /** OG·Twitter 공유 카드 용 (조금 더 짧고 후킹하게) */
  shareDescription:
    '애플펜슬로 몇 글자만 쓰면 AI가 나머지 한글을 내 글씨체로 채워요. 진짜 폰트(.ttf)로 내보내서 어디서든 쓰세요.',
  image: 'https://usejiin.link/tappytype/assets/og-image.jpg',
  imageAlt: 'TappyType — 아이패드 손글씨 폰트 메이커',
  imageWidth: 1024,
  imageHeight: 1024,
  locale: 'ko_KR',
  altLocale: 'en_US',
  themeColor: '#FFF7F3',
  twitterCard: 'summary_large_image',
  /** schema.org JSON-LD(구조화 데이터) 보조 값 */
  jsonLd: {
    applicationCategory: 'DesignApplication',
    operatingSystem: 'iPadOS',
    inLanguage: ['ko', 'en'],
    description:
      '아이패드와 애플펜슬로 몇 글자만 쓰면 AI가 나머지 한글을 내 글씨체로 채우고, 진짜 .ttf 폰트로 내보내는 손글씨 폰트 메이커.',
  },
} as const
