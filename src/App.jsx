import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectRoute from './components/auth/ProtectRoute';
import './App.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const NotFound = lazy(() => import('./components/pages/NotFound'));

const GetInsights = lazy(() => import('./components/pages/GetInsights'));
const PostDetails = lazy(() => import('./components/pages/PostDetails'));
const AddPostDetails = lazy(() => import('./components/pages/AddPostDetails'));
// const UpdateEmployee = lazy(() => import('./components/pages/UpdateEmployee'));

import { Toaster } from 'react-hot-toast';
// import { server } from './components/constants/config';



const App = () => {


  // return loader ? <LayoutLoader/> :  (
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
            <Route path="/" element={<GetInsights/>} />
            <Route path="/postDetails" element={<PostDetails/>} />
            <Route path="/post/new" element={<AddPostDetails/>} />
            <Route path='*' element={<NotFound />} />
          
        </Routes>
      </Suspense>
      <Toaster position='bottom-center' />
    </BrowserRouter>
  )
}

export default App