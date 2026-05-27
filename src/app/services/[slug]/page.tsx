import { services } from '@/data/services'
import { notFound } from 'next/navigation'
import { ServiceDetail } from './ServiceDetail'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3)
  return <ServiceDetail service={service} otherServices={otherServices} />
}
