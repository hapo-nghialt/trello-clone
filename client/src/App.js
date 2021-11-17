import './App.scss'
import React from 'react'
import Register from 'components/Auth/Register/Register'
import BoardDetail from 'components/BoardDetail/BoardDetail'
import AuthContextProvider from 'contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from 'components/Landing/Landing'
import ProtectedRoute from 'routing/ProtectedRoute'
// import Login from 'components/Login/Login'

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />

          <ProtectedRoute exact path="/board" component={BoardDetail} />
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App
