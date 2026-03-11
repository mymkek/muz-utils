import { Link, Outlet, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/circle-of-fifths', label: 'Circle of Fifths' },
  { to: '/scale-fingerings', label: 'Scale Fingerings' },
]

function NavLink({ to, label }) {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link
      to={to}
      className={[
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
        active
          ? 'bg-primary-600 text-white shadow'
          : 'text-neutral-300 hover:text-white hover:bg-neutral-700',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-neutral-900/90 backdrop-blur border-b border-neutral-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-2">
        <span className="mr-4 font-bold text-lg text-primary-400 tracking-tight select-none">
          MuzUtils
        </span>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.to} {...link} />
          ))}
        </nav>
      </div>
    </header>
  )
}

export default function BaseLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Nav />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
