import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import RepurposerApp from './pages/Main/RepurposerApp'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/repurposer" element={<RepurposerApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
