import { pageMetadata } from '../../src/lib/seo'
import DataDeletionPage from '../../src/views/DataDeletionPage'

export const metadata = pageMetadata('/data-deletion', {
  title: 'Data Deletion Policy — GateFlux',
  description: 'How to request deletion of your personal data from GateFlux, including timelines and the step-by-step process.',
})

export default function DataDeletion() {
  return <DataDeletionPage />
}
