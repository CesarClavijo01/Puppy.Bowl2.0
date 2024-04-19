import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import AllPlayers from './Components/AllPlayers'
import SinglePlayer from './Components/SinglePlayer'


function App() {

  return (
    <>
      <div className='navBar'>
        <Link to='/'>Puppy Bowl</Link>
      </div>
      <div className='mainContainer'>
        <Routes>
          <Route path='/' element={<AllPlayers />} />
          <Route path='/player/:playerId' element={<SinglePlayer />} />
        </Routes>
      </div>
    </>
  )
}

export default App
