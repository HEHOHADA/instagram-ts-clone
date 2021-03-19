export type BreakpointsMap = {
  [key in BreakpointName]: number
}

export const widths: BreakpointsMap = {
  kilo: 480,
  mega: 768,
  giga: 960,
  tera: 1280,
  peta: 1600,
  exa: 1920
}

export type BreakpointName = 'kilo' | 'mega' | 'giga' | 'tera' | 'peta' | 'exa'

export type MediaQueryName =
  | 'untilKilo'
  | 'kiloToMega'
  | 'untilMega'
  | 'megaToGiga'
  | 'untilGiga'
  | 'gigaToTera'
  | 'teraToPeta'
  | 'petaToExa'
  | BreakpointName

export type MediaQueriesMap = Record<MediaQueryName, string>

export const queries: Record<MediaQueryName, string> = {
  untilKilo: `(max-width: ${widths.kilo - 1}px)`,

  kilo: `(min-width: ${widths.kilo}px)`,

  kiloToMega: `(min-width: ${widths.kilo}px) and (max-width: ${widths.mega - 1}px)`,

  untilMega: `(max-width: ${widths.mega - 1}px)`,

  mega: `(min-width: ${widths.mega}px)`,

  megaToGiga: `(min-width: ${widths.mega}px) and (max-width: ${widths.giga - 1}px)`,

  untilGiga: `(max-width: ${widths.giga - 1}px)`,

  giga: `(min-width: ${widths.giga}px)`,

  gigaToTera: `(min-width: ${widths.giga}px) and (max-width: ${widths.tera - 1}px)`,

  tera: `(min-width: ${widths.tera}px)`,

  teraToPeta: `(min-width: ${widths.tera}px) and (max-width: ${widths.peta - 1}px)`,

  peta: `(min-width: ${widths.peta}px)`,

  petaToExa: `(min-width: ${widths.peta}px) and (max-width: ${widths.exa - 1}px)`,

  exa: `(min-width: ${widths.exa}px)`
}

export const media: MediaQueriesMap = (Object.keys(queries) as MediaQueryName[]).reduce(
  (media, mediaQueryName) => {
    media[mediaQueryName] = `@media ${queries[mediaQueryName]}`
    return media
  },
  { ...queries }
)
