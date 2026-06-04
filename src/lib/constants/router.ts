interface RouterItem {
  path: string
  external?: boolean
}

export const ROUTER: Record<string, RouterItem> = {
  Resume: {
    path: '/resume.html',
  },
  GitHub: {
    path: 'https://github.com/JiinSeok',
    external: true,
  },
  LinkedIn: {
    path: 'https://linkedin.com/in/jiin-seok',
    external: true,
  },
  Email: {
    path: 'mailto:seokjiin1073@gmail.com',
    external: true,
  },
} as const
