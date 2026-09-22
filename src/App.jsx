import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import { logger } from './lib/logger'

const Home = lazy(() => import('./pages/Home'))
const Work = lazy(() => import('./pages/Work'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'))
const Process = lazy(() => import('./pages/Process'))
const Resources = lazy(() => import('./pages/Resources'))
const HireSoftwareArchitect = lazy(() => import('./pages/HireSoftwareArchitect'))
const Contact = lazy(() => import('./pages/Contact'))
const Insights = lazy(() => import('./pages/Insights'))
const InsightDetail = lazy(() => import('./pages/InsightDetail'))
const Industries = lazy(() => import('./pages/Industries'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Sitemap = lazy(() => import('./pages/Sitemap'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function RouteLogger() {
  const { pathname } = useLocation()
  useEffect(() => {
    logger.debug('route.view', { pathname })
  }, [pathname])
  return null
}

function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center" role="status" aria-live="polite">
      <span className="font-mono-data text-mono-data text-on-surface-variant">Loading…</span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <RouteLogger />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="solutions/:slug" element={<SolutionDetail />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<WorkDetail />} />
            <Route path="industries" element={<Industries />} />
            <Route path="insights" element={<Insights />} />
            <Route path="insights/:slug" element={<InsightDetail />} />
            <Route path="process" element={<Process />} />
            <Route path="resources" element={<Resources />} />
            <Route path="hire-software-architect" element={<HireSoftwareArchitect />} />
            <Route path="why-work-with-me" element={<Navigate to="/resources" replace />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
