import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import '../styles/content.css'
 

const ContentHeader = () => {
  return (
    <div className='contenet--header'>
        <h1 className="header--title">Real Time Tracking</h1>
        <div className="header--activity">
          <div className='notes'>
            <CgNotes />
            <h6>Review Usage</h6>
            </div>
          <div className='bell'><FaRegBell /></div>


            <div className='calender' >
                <div className='year'>
                    <FaRegCalendarAlt />
                </div>
                <div className='month'>
                    <div className='week'>               
                     <h6 >Fri,Aug 17-Tue,Aug21</h6> 
                    </div>
                      <div className='time'>
                     <h6 >Office Time</h6>
                     </div>  
                </div>
             </div>     
 
           
        </div>

      
    </div>
  )
}

export default ContentHeader

