import { pageMetadata } from '../../src/lib/seo'
import ModulesPage from '../../src/views/ModulesPage'

export const metadata = pageMetadata('/modules', {
  title: 'Modules & Features — GateFlux',
  description: 'Explore all GateFlux modules: visitor management, gate security, finance, helpdesk, community, governance, and more.',
})

export default function Page() {
  return <ModulesPage />
}
