import './App.scss'
import React from 'react'
import BoardDetail from 'pages/BoardDetail/BoardDetail'
import AuthContextProvider from 'contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from 'components/Landing/Landing'
import ProtectedRoute from 'routing/ProtectedRoute'
import Auth from 'components/Auth/Auth'
import Homepage from 'pages/Homepage/Homepage'
import BoardContextProvider from 'contexts/BoardContext'

function App() {
  return (
    <AuthContextProvider>
      <BoardContextProvider>
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

            <ProtectedRoute exact path='/:id/boards' component={Homepage} />
            <ProtectedRoute exact path='/board/:id' component={BoardDetail} />
          </Switch>
        </Router>
      </BoardContextProvider>
    </AuthContextProvider>
  )
}

export default App
