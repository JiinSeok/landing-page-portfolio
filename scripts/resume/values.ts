import {
  careers,
  identity,
  metrics,
  projects,
  RESUME_AS_OF,
  talks,
} from '@/lib/constants/facts'

import {
  careerMonths,
  durationLabel,
  totalCareerLabel,
  whenLabel,
} from './duration'

export function resumeValues(): Record<string, string> {
  return {
    'identity.email': identity.email,
    'identity.github': identity.github,
    'identity.domain': identity.domain,
    'careers.dost11.start': careers.dost11.start,
    'when.dost11.months': durationLabel(
      careerMonths(careers.dost11, RESUME_AS_OF),
    ),
    'when.chainshift': whenLabel(careers.chainshift, RESUME_AS_OF),
    'when.fitogether': whenLabel(careers.fitogether, RESUME_AS_OF),
    'when.mulryu': whenLabel(careers.mulryu, RESUME_AS_OF),
    'when.yonhap': whenLabel(careers.yonhap, RESUME_AS_OF),
    'computed.totalCareer': totalCareerLabel(
      Object.values(careers),
      RESUME_AS_OF,
    ),
    'metrics.photoboothDays': metrics.photoboothDays,
    'metrics.errorMsgFiles': metrics.errorMsgFiles,
    'metrics.apiRouteReplace': metrics.apiRouteReplace,
    'metrics.landingSpeed': metrics.landingSpeed,
    'metrics.jiraProjects': metrics.jiraProjects,
    'metrics.responseRate': metrics.responseRate,
    'metrics.formReduction': metrics.formReduction,
    'metrics.bodycodiUsers': metrics.bodycodiUsers,
    'metrics.virtualizationThreshold': metrics.virtualizationThreshold,
    'metrics.virtualizationProof': metrics.virtualizationProof,
    'metrics.albaformTeam': metrics.albaformTeam,
    'metrics.albaformCommitShare': metrics.albaformCommitShare,
    'metrics.albaformDuration': metrics.albaformDuration,
    'metrics.fpp': metrics.fpp,
    'metrics.settlementTickets': metrics.settlementTickets,
    'metrics.buildCold': metrics.buildCold,
    'metrics.buildDevStart': metrics.buildDevStart,
    'metrics.most267Lighthouse': metrics.most267Lighthouse,
    'metrics.most267Lcp': metrics.most267Lcp,
    'talks.seo.when': talks.seo.when,
    'talks.seo.url': talks.seo.url,
    'talks.cx.when': talks.cx.when,
    'talks.cx.url': talks.cx.url,
    'projects.formkit.npm': projects.formkit.npm,
  }
}
