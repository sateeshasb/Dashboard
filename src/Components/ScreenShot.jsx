import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Styles/ScreenShot.css";

const ScreenShot = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dateOption, setDateOption] = useState("Today");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Generate date-based images on component mount
  useEffect(() => {
    const generatedImages = generateDateBasedImages();
    setImages(generatedImages);
    // Set initial date range to Today
    const today = new Date();
    setDateRange([today, today]);
  }, []);

  // Generate images with dates
  const generateDateBasedImages = () => {
    const today = new Date();
    const imageList = [];
    
    const imageSources = [
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/krishna1.jpg",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/smoking-burger.png",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/VsCode.png",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/HTML.jpeg",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/CSS.png",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/Javascript.png",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/ReactJs.png",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/Bootstrap.jpeg",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/Java.png",
      "https://pub-5b753a99da3f47b6b455234213c4e61f.r2.dev/MongoDB.png",
    ];
    
    const categories = [
      "others", "food", "technology", "technology", 
      "technology", "technology", "technology", 
      "technology", "technology", "database"
    ];
    
    for (let i = 0; i < 10; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      
      // Format the date as a string
      const dateString = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
      
      imageList.push({
        date: currentDate,
        displayDate: dateString,
        src: imageSources[i],
        category: categories[i]
      });
    }
    
    return imageList;
  };

  // Handle dropdown option selection
  const handleOptionSelect = (option) => {
    setDateOption(option);
    
    // Only show calendar for Custom option
    if (option === "Custom") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
      
      // Set date range based on selected option
      const today = new Date();
      let start = new Date(today);
      let end = new Date(today);
      
      switch(option) {
        case "Yesterday":
          start.setDate(today.getDate() - 1);
          end.setDate(today.getDate() - 1);
          break;
        case "This Week":
          start.setDate(today.getDate() - today.getDay());
          break;
        case "Last Week":
          start.setDate(today.getDate() - today.getDay() - 7);
          end.setDate(today.getDate() - today.getDay() - 1);
          break;
        case "This Month":
          start = new Date(today.getFullYear(), today.getMonth(), 1);
          break;
        case "Last Month":
          start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          end = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
        default:
          // Today is default
          break;
      }
      
      setDateRange([start, end]);
    }
    
    setShowDropdown(false);
  };

  // Handle category filter selection
  const handleFilterSelect = (category) => {
    setFilter(category);
    setActiveFilter(category);
  };

  // Handle calendar date range selection
  const handleCalendarChange = (value) => {
    setDateRange(value);
    if (value[0] && value[1]) {
      setShowCalendar(false);
    }
  };

  // Format date range for display
  const formatDateRange = () => {
    if (dateOption === "Custom" && dateRange[0] && dateRange[1]) {
      const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
      };
      return `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`;
    }
    return dateOption;
  };

  // Filter images based on category and date range
  const filteredImages = images.filter(img => {
    // Category filter
    const categoryMatch = filter === "all" || img.category === filter;
    
    // Date filter
    let dateMatch = true;
    if (dateRange[0] && dateRange[1]) {
      const imgDate = new Date(img.date);
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      
      // Reset time components for accurate comparison
      imgDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      
      dateMatch = imgDate >= startDate && imgDate <= endDate;
    }
    
    return categoryMatch && dateMatch;
  });

  return (
    <div className="screenshot-container">
      {/* Date Range Dropdown */}
      <div className="date-dropdown">
        <button 
          className="dropdown-button" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {formatDateRange()} <span>▼</span>
        </button>
        
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={() => handleOptionSelect("Today")}>Today</button>
            <button onClick={() => handleOptionSelect("Yesterday")}>Yesterday</button>
            <button onClick={() => handleOptionSelect("This Week")}>This Week</button>
            <button onClick={() => handleOptionSelect("Last Week")}>Last Week</button>
            <button onClick={() => handleOptionSelect("This Month")}>This Month</button>
            <button onClick={() => handleOptionSelect("Last Month")}>Last Month</button>
            <button onClick={() => handleOptionSelect("Custom")}>Custom</button>
          </div>
        )}
      </div>

      {/* Calendar for Custom Date Selection */}
      {showCalendar && (
        <div className="calendar-wrapper">
          <div className="calendar-header">Select Date Range:</div>
          <Calendar 
            onChange={handleCalendarChange}
            selectRange={true}
            value={dateRange}
          />
        </div>
      )}

      {/* Category Filter Buttons */}
      <div className="filter-buttons">
        <button 
          className={activeFilter === "all" ? "active" : ""} 
          onClick={() => handleFilterSelect("all")}
        >
          All
        </button>
        <button 
          className={activeFilter === "food" ? "active" : ""} 
          onClick={() => handleFilterSelect("food")}
        >
          Food
        </button>
        <button 
          className={activeFilter === "technology" ? "active" : ""} 
          onClick={() => handleFilterSelect("technology")}
        >
          Technology
        </button>
        <button 
          className={activeFilter === "database" ? "active" : ""} 
          onClick={() => handleFilterSelect("database")}
        >
          Database
        </button>
        <button 
          className={activeFilter === "others" ? "active" : ""} 
          onClick={() => handleFilterSelect("others")}
        >
          Others
        </button>
      </div>

      {/* Image Gallery with Date and Category Labels */}
      <div className="image-gallery">
        {filteredImages.length > 0 ? (
          filteredImages.map((img, index) => (
            <div key={index} className="image-container">
              
              <img
                src={img.src}
                alt={`${img.category} image`}
                className="gallery-image"
              />
               
            </div>
          ))
        ) : (
          <div className="no-images-message">
            No images found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenShot;