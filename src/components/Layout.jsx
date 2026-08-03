import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import NavigationNarrative from '../motion/patterns/NavigationNarrative'

export default function Layout() {
  return (
    <div className="min-h-screen min-w-0 flex flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-grow min-w-0 w-full">
        <NavigationNarrative>
          <Outlet />
        </NavigationNarrative>
      </main>
      <Footer />
    </div>
  )
}
