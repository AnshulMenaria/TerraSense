import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../Modules/Header';

const Layout = () => {
  return (
    <>
        <div>
          <div className="app-container">
            <Header />
              <div className="main-content">
                <Outlet/>
              </div>
          </div>
        </div>
    </>
  )
}

export default Layout