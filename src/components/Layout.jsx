import { Outlet, useLocation } from 'react-router-dom'
import { getBreadcrumbTrail } from '../data/pageMeta'
import Footer from './Footer'
import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'
import NavigationNarrative from '../motion/patterns/NavigationNarrative'

export default function Layout() {
  const { pathname } = useLocation()
  const crumbs = getBreadcrumbTrail(pathname)

  return (
    <div className="min-h-screen min-w-0 flex flex-col overflow-x-clip">
      <Navbar />
      <Breadcrumbs items={crumbs} />
      <main className="flex-grow min-w-0 w-full">
        <NavigationNarrative>
          <Outlet />
        </NavigationNarrative>
      </main>
      <Footer />
    </div>
  )
}
