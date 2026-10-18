// Fill these records only after approved uploads have been checked publicly.
export const gatefluxVideos = {
  promotional: {
    youtubeId: '', title: 'GateFlux Product Overview',
    description: 'A short introduction to visitor records, service requests and community notices.',
    poster: '/images/videos/gateflux-promo.webp',
  },
  walkthrough: {
    youtubeId: '', title: 'GateFlux Application Walkthrough',
    description: 'Explore visitor pre-approval, complaint tracking, notices, invoice records and amenity reservations.',
    poster: '/images/videos/gateflux-demo.webp',
  },
  short: {
    youtubeId: '', title: 'GateFlux in 60 Seconds',
    description: 'A mobile introduction to everyday community operations.',
    poster: '/images/videos/gateflux-short.webp',
  },
}

export function hasVideoId(video) {
  return /^[A-Za-z0-9_-]{11}$/.test(video.youtubeId || '')
}

export function videoStructuredData(video, baseUrl) {
  // Publication verification is an explicit editorial step, never inferred from an ID.
  if (!hasVideoId(video) || !video.publiclyVerified ||
      !/^\d{4}-\d{2}-\d{2}T/.test(video.uploadDate || '') || !Number.isFinite(Date.parse(video.uploadDate)) ||
      !/^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/.test(video.duration || '') || video.duration === 'PT') return null
  return {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    name: video.title, description: video.description,
    thumbnailUrl: new URL(video.poster, baseUrl).href,
    uploadDate: video.uploadDate, duration: video.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
  }
}
