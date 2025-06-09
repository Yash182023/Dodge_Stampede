// // // src/app/dashboard/page.js (Full and Complete Tier 2 Code)

// // import { getServerSession } from "next-auth/next";
// // import { redirect } from "next/navigation";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // import EventForm from "@/components/EventForm";
// // import IncidentForm from "@/components/IncidentForm";
// // import AnnouncementForm from "@/components/AnnouncementForm";
// // import { Pool } from 'pg';
// // import { revalidatePath } from "next/cache";
// // import locationsData from '@/data/database.json'; // Import static venue data

// // // Create a single pool instance to be shared
// // const pool = new Pool({
// //   host: process.env.POSTGRES_HOST,
// //   user: process.env.POSTGRES_USER,
// //   password: process.env.POSTGRES_PASSWORD,
// //   database: process.env.POSTGRES_DATABASE,
// //   ssl: true,
// // });

// // // Helper function to find user ID from email, used by all server actions
// // async function getUserIdByEmail(email) {
// //   const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
// //   return result.rows[0]?.id;
// // }

// // // Function to get active events for the form dropdowns
// // async function getActiveEvents() {
// //     try {
// //         // We also fetch venue_id to link to map zones
// //         const result = await pool.query(`SELECT id, title, venue_id FROM events WHERE event_date >= NOW()::date ORDER BY event_date ASC`);
// //         return result.rows;
// //     } catch (e) {
// //         console.error("Failed to fetch active events:", e);
// //         return [];
// //     }
// // }

// // export default async function DashboardPage() {
// //   const session = await getServerSession(authOptions);

// //   if (!session) {
// //     redirect("/api/auth/signin?callbackUrl=/dashboard");
// //   }

// //   const activeEvents = await getActiveEvents();

// //   // Create a map of venue IDs to their defined map zones from the static JSON file
// //   const venueZones = locationsData.locations.reduce((acc, loc) => {
// //     // This is a placeholder for a more robust zone definition system.
// //     // For now, we manually define zones for our test venue.
// //     if (loc.id === 'chinnaswamy_stadium_bengaluru') {
// //       acc[loc.id] = [
// //         { id: 'gate-1', name: 'Gate 1' },
// //         { id: 'gate-4', name: 'Gate 4' },
// //         { id: 'stand-a', name: 'Stand A' },
// //         { id: 'stand-b', name: 'Stand B' },
// //         { id: 'stand-c', name: 'Stand C' },
// //         { id: 'stand-d', name: 'Stand D' },
// //       ];
// //     }
// //     // You could add more 'if' blocks for other venues here
// //     return acc;
// //   }, {});

// //   // --- SERVER ACTION #1: For creating events ---
// //   async function createEvent(prevState, formData) {
// //     'use server';
// //     const userSession = await getServerSession(authOptions);
// //     if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
// //     try {
// //       const title = formData.get('title');
// //       const venue_id = formData.get('venue_id');
// //       const event_date = formData.get('event_date');
// //       const expected_crowd = formData.get('expected_crowd');
// //       if (!title || !venue_id || !event_date || !expected_crowd) { return { message: 'All fields are required.', success: false }; }
// //       const organizer_id = await getUserIdByEmail(userSession.user.email);
// //       if (!organizer_id) { throw new Error("Could not find user in database."); }
// //       await pool.query(`INSERT INTO events (title, venue_id, event_date, expected_crowd, organizer_id) VALUES ($1, $2, $3, $4, $5)`, [title, venue_id, event_date, parseInt(expected_crowd, 10), organizer_id]);
// //       revalidatePath('/');
// //       revalidatePath('/dashboard');
// //       return { message: 'Event created successfully!', success: true };
// //     } catch (e) {
// //       console.error("Failed to create event:", e);
// //       return { message: `Failed to create event. Error: ${e.message}`, success: false };
// //     }
// //   }

// //   // --- SERVER ACTION #2: For creating incidents (MODIFIED) ---
// //   async function createIncident(prevState, formData) {
// //     'use server';
// //     const userSession = await getServerSession(authOptions);
// //     if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
// //     try {
// //         const event_id = formData.get('event_id');
// //         const map_zone_id = formData.get('map_zone_id'); // Using the new zone ID
// //         const incident_type = formData.get('incident_type');
// //         const severity = formData.get('severity');
// //         const description = formData.get('description');
// //         if (!event_id || !map_zone_id || !incident_type || !severity) { return { message: 'Required fields are missing.', success: false }; }
        
// //         // Look up the human-readable zone name for storage
// //         const eventData = await pool.query('SELECT venue_id FROM events WHERE id = $1', [event_id]);
// //         const venueId = eventData.rows[0]?.venue_id;
// //         const location_zone = venueZones[venueId]?.find(z => z.id === map_zone_id)?.name || map_zone_id;
        
// //         const reporter_id = await getUserIdByEmail(userSession.user.email);
// //         if (!reporter_id) { throw new Error("Could not find reporting user in database."); }

// //         await pool.query(
// //             `INSERT INTO incidents (event_id, incident_type, severity, location_zone, map_zone_id, description, reporter_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
// //             [parseInt(event_id, 10), incident_type, severity, location_zone, map_zone_id, description, reporter_id]
// //         );
        
// //         revalidatePath(`/events/${event_id}`);
// //         return { message: 'Incident reported successfully!', success: true };
// //     } catch (e) {
// //         console.error("Failed to report incident:", e);
// //         return { message: `Failed to report incident. Error: ${e.message}`, success: false };
// //     }
// //   }

// //   // --- SERVER ACTION #3: For creating announcements ---
// //   async function createAnnouncement(prevState, formData) {
// //     'use server';
// //     const userSession = await getServerSession(authOptions);
// //     if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
// //     try {
// //       const event_id = formData.get('event_id');
// //       const message = formData.get('message');
// //       if (!event_id || !message) { return { message: 'Event and message are required.', success: false }; }
// //       const author_id = await getUserIdByEmail(userSession.user.email);
// //       if (!author_id) throw new Error("Could not find author's user in database.");
// //       await pool.query(`INSERT INTO announcements (event_id, message, author_id) VALUES ($1, $2, $3)`, [parseInt(event_id, 10), message, author_id]);
// //       revalidatePath(`/events/${event_id}`);
// //       return { message: 'Announcement posted successfully!', success: true };
// //     } catch (e) {
// //       console.error("Failed to post announcement:", e);
// //       return { message: `Failed to post announcement. Error: ${e.message}`, success: false };
// //     }
// //   }

// //   return (
// //     <main className="container mx-auto p-4 md:p-8">
// //       <header className="mb-8">
// //         <h1 className="text-3xl font-bold">Authority Dashboard</h1>
// //         <p className="text-gray-600">Welcome, {session.user.name}!</p>
// //       </header>
      
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold mb-4 text-green-700">Post a Public Announcement</h2>
// //         <AnnouncementForm createAnnouncementAction={createAnnouncement} events={activeEvents} />
// //       </section>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //         <section>
// //           <h2 className="text-2xl font-semibold mb-4 text-red-700">Report an Incident</h2>
// //           <IncidentForm createIncidentAction={createIncident} events={activeEvents} venueZones={venueZones} />
// //         </section>
// //         <section>
// //           <h2 className="text-2xl font-semibold mb-4 text-blue-700">Register a New Event</h2>
// //           <EventForm createEventAction={createEvent} />
// //         </section>
// //       </div>
// //     </main>
// //   );
// // }


// //new code

// // src/app/dashboard/page.js (Enhanced Indian Modern Dashboard)

// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import EventForm from "@/components/EventForm";
// import IncidentForm from "@/components/IncidentForm";
// import AnnouncementForm from "@/components/AnnouncementForm";
// import { Pool } from 'pg';
// import { revalidatePath } from "next/cache";
// import locationsData from '@/data/database.json';

// // Create a single pool instance to be shared
// const pool = new Pool({
//   host: process.env.POSTGRES_HOST,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   ssl: true,
// });

// // Helper function to find user ID from email, used by all server actions
// async function getUserIdByEmail(email) {
//   const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
//   return result.rows[0]?.id;
// }

// // Function to get active events for the form dropdowns
// async function getActiveEvents() {
//     try {
//         const result = await pool.query(`SELECT id, title, venue_id FROM events WHERE event_date >= NOW()::date ORDER BY event_date ASC`);
//         return result.rows;
//     } catch (e) {
//         console.error("Failed to fetch active events:", e);
//         return [];
//     }
// }

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/api/auth/signin?callbackUrl=/dashboard");
//   }

//   const activeEvents = await getActiveEvents();

//   // Create a map of venue IDs to their defined map zones from the static JSON file
//   const venueZones = locationsData.locations.reduce((acc, loc) => {
//     if (loc.id === 'chinnaswamy_stadium_bengaluru') {
//       acc[loc.id] = [
//         { id: 'gate-1', name: 'Gate 1' },
//         { id: 'gate-4', name: 'Gate 4' },
//         { id: 'stand-a', name: 'Stand A' },
//         { id: 'stand-b', name: 'Stand B' },
//         { id: 'stand-c', name: 'Stand C' },
//         { id: 'stand-d', name: 'Stand D' },
//       ];
//     }
//     return acc;
//   }, {});

//   // --- SERVER ACTION #1: For creating events ---
//   async function createEvent(prevState, formData) {
//     'use server';
//     const userSession = await getServerSession(authOptions);
//     if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
//     try {
//       const title = formData.get('title');
//       const venue_id = formData.get('venue_id');
//       const event_date = formData.get('event_date');
//       const expected_crowd = formData.get('expected_crowd');
//       if (!title || !venue_id || !event_date || !expected_crowd) { return { message: 'All fields are required.', success: false }; }
//       const organizer_id = await getUserIdByEmail(userSession.user.email);
//       if (!organizer_id) { throw new Error("Could not find user in database."); }
//       await pool.query(`INSERT INTO events (title, venue_id, event_date, expected_crowd, organizer_id) VALUES ($1, $2, $3, $4, $5)`, [title, venue_id, event_date, parseInt(expected_crowd, 10), organizer_id]);
//       revalidatePath('/');
//       revalidatePath('/dashboard');
//       return { message: 'Event created successfully!', success: true };
//     } catch (e) {
//       console.error("Failed to create event:", e);
//       return { message: `Failed to create event. Error: ${e.message}`, success: false };
//     }
//   }

  
//   // --- SERVER ACTION #2: For creating incidents (MODIFIED) ---
//   async function createIncident(prevState, formData) {
//     'use server';
//     const userSession = await getServerSession(authOptions);
//     if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
//     try {
//         const event_id = formData.get('event_id');
//         const map_zone_id = formData.get('map_zone_id');
//         const incident_type = formData.get('incident_type');
//         const severity = formData.get('severity');
//         const description = formData.get('description');
//         if (!event_id || !map_zone_id || !incident_type || !severity) { return { message: 'Required fields are missing.', success: false }; }
        
//         const eventData = await pool.query('SELECT venue_id FROM events WHERE id = $1', [event_id]);
//         const venueId = eventData.rows[0]?.venue_id;
//         const location_zone = venueZones[venueId]?.find(z => z.id === map_zone_id)?.name || map_zone_id;
        
//         const reporter_id = await getUserIdByEmail(userSession.user.email);
//         if (!reporter_id) { throw new Error("Could not find reporting user in database."); }

//         await pool.query(
//             `INSERT INTO incidents (event_id, incident_type, severity, location_zone, map_zone_id, description, reporter_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
//             [parseInt(event_id, 10), incident_type, severity, location_zone, map_zone_id, description, reporter_id]
//         );
        
//         revalidatePath(`/events/${event_id}`);
//         return { message: 'Incident reported successfully!', success: true };
//     } catch (e) {
//         console.error("Failed to report incident:", e);
//         return { message: `Failed to report incident. Error: ${e.message}`, success: false };
//     }
//   }

//   // --- SERVER ACTION #3: For creating announcements ---
//   async function createAnnouncement(prevState, formData) {
//     'use server';
//     const userSession = await getServerSession(authOptions);
//     if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
//     try {
//       const event_id = formData.get('event_id');
//       const message = formData.get('message');
//       if (!event_id || !message) { return { message: 'Event and message are required.', success: false }; }
//       const author_id = await getUserIdByEmail(userSession.user.email);
//       if (!author_id) throw new Error("Could not find author's user in database.");
//       await pool.query(`INSERT INTO announcements (event_id, message, author_id) VALUES ($1, $2, $3)`, [parseInt(event_id, 10), message, author_id]);
//       revalidatePath(`/events/${event_id}`);
//       return { message: 'Announcement posted successfully!', success: true };
//     } catch (e) {
//       console.error("Failed to post announcement:", e);
//       return { message: `Failed to post announcement. Error: ${e.message}`, success: false };
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
//       {/* Decorative Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <main className="relative container mx-auto p-6 md:p-8 lg:p-12">
//         {/* Header Section */}
//         <header className="mb-12 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-6 shadow-lg">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//             </svg>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
//             Authority Dashboard
//           </h1>
//           <div className="flex items-center justify-center space-x-2 text-lg text-gray-600">
//             <span>नमस्ते,</span>
//             <span className="font-semibold text-orange-600">{session.user.name}!</span>
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//           </div>
//           <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
//             Manage events, monitor incidents, and communicate with the public through your centralized safety dashboard.
//           </p>
//         </header>

//         {/* Announcement Section - Full Width */}
//         <section className="mb-12">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
//             <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
//               <div className="flex items-center space-x-3">
//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
//                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">सार्वजनिक घोषणा | Public Announcement</h2>
//                   <p className="text-green-100 mt-1">Broadcast important messages to event attendees</p>
//                 </div>
//               </div>
//             </div>
//             <div className="p-8">
//               <AnnouncementForm createAnnouncementAction={createAnnouncement} events={activeEvents} />
//             </div>
//           </div>
//         </section>

//         {/* Forms Grid */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//           {/* Incident Reporting Section */}
//           <section className="order-1">
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
//               <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
//                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-white">घटना रिपोर्ट | Report Incident</h2>
//                     <p className="text-red-100 mt-1">Document and track safety incidents in real-time</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-8">
//                 <IncidentForm createIncidentAction={createIncident} events={activeEvents} venueZones={venueZones} />
//               </div>
//             </div>
//           </section>

//           {/* Event Registration Section */}
//           <section className="order-2">
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
//                       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6m-6 0l-2-2m2 2l2-2m-2 0V7m6 8V7m-6 0L8 5m2 2h8l2 2-2 2H10l-2-2z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-white">नया इवेंट | Register Event</h2>
//                     <p className="text-blue-100 mt-1">Create and register new public events for monitoring</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-8">
//                 <EventForm createEventAction={createEvent} />
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Quick Stats Section */}
//         <section className="mt-12">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-orange-100">Active Events</p>
//                   <p className="text-3xl font-bold">{activeEvents.length}</p>
//                 </div>
//                 <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100">System Status</p>
//                   <p className="text-xl font-bold">ऑनलाइन | Online</p>
//                 </div>
//                 <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
//                   <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100">Quick Access</p>
//                   <p className="text-xl font-bold">Dashboard</p>
//                 </div>
//                 <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// src/app/dashboard/page.js (Corrected and Final Version)

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventForm from "@/components/EventForm";
import IncidentForm from "@/components/IncidentForm";
import AnnouncementForm from "@/components/AnnouncementForm";
import { Pool } from 'pg';
import { revalidatePath } from "next/cache";
import locationsData from '@/data/database.json';

// Create a single pool instance to be shared
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: true,
});

// --- THIS IS THE FIX ---
// Define venueZones at the top level of the module so all functions can access it.
const venueZones = locationsData.locations.reduce((acc, loc) => {
  if (loc.id === 'chinnaswamy_stadium_bengaluru') {
    acc[loc.id] = [
      { id: 'gate-1', name: 'Gate 1' },
      { id: 'gate-4', name: 'Gate 4' },
      { id: 'stand-a', name: 'Stand A' },
      { id: 'stand-b', name: 'Stand B' },
      { id: 'stand-c', name: 'Stand C' },
      { id: 'stand-d', name: 'Stand D' },
    ];
  }
  return acc;
}, {});
// ----------------------

// Helper function to find user ID from email, used by all server actions
async function getUserIdByEmail(email) {
  const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  return result.rows[0]?.id;
}

// Function to get active events for the form dropdowns
async function getActiveEvents() {
    try {
        const result = await pool.query(`SELECT id, title, venue_id FROM events WHERE event_date >= NOW()::date ORDER BY event_date ASC`);
        return result.rows;
    } catch (e) {
        console.error("Failed to fetch active events:", e);
        return [];
    }
}

// --- SERVER ACTION #1: For creating events ---
async function createEvent(prevState, formData) {
  'use server';
  const userSession = await getServerSession(authOptions);
  if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
  try {
    const title = formData.get('title');
    const venue_id = formData.get('venue_id');
    const event_date = formData.get('event_date');
    const expected_crowd = formData.get('expected_crowd');
    if (!title || !venue_id || !event_date || !expected_crowd) { return { message: 'All fields are required.', success: false }; }
    const organizer_id = await getUserIdByEmail(userSession.user.email);
    if (!organizer_id) { throw new Error("Could not find user in database."); }
    await pool.query(`INSERT INTO events (title, venue_id, event_date, expected_crowd, organizer_id) VALUES ($1, $2, $3, $4, $5)`, [title, venue_id, event_date, parseInt(expected_crowd, 10), organizer_id]);
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { message: 'Event created successfully!', success: true };
  } catch (e) {
    console.error("Failed to create event:", e);
    return { message: `Failed to create event. Error: ${e.message}`, success: false };
  }
}

// --- SERVER ACTION #2: For creating incidents ---
async function createIncident(prevState, formData) {
  'use server';
  const userSession = await getServerSession(authOptions);
  if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
  try {
      const event_id = formData.get('event_id');
      const map_zone_id = formData.get('map_zone_id');
      const incident_type = formData.get('incident_type');
      const severity = formData.get('severity');
      const description = formData.get('description');
      if (!event_id || !map_zone_id || !incident_type || !severity) { return { message: 'Required fields are missing.', success: false }; }
      
      const eventData = await pool.query('SELECT venue_id FROM events WHERE id = $1', [event_id]);
      const venueId = eventData.rows[0]?.venue_id;
      // This line will now work correctly because venueZones is defined in the outer scope
      const location_zone = venueZones[venueId]?.find(z => z.id === map_zone_id)?.name || map_zone_id;
      
      const reporter_id = await getUserIdByEmail(userSession.user.email);
      if (!reporter_id) { throw new Error("Could not find reporting user in database."); }

      await pool.query(
          `INSERT INTO incidents (event_id, incident_type, severity, location_zone, map_zone_id, description, reporter_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [parseInt(event_id, 10), incident_type, severity, location_zone, map_zone_id, description, reporter_id]
      );
      
      revalidatePath(`/events/${event_id}`);
      return { message: 'Incident reported successfully!', success: true };
  } catch (e) {
    console.error("Failed to report incident:", e);
    return { message: `Failed to report incident. Error: ${e.message}`, success: false };
  }
}

// --- SERVER ACTION #3: For creating announcements ---
async function createAnnouncement(prevState, formData) {
  'use server';
  const userSession = await getServerSession(authOptions);
  if (!userSession?.user?.email) { return { message: 'Authentication error.', success: false }; }
  try {
    const event_id = formData.get('event_id');
    const message = formData.get('message');
    if (!event_id || !message) { return { message: 'Event and message are required.', success: false }; }
    const author_id = await getUserIdByEmail(userSession.user.email);
    if (!author_id) throw new Error("Could not find author's user in database.");
    await pool.query(`INSERT INTO announcements (event_id, message, author_id) VALUES ($1, $2, $3)`, [parseInt(event_id, 10), message, author_id]);
    revalidatePath(`/events/${event_id}`);
    return { message: 'Announcement posted successfully!', success: true };
  } catch (e) {
    console.error("Failed to post announcement:", e);
    return { message: `Failed to post announcement. Error: ${e.message}`, success: false };
  }
}


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  const activeEvents = await getActiveEvents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <main className="relative container mx-auto p-6 md:p-8 lg:p-12">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Authority Dashboard
          </h1>
          <div className="flex items-center justify-center space-x-2 text-lg text-gray-600">
            <span>नमस्ते,</span>
            <span className="font-semibold text-orange-600">{session.user.name}!</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Manage events, monitor incidents, and communicate with the public through your centralized safety dashboard.
          </p>
        </header>

        <section className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">सार्वजनिक घोषणा | Public Announcement</h2>
                  <p className="text-green-100 mt-1">Broadcast important messages to event attendees</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <AnnouncementForm createAnnouncementAction={createAnnouncement} events={activeEvents} />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <section className="order-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">घटना रिपोर्ट | Report Incident</h2>
                    <p className="text-red-100 mt-1">Document and track safety incidents in real-time</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <IncidentForm createIncidentAction={createIncident} events={activeEvents} venueZones={venueZones} />
              </div>
            </div>
          </section>

          <section className="order-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6m-6 0l-2-2m2 2l2-2m-2 0V7m6 8V7m-6 0L8 5m2 2h8l2 2-2 2H10l-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">नया इवेंट | Register Event</h2>
                    <p className="text-blue-100 mt-1">Create and register new public events for monitoring</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <EventForm createEventAction={createEvent} />
              </div>
            </div>
          </section>
        </div>

        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Active Events</p>
                  <p className="text-3xl font-bold">{activeEvents.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">System Status</p>
                  <p className="text-xl font-bold">ऑनलाइन | Online</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Quick Access</p>
                  <p className="text-xl font-bold">Dashboard</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
