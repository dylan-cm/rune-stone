import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'
import './styles/globalStyles.css'
import * as serviceWorker from './utils/serviceWorker'

import firebase from 'firebase/app'
import firebaseConfig from './constants/firebaseConfig'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Routes />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
