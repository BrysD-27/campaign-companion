import './App.css'
import HomePage from './pages/HomePage'

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomePage children={children} />
    </>
  )
}

export default App
