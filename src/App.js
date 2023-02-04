import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Announcement from './component/Announcement'
import Footer from './component/Footer'
import Navbar from './component/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Success from './pages/Success'
import userRequest from './config'
import { getUserCart } from './redux/cartRedux'
import { logout } from './redux/userRedux'
import OrderHistory from './pages/OrderHistory'
import OrderDetail from './pages/OrderDetail'

let logoutTimer;
const App = () => {
  const { currentUser: user, isFetching, loginDate } = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      const getCart = async () => {
        const response = await userRequest.get('/carts/usercart')
        dispatch(getUserCart(response?.data?.products))
      }
      getCart()
    }
  }, [user, isFetching, dispatch])
  useEffect(() => {
    if (user) {
      const updateCart = async () => {
        await userRequest.patch('/carts/usercart', {
          products: cart.products
        })
      }
      updateCart()
    }
  }, [cart, user])

  const logoutFunc = useCallback(() => {
    dispatch(logout())
  }, [dispatch])
  useEffect(() => {
    if (loginDate) {
      const remainingTime = new Date(loginDate).getTime() - new Date().getTime()
      logoutTimer = setTimeout(logoutFunc, remainingTime);
    } else clearTimeout(logoutTimer)
  }, [])
  return (
    <div style={{ position: 'relative' }}>
      <Router>
        <Navbar />
        <div style={{ marginTop: '80px' }}>
          <Announcement />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/products' element={<ProductList />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />
            <Route exact path='/login' element={
              user ? <Navigate to='/' replace /> : <Login />
            } />
            <Route exact path='/register' element={
              user ? <Navigate to='/' replace /> : <Register />
            } />
            <Route exact path='/history' element={
              user ? <OrderHistory /> : <Navigate to='/' replace />
            } />
            <Route exact path='/order/:id' element={
              user ? <OrderDetail /> : <Navigate to='/' replace />
            } />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/success' element={<Success />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App