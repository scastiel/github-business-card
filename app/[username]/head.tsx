import { ParsedUrlQueryInput } from 'querystring'
import { SeoHeaders } from '../seo-headers'

interface Props {
  params: ParsedUrlQueryInput
}

export default function UserHead({ params }: Props) {
  const username = String(params.username)

  return <SeoHeaders username={username} />
}
