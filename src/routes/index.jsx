

import {Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ReadMorePage from '../pages/ReadMorePage';
import AdminLogin from '../pages/AdminLogin';
import AdminPanel from '../pages/AdminPanel';
import LatestPostsPage from '../pages/LatestPostsPage';
import Dashboard from '../pages/Dashboard';

const RoutesFiles = () => {

  return (
    <Routes>
      
        <Route path="/" element={<Home />}/>
        <Route  path="/blog/:id" element={<ReadMorePage/>} />
        <Route  path="/dashboard" element={ <Dashboard/>} />
        <Route  path="/latest-post" element={<LatestPostsPage/>} />
        <Route  path="/login" element={<AdminLogin/>} />
      </Routes>
  );
};

export default RoutesFiles;