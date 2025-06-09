// // src/lib/db.js

// import { Pool } from 'pg';

// // Create the pool once and export it for use in other files
// export const pool = new Pool({
//   host: process.env.POSTGRES_HOST,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   ssl: true,
// });

// // Function to get all upcoming events
// export async function getUpcomingEvents() {
//   try {
//     // Select events where the date is today or in the future, order by the soonest
//     const result = await pool.query(
//       `SELECT * FROM events WHERE event_date >= NOW()::date ORDER BY event_date ASC`
//     );
//     return result.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     // In case of an error, return an empty array to prevent the page from crashing
//     return [];
//   }
// }


// export async function getEventById(id) {
//   try {
//     const result = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
//     return result.rows[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     return null; // Return null if event not found or error occurs
//   }
// }

// export async function getIncidentsByEventId(eventId) {
//   try {
//     // Order by most recent first, and bring high severity to the top
//     const result = await pool.query(
//       `SELECT * FROM incidents WHERE event_id = $1 
//        ORDER BY 
//          CASE severity 
//            WHEN 'High' THEN 1 
//            WHEN 'Medium' THEN 2 
//            WHEN 'Low' THEN 3 
//          END, 
//          reported_at DESC`,
//       [eventId]
//     );
//     return result.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     return [];
//   }
// }



// // src/lib/db.js
// // ... add this new function ...
// export async function getAnnouncementsByEventId(eventId) {
//   try {
//     const result = await pool.query(
//       `SELECT * FROM announcements WHERE event_id = $1 ORDER BY created_at DESC`,
//       [eventId]
//     );
//     return result.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     return [];
//   }
// }

// src/lib/db.js (Full and Complete Code)

import { Pool } from 'pg';

// Create the pool once and export it for use in other files
export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: true,
});

// Function to get upcoming events for the homepage
export async function getUpcomingEvents() {
  try {
    const result = await pool.query(
      `SELECT * FROM events WHERE event_date >= NOW()::date ORDER BY event_date ASC`
    );
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

// --- THIS IS THE MISSING FUNCTION ---
// Function to get ALL events for the /events page
export async function getAllEvents() {
  try {
    // Order by most recent date first
    const result = await pool.query(
      `SELECT * FROM events ORDER BY event_date DESC`
    );
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}
// ------------------------------------

// Function to get a single event by its ID
export async function getEventById(id) {
  try {
    const result = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

// Function to get all incidents for a specific event
export async function getIncidentsByEventId(eventId) {
  try {
    const result = await pool.query(
      `SELECT * FROM incidents WHERE event_id = $1 
       ORDER BY 
         CASE severity 
           WHEN 'High' THEN 1 
           WHEN 'Medium' THEN 2 
           WHEN 'Low' THEN 3 
         END, 
         reported_at DESC`,
      [eventId]
    );
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

// Function to get all announcements for a specific event
export async function getAnnouncementsByEventId(eventId) {
  try {
    const result = await pool.query(
      `SELECT * FROM announcements WHERE event_id = $1 ORDER BY created_at DESC`,
      [eventId]
    );
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}