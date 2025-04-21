import React from 'react';
import { BiBookAlt, BiHome } from 'react-icons/bi';
import { IoMdTimer } from 'react-icons/io';
import { FaRegImages } from 'react-icons/fa6';
import { MdOutlinePeopleAlt, MdOutlineShoppingBag } from 'react-icons/md';
import { GrSystem } from 'react-icons/gr';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { Link } from 'react-router-dom';
import logo from '../Components/logo.jpg';
import '../Styles/Sidebar.css';

const Sidebar = () => {
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
        <Link to="/dashboard" className="item">
          <BiHome className="icon" />
          Dashboard
        </Link>

        <a href="#" className="item">
          <IoMdTimer className="icon" />
          Real Time Tracking
        </a>

        <Link to="/screenshot" className="item">
          <FaRegImages className="icon" />
          Screenshot
        </Link>

        {/* ✅ Fixed this */}
        <Link to="/employees" className="item">
          <MdOutlinePeopleAlt className="icon" />
          Employees
        </Link>

        <a href="#" className="item">
          <MdOutlineShoppingBag className="icon" />
          Projects
        </a>

        <a href="#" className="item">
          <GrSystem className="icon" />
          Apps and Websites
        </a>

        <a href="#" className="item">
          <FaCalendarAlt className="icon" />
          Time And Date
        </a>

        <a href="#" className="item">
          <IoMdSettings className="icon" />
          Settings
        </a>

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
