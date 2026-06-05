import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import prettier from 'prettier'

import { resumeValues } from './values'

const TOKEN_PATTERN = /\{\{\s*([\w.]+)\s*\}\}/g

export const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
)

export function renderTemplate(
  template: string,
  values: Record<string, string>,
): string {
  const out = template.replace(TOKEN_PATTERN, (_, key: string) => {
    const value = values[key]
    if (value === undefined) throw new Error(`정의되지 않은 토큰: ${key}`)
    return value
  })
  if (out.includes('{{')) throw new Error('치환되지 않은 토큰 잔존')
  return out
}

export async function buildResumeHtml(): Promise<string> {
  const template = readFileSync(
    path.join(ROOT, 'scripts/resume/template.html'),
    'utf8',
  )
  const html = renderTemplate(template, resumeValues())
  const config = await prettier.resolveConfig(
    path.join(ROOT, 'public/resume.html'),
  )
  return prettier.format(html, { ...config, parser: 'html' })
}
