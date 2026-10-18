import Link from 'next/link'
import Container from './Container'
import SectionHeader from './SectionHeader'
import VideoPlayer from './VideoPlayer'
import { gatefluxVideos, hasVideoId, videoStructuredData } from '../data/videos'
import config from '../lib/config'

export default function VideoShowcase({ walkthrough = false }) {
  const video = walkthrough || !hasVideoId(gatefluxVideos.promotional)
    ? gatefluxVideos.walkthrough
    : gatefluxVideos.promotional
  const schema = videoStructuredData(video, config.website.baseUrl)
  return (
    <section id={walkthrough ? 'platform-walkthrough' : 'see-gateflux'} className="section-padding bg-neutral-50">
      <Container>
        <SectionHeader badge="Product demo" title={walkthrough ? 'Explore the GateFlux Platform' : 'See GateFlux in Action'}
          subtitle="Explore how GateFlux helps organize visitor management, maintenance requests, community notices, and everyday residential operations." />
        <div className="mx-auto mt-10 max-w-5xl"><VideoPlayer video={video} /></div>
        {walkthrough && <ul className="mx-auto mt-6 grid max-w-5xl gap-3 text-primary-700 sm:grid-cols-2 lg:grid-cols-3">
          {['Visitor records and pre-approval', 'Complaint and maintenance tracking', 'Community notices', 'Invoice record review', 'Amenity booking forms', 'Staff directory'].map(item => <li key={item}>• {item}</li>)}
        </ul>}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link className="btn-primary" href="/book-demo">Request a Demo</Link>
          <Link className="btn-secondary" href={walkthrough ? '/pricing' : '/demo'}>{walkthrough ? 'View Packages' : 'Explore the Platform'}</Link>
          <Link className="btn-secondary" href="/features">Explore Features</Link>
        </div>
        {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />}
      </Container>
    </section>
  )
}
