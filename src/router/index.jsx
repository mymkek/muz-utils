import { createBrowserRouter } from 'react-router-dom'
import BaseLayout from '../layouts/BaseLayout.jsx'
import Home from '../pages/home/index.jsx'
import CircleOfFifths from '../pages/circle-of-fifths/index.jsx'
import ScaleFingerings from '../pages/scale-fingerings/index.jsx'

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/circle-of-fifths', element: <CircleOfFifths /> },
      { path: '/scale-fingerings', element: <ScaleFingerings /> },
    ],
  },
])

export default router
