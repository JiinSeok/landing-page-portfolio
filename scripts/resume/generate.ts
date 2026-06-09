import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { buildResumeHtml, ROOT } from './render'

const EXPECTED_PDF_PAGES = 5
const CHROME_PATH =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

function pdfPageCount(filePath: string): number {
  const raw = readFileSync(filePath).toString('latin1')
  const match = /\/Count (\d+)/.exec(raw)
  if (!match) throw new Error('PDF 쪽수를 읽지 못함')
  return Number(match[1])
}

async function main() {
  const htmlPath = path.join(ROOT, 'public/resume.html')
  const pdfPath = path.join(ROOT, 'public/resume.pdf')

  writeFileSync(htmlPath, await buildResumeHtml())
  console.log(`기록: ${htmlPath}`)

  if (!existsSync(CHROME_PATH)) {
    throw new Error(
      `Chrome을 찾지 못함: ${CHROME_PATH} — CHROME_PATH 환경변수로 지정할 것`,
    )
  }
  execFileSync(CHROME_PATH, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ])

  const pages = pdfPageCount(pdfPath)
  if (pages !== EXPECTED_PDF_PAGES) {
    unlinkSync(pdfPath)
    throw new Error(
      `PDF가 ${pages}쪽 — 기대 ${EXPECTED_PDF_PAGES}쪽. 콘텐츠를 줄이거나 의도된 변경이면 EXPECTED_PDF_PAGES를 갱신할 것`,
    )
  }
  console.log(`기록: ${pdfPath} (${pages}쪽)`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
