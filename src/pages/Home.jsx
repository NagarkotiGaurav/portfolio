import HomeScene from '../motion/scenes/HomeScene'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta('/')
  return <HomeScene />
}
