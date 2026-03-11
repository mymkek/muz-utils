import { Link } from 'react-router-dom'

const tools = [
  {
    to: '/circle-of-fifths',
    title: 'Circle of Fifths',
    description: 'Explore key relationships, chord progressions, and harmonic structures.',
    icon: '🎵',
  },
  {
    to: '/scale-fingerings',
    title: 'Scale Fingerings',
    description: 'Browse fingering patterns for scales across different instruments.',
    icon: '🎹',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12 py-12">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold text-primary-400 tracking-tight">MuzUtils</h1>
        <p className="text-neutral-400 text-lg max-w-md">
          A collection of music theory tools to help you practice, compose, and explore.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-primary-600 hover:bg-neutral-800 transition-all duration-200 shadow-md"
          >
            <div className="text-4xl mb-3">{tool.icon}</div>
            <h2 className="text-lg font-semibold text-neutral-100 group-hover:text-primary-400 transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
