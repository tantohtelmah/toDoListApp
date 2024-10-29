import React, { useState } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css'

const calendarConfig = {
  selectRange: true,
  minDate: new Date(),
  maxDate: new Date(2030, 12, 31),
};

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const day = date.toLocaleString('en-us', { weekday: 'long' });
    const dateString = date.toLocaleDateString('en-GB');
    const time = date.toLocaleTimeString('en-GB');

    return `${day}, ${dateString} ${time}`;
  };

  return (
    <div className="container flex flex-col max-w-md mx-auto bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 p-10 mt-2 h-1/2">
      {/* Remove Home component usage */}
      <div>
        <CalendarComponent
          onChange={handleDateChange}
          value={date}
          {...calendarConfig}
          tileClassName={({ date }) =>
            date === selectedDate ? "bg-blue-500 text-white" : "" 
          }
        />
        {selectedDate && (
          <p className="mt-4 text-lg text-gray-200"> 
            Selected Date: {selectedDate.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;