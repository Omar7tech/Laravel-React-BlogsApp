

import { TailwindBackground } from './components/Backgrounds/TailwindBackground'
import About from './pages/About'
import Home from './pages/Home'
import RouterRoutes from './Router/Routes'

function App() {


  return (
    <>
      <div className='overflow-x-hidden'>
        <div className='pt-16'><RouterRoutes /></div>
      </div>

    </>
  )
}

export default App
