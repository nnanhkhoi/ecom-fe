import React from 'react'

import { Route, Routes, Outlet } from 'react-router-dom'

import { ProtectedRoute } from './utils/ProtectedRoute'

import Header from './components/common/Header/Header'
import Cart from './components/common/Cart/Cart'
// import Footer from './components/common/Footer/Footer'

import Featured from 'components/Product/Featured'
import NewProducts from 'components/Product/NewProducts'
import ProductPage from './pages/ProductPage'

import AllProducts from 'pages/AllProducts'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import AccountPage from './pages/Account'
import CategoriesPage from './pages/Categories'
// import './App.css'

const BasicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

const HomePage = () => {
  return (
    <>
      <Featured />
      <NewProducts />
    </>
  )
}

const App = () => {
  return (
    <Routes>
      <Route element={<BasicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:link" element={<CategoriesPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
        {/* End of protected routes */}
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
