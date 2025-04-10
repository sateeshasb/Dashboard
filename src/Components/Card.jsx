import React from "react";
import "../Styles/Card.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosTrendingDown } from "react-icons/io";
import { IoTrendingUpSharp } from "react-icons/io5";
import { BiSearch, BiNotification } from 'react-icons/bi'

const Card = () => {
  return (

    <div>
    <div className="satish">
      <div className=" container">
        <div className="Employe">
        <p className="num">Number of Employees</p>
        <MdOutlineShoppingBag className="shop"/></div>
        <h2>24</h2>
      </div>
      <div className="container">
       <div className="Employe"> <p className="cur">Currently Working</p>
        <IoTrendingUpSharp className="shop"/>   </div>
        <h2>16</h2>
      </div>
      <div className="container">
        <div className="Employe">
        <p className="sla">Currently Slacking</p>
        <IoIosTrendingDown className="shop"/></div>
         <h2>2</h2> 
      </div>
      <div className="container">
        <div className="Employe">
        <p className="pro">Productivity</p>
        <IoTrendingUpSharp className="shop" /></div>
        <div className="Employe"><h2>93.57%</h2>
        <span className="change">+2.37%</span></div>
      </div>
     
      
    </div>
     
            
    </div>
  
  );
};

export default Card;
