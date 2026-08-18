import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  if (!items?.length) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-outline-variant bg-surface"
    >
      <ol className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-data text-mono-data text-on-surface-variant">
        {items.map((crumb, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${crumb.path}-${crumb.name}`} className="flex items-center gap-2 min-w-0">
              {index > 0 && (
                <span aria-hidden="true" className="text-outline-variant">
                  /
                </span>
              )}
              {last ? (
                <span className="text-primary truncate" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="hover:text-primary transition-colors truncate"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
