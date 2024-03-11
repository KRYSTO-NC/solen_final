import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SimulationsScreen from './screens/SimulationsScreen'
import SollenProductScreen from './screens/SollenProductScreen'
import SimulationDetailsScreen from './screens/SimulationDetailsScreen'
import SimulationEditScreen from './screens/SimulationEditScreen'
import 'react-toastify/dist/ReactToastify.css'
import SimulationGuide from './screens/SimulationGuide/SimulationGuide'
import UserListScreen from './screens/UserListScreen'
import EditUserScreen from './screens/EditUserScreen'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/simulations" element={<SimulationsScreen />} />
      <Route path="/simulation/:id" element={<SimulationDetailsScreen />} />
      <Route path="/simulation-edit/:id" element={<SimulationEditScreen />} />
      <Route path="/sollen-products" element={<SollenProductScreen />} />
      <Route path="/userlist" element={<UserListScreen />} />
      <Route path="/admin/user/:id" element={<EditUserScreen />} />

      <Route path="/creer-simulation" element={<SimulationGuide />} />
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
