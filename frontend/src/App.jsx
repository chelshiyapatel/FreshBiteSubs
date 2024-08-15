import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Checkout from './pages/Checkout/Checkout'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignUp/SignUp'
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/ContactUs'
import AdminHome from './pages/AdminHomePage/AdminHome'
import UpcomingOffers from './pages/UpcommingOffers/UpcomingOffers'
import OrderManagement from './pages/OrderManagement/OrderManagement'
import OrderTracking from './pages/Order Tracking/OrderTracking'


const App = () => {
  return (
    <div className='app'>
      {/* I refer ch-9 for NavLink. Reference: https://conestoga-bookshelf.vitalsource.com/reader/books/9781484243916/epubcfi/6/22[%3Bvnd.vst.idref%3DA426054_2_En_9_Chapter]!/4/8/22[Sec4]/12[Par77]/30[PC29]/4/16/1:7[%C2%A0%C2%A0.%2C..] */}
      <Routes>
            <Route path="/user-home" element={<Home/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
            <Route path="/details" element={<DetailsPage/>}></Route>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/signup" element={<SignupPage/>}></Route>
            <Route path="/about" element={<AboutUs/>}></Route>
            <Route path="/contact" element={<ContactUs/>}></Route>
            <Route path="/admin-home" element={<AdminHome/>}></Route>
            <Route path="/upcoming-offers" element={<UpcomingOffers/>}></Route>
            <Route path="/order-management" element={<OrderManagement/>}></Route>
            <Route path="/order-tracking" element={<OrderTracking />}></Route>
      </Routes>


    </div>
  )
}

export default App