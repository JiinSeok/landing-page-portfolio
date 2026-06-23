/**
 * 포트폴리오 사이트를 PDF로 출력한다(exports/석지인_포트폴리오_사이트.pdf).
 *
 * 이력서(generate.ts)는 정적 HTML이라 chrome --print-to-pdf로 충분하지만, 사이트는
 * 클라이언트 렌더링 + lazy 이미지라 단순 print가 빈 페이지를 만든다. 그래서 헤드리스
 * Chrome을 CDP로 직접 몰아 (1) 렌더·하이드레이션 대기 (2) 끝까지 스크롤해 lazy 이미지
 * 로드 (3) 배너·칩·커서동반 등 크롬 UI 숨김 (4) 전체 높이를 한 장으로 printToPDF 한다.
 * 의존성 없이 Node 22 내장 fetch/WebSocket만 사용.
 *
 * 사용: pnpm site-pdf   (개발 서버가 SITE_URL에 떠 있어야 함)
 */
import { execFile, type ChildProcess } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const ROOT = process.cwd()
const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3001/'
const OUT = path.join(ROOT, 'exports/석지인_포트폴리오_사이트.pdf')
const CHROME_PATH =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 9333
const WIDTH = 1440

interface Target {
  type: string
  webSocketDebuggerUrl?: string
}

class CDP {
  private ws: WebSocket
  private id = 0
  private pending = new Map<
    number,
    { resolve: (v: unknown) => void; reject: (e: Error) => void }
  >()

  constructor(ws: WebSocket) {
    this.ws = ws
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data as string)
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)!
        this.pending.delete(msg.id)
        if (msg.error) reject(new Error(msg.error.message))
        else resolve(msg.result)
      }
    }
  }

  send<T = Record<string, unknown>>(
    method: string,
    params: Record<string, unknown> = {},
  ): Promise<T> {
    const id = ++this.id
    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, {
        resolve: resolve as (v: unknown) => void,
        reject,
      })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  async evalJs<T>(expression: string): Promise<T> {
    const r = await this.send<{ result: { value: T } }>('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })
    return r.result.value
  }
}

async function pageWsUrl(): Promise<string> {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const targets = (await res.json()) as Target[]
      const page = targets.find((t) => t.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {
      // devtools 엔드포인트가 아직 안 떴을 수 있음
    }
    await sleep(150)
  }
  throw new Error('Chrome devtools 엔드포인트를 찾지 못함')
}

async function main() {
  let chrome: ChildProcess | undefined
  let ws: WebSocket | undefined
  try {
    chrome = execFile(CHROME_PATH, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      `--remote-debugging-port=${PORT}`,
      `--window-size=${WIDTH},900`,
      'about:blank',
    ])

    const wsUrl = await pageWsUrl()
    ws = new WebSocket(wsUrl)
    await new Promise<void>((resolve, reject) => {
      ws!.onopen = () => resolve()
      ws!.onerror = () => reject(new Error('WebSocket 연결 실패'))
    })
    const cdp = new CDP(ws)

    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })
    // 페인트 전 배너 닫힘 상태 주입
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `try{localStorage.setItem('tappytype-banner-dismissed','1')}catch(e){}`,
    })

    await cdp.send('Page.navigate', { url: SITE_URL })
    await sleep(2500) // 하이드레이션·초기 렌더 대기

    // 크롬 UI(배너·재오픈 칩·커서 동반·맨위로 버튼) 숨김
    await cdp.evalJs(`(() => {
      document.documentElement.setAttribute('data-promo-dismissed','');
      const s = document.createElement('style');
      s.textContent = '[data-promo-banner],[data-promo-chip]{display:none!important}';
      document.head.appendChild(s);
      return true;
    })()`)

    // 끝까지 스크롤해 lazy 이미지 로드
    const total = await cdp.evalJs<number>(`document.body.scrollHeight`)
    for (let y = 0; y < total + 1000; y += 700) {
      await cdp.evalJs(`window.scrollTo(0, ${y})`)
      await sleep(280)
    }
    await cdp.evalJs(`window.scrollTo(0, 0)`)
    // 디코드되지 않은 이미지가 있으면 강제 디코드
    await cdp.evalJs(`Promise.all([...document.images].map(img => img.decode().catch(() => {})))`)
    await sleep(1200)

    const fullHeight = await cdp.evalJs<number>(
      `Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)`,
    )
    const paperHeightIn = Math.min(fullHeight / 96, 200) // Chrome printToPDF 한도 ~200in
    if (fullHeight / 96 > 200) {
      console.warn(
        `경고: 페이지가 ${Math.round(fullHeight)}px로 너무 길어 200in에서 잘릴 수 있음`,
      )
    }

    const pdf = await cdp.send<{ data: string }>('Page.printToPDF', {
      printBackground: true,
      paperWidth: WIDTH / 96,
      paperHeight: paperHeightIn,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      scale: 1,
      preferCSSPageSize: false,
    })

    mkdirSync(path.dirname(OUT), { recursive: true })
    writeFileSync(OUT, Buffer.from(pdf.data, 'base64'))
    console.log(
      `기록: ${OUT} (${Math.round(fullHeight)}px 높이, ${(Buffer.from(pdf.data, 'base64').length / 1024).toFixed(0)}KB)`,
    )
  } finally {
    ws?.close()
    chrome?.kill()
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
