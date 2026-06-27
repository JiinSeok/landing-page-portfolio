import { ImageResponse } from 'next/og'

// 사이트 공유 시 노출되는 1200×630 OG 카드. next/og(Satori)로 동적 생성한다.
// 한글 글리프는 Satori 기본 폰트에 없어 SUIT(otf)를 CDN에서 받아 싣는다.
// (Satori는 woff2 미지원 — 반드시 otf/ttf를 받을 것)
export const alt =
  '석지인 · Jiin Seok — 사용자 중심의 경험으로 임팩트를 만드는 개발자'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const FONT_BASE =
  'https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/otf'

export default async function Image() {
  const [bold, regular] = await Promise.all([
    fetch(`${FONT_BASE}/SUIT-Bold.otf`).then((res) => res.arrayBuffer()),
    fetch(`${FONT_BASE}/SUIT-Regular.otf`).then((res) => res.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f6f5f3',
          padding: '72px 80px',
          fontFamily: 'SUIT',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            color: '#8a8a8a',
            fontSize: 26,
            letterSpacing: 5,
          }}
        >
          <div
            style={{
              width: 44,
              height: 6,
              background: '#1f1f1f',
              borderRadius: 3,
            }}
          />
          PORTFOLIO
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#1a1a1a',
              letterSpacing: -1,
            }}
          >
            석지인 · Jiin Seok
          </div>
          <div style={{ fontSize: 40, color: '#4a4a4a', lineHeight: 1.35 }}>
            사용자 중심의 경험으로 임팩트를 만드는 개발자
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ fontSize: 28, color: '#8a8a8a' }}>
            React · Next.js · TypeScript
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: '#1a1a1a' }}>
            usejiin.link
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'SUIT', data: bold, weight: 700, style: 'normal' },
        { name: 'SUIT', data: regular, weight: 400, style: 'normal' },
      ],
    },
  )
}
