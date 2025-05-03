import React from 'react';
import { BiBookAlt, BiHome } from 'react-icons/bi';
import { IoMdTimer } from 'react-icons/io';
import { FaRegImages } from 'react-icons/fa6';
import { MdOutlinePeopleAlt, MdOutlineShoppingBag } from 'react-icons/md';
import { GrSystem } from 'react-icons/gr';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import logo from '../Components/logo.jpg';
import '../Styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon" />
        <h1 className="work">
          work<span>plus</span>
        </h1>
      </div>
      <hr />
      <div className="menu--list">
        <Link to="/dashboard" className={`item ${currentPath === '/dashboard' ? 'active' : ''}`}>
          <BiHome className="icon" />
          Dashboard
        </Link>

        <Link to="#" className="item">
          <IoMdTimer className="icon" />
          Real Time Tracking
        </Link>

        <Link to="/screenshot" className={`item ${currentPath === '/screenshot' ? 'active' : ''}`}>
          <FaRegImages className="icon" />
          Screenshot
        </Link>

        <Link to="/employees" className={`item ${currentPath === '/employees' ? 'active' : ''}`}>
          <MdOutlinePeopleAlt className="icon" />
          Employees
        </Link>

        <Link to="#" className="item">
          <MdOutlineShoppingBag className="icon" />
          Projects
        </Link>

        <Link to="#" className="item">
          <GrSystem className="icon" />
          Apps and Websites
        </Link>

        <Link to="#" className="item">
          <FaCalendarAlt className="icon" />
          Time And Date
        </Link>

        <Link to="#" className="item">
          <IoMdSettings className="icon" />
          Settings
        </Link>

        <div className="photo">
          <img
            src={logo}
            alt="Profile"
            style={{
              borderRadius: '50%',
              width: 30,
              height: 30,
            }}
          />
        </div>
        <div className="name">
          <h6>joe Geller</h6>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
