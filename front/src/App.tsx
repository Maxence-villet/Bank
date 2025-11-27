import Layout from './apps/LayoutPage/pages'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <div className='h-screen'>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
