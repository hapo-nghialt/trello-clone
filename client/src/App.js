import './App.scss'
import React from 'react'
import BoardDetail from 'pages/BoardDetail'
import AuthContextProvider from 'contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from 'components/Landing'
import ProtectedRoute from 'routing/ProtectedRoute'
import Auth from 'components/Auth'
import Homepage from 'pages/Homepage'
import BoardContextProvider from 'contexts/BoardContext'
import PrivateBoard from 'pages/PrivateBoard'
import UserContextProvider from 'contexts/UserContext'

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
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
              <ProtectedRoute exact path='/private' component={PrivateBoard} />
            </Switch>
          </Router>
        </BoardContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default App
