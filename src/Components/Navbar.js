import React from 'react'
import NavbarStyles from './Styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={NavbarStyles.NavbarMain}>
      <h1 className={NavbarStyles.AppTitle}>Task Scheduler</h1>
    </div>
  )
}

export default Navbar