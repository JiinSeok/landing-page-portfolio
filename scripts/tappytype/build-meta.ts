/**
 * TAPPYTYPE_SEO 상수를 읽어 public/tappytype/index.html 의
 * <!-- SEO:START --> ~ <!-- SEO:END --> 블록(메타 태그 + JSON-LD)을 생성·주입한다.
 *
 * 실행: pnpm tappytype:meta
 * 멱등 — 값이 그대로면 파일을 건드리지 않는다.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { TAPPYTYPE_SEO as s } from './seo.config'

const TARGET = path.join(process.cwd(), 'public/tappytype/index.html')
const START = '<!-- SEO:START'
const END = '<!-- SEO:END -->'

const esc = (v: string) =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function buildBlock(): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${s.url}/#website`,
        url: s.url,
        name: s.siteName,
        inLanguage: 'ko',
        description: s.description,
      },
      {
        '@type': 'SoftwareApplication',
        name: s.siteName,
        applicationCategory: s.jsonLd.applicationCategory,
        operatingSystem: s.jsonLd.operatingSystem,
        url: s.url,
        image: s.image,
        inLanguage: s.jsonLd.inLanguage,
        description: s.jsonLd.description,
      },
    ],
  }

  return [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}">`,
    `<meta property="og:title" content="${esc(s.title)}">`,
    `<meta property="og:description" content="${esc(s.shareDescription)}">`,
    `<meta property="og:image" content="${esc(s.image)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${esc(s.url)}">`,
    `<meta property="og:site_name" content="${esc(s.siteName)}">`,
    `<meta property="og:locale" content="${s.locale}">`,
    `<meta property="og:locale:alternate" content="${s.altLocale}">`,
    `<meta property="og:image:width" content="${s.imageWidth}">`,
    `<meta property="og:image:height" content="${s.imageHeight}">`,
    `<meta property="og:image:alt" content="${esc(s.imageAlt)}">`,
    `<meta name="twitter:card" content="${s.twitterCard}">`,
    `<meta name="twitter:title" content="${esc(s.title)}">`,
    `<meta name="twitter:description" content="${esc(s.shareDescription)}">`,
    `<meta name="twitter:image" content="${esc(s.image)}">`,
    `<meta name="robots" content="index, follow">`,
    `<meta name="theme-color" content="${s.themeColor}">`,
    `<link rel="canonical" href="${esc(s.url)}">`,
    `<script type="application/ld+json">`,
    JSON.stringify(jsonLd, null, 2),
    `</script>`,
  ].join('\n')
}

function main() {
  const html = readFileSync(TARGET, 'utf8')
  const startIdx = html.indexOf(START)
  const endIdx = html.indexOf(END)
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(
      `SEO 마커를 찾지 못함 (${START} ... ${END}) — ${path.relative(process.cwd(), TARGET)}`,
    )
  }
  const startTagEnd = html.indexOf('-->', startIdx) + 3
  const next = `${html.slice(0, startTagEnd)}\n${buildBlock()}\n${html.slice(endIdx)}`

  if (next === html) {
    console.log('SEO 메타 변화 없음 (이미 최신).')
    return
  }
  writeFileSync(TARGET, next)
  console.log('SEO 메타 갱신 완료 → public/tappytype/index.html')
}

main()
