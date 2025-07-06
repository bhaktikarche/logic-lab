import { Route, Routes } from 'react-router-dom'
import './App.css'
import QuestionList from './components/QuestionList'
import SolvePage from './components/SolvePage'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<QuestionList/>}/>
        <Route path='/solve/:id' element={<SolvePage/>}/>
      </Routes>
    </>
  )
}

export default App
