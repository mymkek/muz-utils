import { ScaleFingerings } from '../../modules/scale-fingerings';

export default function ScaleFingeringsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-400">Scale Fingerings</h1>
        <p className="text-neutral-400 mt-1">Browse fingering patterns for scales across instruments.</p>
      </div>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        <ScaleFingerings />
      </div>
    </div>
  )
}
