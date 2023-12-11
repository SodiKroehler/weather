 "use client"

import React, { useState } from 'react';
import styles from './formstyles.module.css';

// TypeScript typings for form data
interface FormData {
  firstName: string;
  phoneNumber: string;
  selectedTime: number;
  latitude: string;
  longitude: string;
  extras: string;
}

const NewClient: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    phoneNumber: '',
    selectedTime: 0,
    latitude: '',
    longitude: '',
    extras: ''
  });
  const [submitted, setsubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted with data:', formData);
    const submitted = await fetch('/api/newUser', {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    if (!submitted.ok) {
      const errorMessage = await submitted.text();
      throw new Error(errorMessage);
    }

    setsubmitted(true)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.bigContainer}>
        <p> sign up for weather texts, bro </p>
        {!submitted && <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.mylabel}>
            First Name:
            <input
                type="text"
                name="firstName"
                className={styles.myInput}
                value={formData.firstName}
                onChange={handleInputChange}
            />
            </label>
            <br />
            <label className={styles.mylabel}>
            Phone Number:
            <input
                type="tel"
                name="phoneNumber"
                className={styles.myInput}
                value={formData.phoneNumber}
                onChange={handleInputChange}
            />
            </label>
            <br />
  

            <label htmlFor="time" className={styles.mylabel}>Time to Send (EST):
             <select id="time" name="selectedTime" value={formData.selectedTime} className={styles.myInput} onChange={handleInputChangeSelect}>
                 {[6, 7, 8, 9, 10].map(hour => (
                     <option key={hour} value={hour}>{hour + " AM"} </option>
                 ))}
             </select>
            </label>

            <br />
            <label className={styles.mylabel}>
            Latitude:
            <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                className={styles.myInput}
            />
            </label>
            <br />
            <label className={styles.mylabel}>
            Longitude:
            <input
                type="text"
                name="longitude"
                className={styles.myInput}
                value={formData.longitude}
                onChange={handleInputChange}
            />
            </label>
            <br />

            <label className={styles.mylabel}>
            Anything else you want (like cool facts/stories etc):
            <input
                type="text"
                name="extras"
                className={styles.myInput}
                value={formData.extras}
                onChange={handleInputChange}
            />
            </label>
            <br />
            <div  className={styles.buttonDiv}> 
              <button type="submit" className={styles.myButton}>Submit</button>
            </div>
        </form>
        </div>}

        {submitted && <div>
            Thank you for your submission! 
        </div>
        }
    </div>
  );
};



export default NewClient;


// {} <fieldset>
// <legend>Time To Send</legend>

// {/* Dropdown for the hour selection (6, 7, 8, 9, 10) */}
// <label htmlFor="hour">Select Hour:</label>
// <select id="hour" name="hour">
//     {[6, 7, 8, 9, 10].map(hour => (
//         <option key={hour} value={hour}>{hour}</option>
//     ))}
// </select>

// <br />

// {/* Dropdown for the time zones in the United States */}
// <label htmlFor="timeZone">Select Time Zone:</label>
// <select id="timeZone" name="timeZone">
//     {[
//         'America/New_York',
//         'America/Chicago',
//         'America/Denver',
//         'America/Los_Angeles'
//         // Add more time zones as needed
//     ].map(timeZone => (
//         <option key={timeZone} value={timeZone}>{timeZone}</option>
//     ))}
// </select>

// </fieldset> */}}


