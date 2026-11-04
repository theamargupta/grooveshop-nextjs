import { InfoPage } from '@/lib/content/info-page'
import { infoPages } from '@/lib/content/info'

export default function AboutPage() {
  return <InfoPage content={infoPages.about} />
}
