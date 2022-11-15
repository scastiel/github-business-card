import { redirect } from 'next/navigation'
import { ParsedUrlQueryInput } from 'querystring'
import { randomTopUsername } from './top-users'
import UserPage from './[username]/page'

interface Props {
  searchParams?: ParsedUrlQueryInput
}

export default function HomePage({ searchParams }: Props) {
  if (searchParams?.user) {
    redirect(`/${searchParams.user}`)
  }

  return <UserPage />
}
