import './App.scss'
import React from 'react'
import BoardDetail from 'components/BoardDetail/BoardDetail'
import AuthContextProvider from 'contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from 'components/Landing/Landing'
import ProtectedRoute from 'routing/ProtectedRoute'
import Auth from 'components/Auth/Auth'

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />

          <Route
            exact
            path='/login'
            render={(props) => <Auth {...props} authRoute='login' />}
          />

          <Route
            exact
            path='/register'
            render={(props) => <Auth {...props} authRoute='register' />}
          />

          <ProtectedRoute exact path='/board' component={BoardDetail} />
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App
