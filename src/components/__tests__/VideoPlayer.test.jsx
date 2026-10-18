import { act, fireEvent, render, screen } from '@testing-library/react'
import VideoPlayer from '../VideoPlayer'
import { videoStructuredData } from '../../data/videos'

const video = { title: 'Product overview', description: 'Verified feature overview', poster: '/images/videos/gateflux-promo.webp', youtubeId: '' }

test('missing IDs show a useful fallback without a player', () => {
  const { container } = render(<VideoPlayer video={video} />)
  expect(container.querySelector('iframe')).toBeNull()
  expect(screen.getByText(/preview coming soon/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Request a Demo' })).toHaveAttribute('href', '/book-demo')
})

test('YouTube loads only after keyboard accessible button activation and never autoplays', () => {
  const { container } = render(<VideoPlayer video={{ ...video, youtubeId: 'abcdefghijk' }} />)
  expect(container.querySelector('iframe')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: /Load Product overview/ }))
  const iframe = screen.getByTitle('Product overview')
  expect(iframe.src).toContain('youtube-nocookie.com/embed/abcdefghijk?autoplay=0')
  expect(iframe).toHaveAttribute('allowFullScreen')
})

test('a loading timeout offers a direct link and demo fallback', () => {
  jest.useFakeTimers()
  render(<VideoPlayer video={{ ...video, youtubeId: 'abcdefghijk' }} />)
  fireEvent.click(screen.getByRole('button'))
  act(() => jest.advanceTimersByTime(15000))
  expect(screen.queryByTitle('Product overview')).not.toBeInTheDocument()
  expect(screen.getByText(/could not load/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Watch on YouTube' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=abcdefghijk')
  jest.useRealTimers()
})

test('structured data requires verified publication details', () => {
  expect(videoStructuredData(video, 'https://gateflux.co')).toBeNull()
  expect(videoStructuredData({ ...video, youtubeId: 'abcdefghijk' }, 'https://gateflux.co')).toBeNull()
  const published = { ...video, youtubeId: 'abcdefghijk', publiclyVerified: true, uploadDate: '2026-10-18T12:00:00Z', duration: 'PT1M10S' }
  expect(videoStructuredData(published, 'https://gateflux.co')).toMatchObject({ '@type': 'VideoObject', duration: 'PT1M10S' })
})
