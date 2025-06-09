// // src/app/events/page.js (New Page)

// import { getAllEvents } from "@/lib/db";
// import Link from "next/link";
// import locationsData from '@/data/database.json';

// export default async function AllEventsPage() {
//   const allEvents = await getAllEvents();

//   const getLocationName = (venueId) => {
//     const location = locationsData.locations.find(loc => loc.id === venueId);
//     return location ? location.name : 'Unknown Venue';
//   };

//   return (
//     <main className="container mx-auto p-4 md:p-8">
//       <div className="mb-8">
//         <Link href="/" className="text-blue-600 hover:underline">
//           ← Back to Homepage
//         </Link>
//       </div>

//       <header className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//           All Registered Events
//         </h1>
//         <p className="text-lg text-gray-600 mt-2">
//           A complete history of all registered events on the platform.
//         </p>
//       </header>

//       <div className="space-y-6 max-w-4xl mx-auto">
//         {allEvents.length > 0 ? (
//           allEvents.map((event) => (
//             <Link 
//               key={event.id} 
//               href={`/events/${event.id}`} 
//               className="block p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:border-blue-500 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
//             >
//               <div className="flex flex-col sm:flex-row justify-between">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
//                   <p className="text-gray-600 mt-1"><strong>Venue:</strong> {getLocationName(event.venue_id)}</p>
//                 </div>
//                 <div className="mt-4 sm:mt-0 text-left sm:text-right">
//                   <p className="text-lg font-semibold text-gray-800">{new Date(event.event_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
//                   <p className="text-sm text-gray-500">Expected Crowd: {event.expected_crowd.toLocaleString('en-IN')}</p>
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No events have been registered yet.</p>
//         )}
//       </div>
//     </main>
//   );
// }

// src/app/events/page.js (Corrected)

import { getAllEvents } from "@/lib/db";
import Link from "next/link";
import locationsData from '@/data/database.json';

export default async function AllEventsPage() {
  const allEvents = await getAllEvents();

  const getLocationName = (venueId) => {
    const location = locationsData.locations.find(loc => loc.id === venueId);
    return location ? location.name : 'Unknown Venue';
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Homepage
        </Link>
      </div>

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          All Registered Events
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          A complete history of all registered events on the platform.
        </p>
      </header>

      <div className="space-y-6 max-w-4xl mx-auto">
        {allEvents.length > 0 ? (
          allEvents.map((event) => (
            // --- THIS IS THE FIX ---
            // Changed single quotes ' ' to backticks ` `
            <Link 
              key={event.id} 
              href={`/events/${event.id}`} 
              className="block p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:border-blue-500 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 mt-1"><strong>Venue:</strong> {getLocationName(event.venue_id)}</p>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <p className="text-lg font-semibold text-gray-800">{new Date(event.event_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-gray-500">Expected Crowd: {event.expected_crowd.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No events have been registered yet.</p>
        )}
      </div>
    </main>
  );
}