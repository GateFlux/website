'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { hasVideoId } from '../data/videos'

export default function VideoPlayer({ video }) {
  const [active, setActive] = useState(false)
  const [status, setStatus] = useState('idle')
  const frame = useRef(null)
  const valid = hasVideoId(video)
  useEffect(() => {
    if (!active || status !== 'loading') return
    const timer = setTimeout(() => setStatus('unavailable'), 15000)
    return () => clearTimeout(timer)
  }, [active, status])

  return (
    <div className="overflow-hidden rounded-2xl border border-primary-100 bg-primary-900 shadow-soft">
      <div className="relative aspect-video">
        {active && status !== 'unavailable' ? (
          <>
            <iframe ref={frame} className="absolute inset-0 h-full w-full" title={video.title}
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=0&rel=0`}
              allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => { setStatus('ready'); frame.current?.focus() }}
              onError={() => setStatus('unavailable')} />
            {status === 'loading' && <p role="status" className="pointer-events-none absolute inset-x-0 top-3 text-center text-white">Loading video…</p>}
          </>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.poster} alt={`${video.title} preview`} width="1280" height="720" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            {valid && status !== 'unavailable' && (
              <button type="button" onClick={() => { setStatus('loading'); setActive(true) }}
                aria-label={`Load ${video.title} video player`}
                className="absolute inset-0 flex items-center justify-center bg-black/10 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg"><Play aria-hidden="true" className="h-7 w-7" /></span>
              </button>
            )}
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-white">
        <p role="status">{!valid ? 'Video preview coming soon. Explore GateFlux with a live demo.' : status === 'unavailable' ? 'Video could not load. You can watch on YouTube or request a demo.' : 'Video hosted on YouTube. Load the player, then press Play.'}</p>
        {valid && <a className="underline underline-offset-4" href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>}
        <Link href="/book-demo" className="font-semibold underline underline-offset-4">Request a Demo</Link>
      </div>
    </div>
  )
}
