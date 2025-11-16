
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ToDo from './pages/TodoList.jsx' 
import ImportantWork from './pages/ImportantWork.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout><ToDo/></MainLayout>}/>
        <Route path='/importantwork' element={<MainLayout><ImportantWork/></MainLayout>}/>
        <Route path='/login' element={<AuthLayout><Login/></AuthLayout>}/>
        <Route path='/register' element={<AuthLayout><Register/></AuthLayout>}/>
      </Routes>
    </Router>
  )
}

export default App
