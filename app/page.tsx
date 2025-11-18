import SteveOS from '@/components/SteveOS'
import { getRecentRepos } from '@/lib/github'

export default async function HomePage() {
  const repos = await getRecentRepos('Sdefendre')
  return <SteveOS repos={repos} />
}
