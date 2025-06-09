// // // src/app/events/[id]/page.js (Corrected Full Code)

// // import { getEventById, getIncidentsByEventId, getAnnouncementsByEventId } from '@/lib/db';
// // import { notFound } from 'next/navigation';
// // import Link from 'next/link';
// // import { getServerSession } from 'next-auth/next';
// // import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// // import IncidentActions from '@/components/IncidentActions';
// // import VenueMap from '@/components/VenueMap';
// // import locationsData from '@/data/database.json';

// // export const dynamic = 'force-dynamic';

// // const getSeverityColor = (severity) => {
// //   switch (severity) {
// //     case 'High': return 'bg-red-100 border-red-500 text-red-800';
// //     case 'Medium': return 'bg-orange-100 border-orange-500 text-orange-800';
// //     case 'Low': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
// //     default: return 'bg-gray-100 border-gray-500 text-gray-800';
// //   }
// // };

// // function calculateCrowdStatus(incidents) {
// //     const highSeverityCount = incidents.filter(i => i.severity === 'High' && i.status !== 'Resolved').length;
// //     const mediumSeverityCount = incidents.filter(i => i.severity === 'Medium' && i.status !== 'Resolved').length;
// //     if (highSeverityCount > 0) return { level: 'CRITICAL', color: 'text-red-600' };
// //     if (mediumSeverityCount > 2) return { level: 'HIGH', color: 'text-orange-600' };
// //     if (mediumSeverityCount > 0) return { level: 'ELEVATED', color: 'text-yellow-600' };
// //     return { level: 'NORMAL', color: 'text-green-600' };
// // }

// // export default async function EventDetailPage({ params }) {
// //   // THIS IS THE FIX FOR PROBLEM #1
// //   // We don't access params.id here. We pass it directly to the functions.
  
// //   const [event, incidents, announcements, session] = await Promise.all([
// //     getEventById(params.id),
// //     getIncidentsByEventId(params.id),
// //     getAnnouncementsByEventId(params.id),
// //     getServerSession(authOptions)
// //   ]);
  
// //   if (!event) {
// //     notFound();
// //   }
  
// //   const isLoggedIn = !!session;
// //   const crowdStatus = calculateCrowdStatus(incidents);
// //   const venue = locationsData.locations.find(loc => loc.id === event.venue_id);

// //   return (
// //     <main className="container mx-auto p-4 md:p-8">
// //       <div className="mb-8">
// //         <Link href="/" className="text-blue-600 hover:underline">← Back to Homepage</Link>
// //       </div>

// //       <header className="mb-8 p-6 bg-white rounded-lg shadow-md border">
// //         <h1 className="text-4xl font-extrabold text-gray-900">{event.title}</h1>
// //         <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
// //           <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString('en-IN', { dateStyle: 'full' })}</p>
// //           <p><strong>Expected Crowd:</strong> {event.expected_crowd.toLocaleString('en-IN')}</p>
// //           <p><strong>Status:</strong> <span className="font-semibold text-green-600">Live</span></p>
// //         </div>
// //       </header>

// //       <section className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
// //           <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Public Safety Status</h2>
// //           <div className="text-center mb-4">
// //               <p className="text-lg">Current Crowd Status:</p>
// //               <p className={`text-4xl font-black ${crowdStatus.color}`}>{crowdStatus.level}</p>
// //           </div>
// //           {announcements.length > 0 && (
// //               <div>
// //                   <h3 className="text-lg font-semibold text-center mb-2">Latest Announcements:</h3>
// //                   <div className="max-w-2xl mx-auto p-4 bg-white rounded-md shadow">
// //                       <p className="text-xl font-medium text-center">{announcements[0].message}</p>
// //                       <p className="text-xs text-center text-gray-500 mt-2">Posted at {new Date(announcements[0].created_at).toLocaleTimeString('en-IN')}</p>
// //                   </div>
// //               </div>
// //           )}
// //       </section>

// //       {isLoggedIn && (
// //         <section>
// //           <h2 className="text-3xl font-bold mb-6 border-b pb-2">Authority Command View</h2>
// //           <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
// //             <div className="lg:col-span-3">
// //               <h3 className="text-xl font-semibold mb-2">Live Venue Map</h3>
// //               <VenueMap mapUrl={venue?.map_url} incidents={incidents} />
// //             </div>
// //             <div className="lg:col-span-2">
// //               <h3 className="text-xl font-semibold mb-2">Incident Feed</h3>
// //               <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
// //                 {incidents.length > 0 ? (
// //                   incidents.map((incident) => (
// //                     <div key={incident.id} className={`p-4 rounded-lg border-l-4 shadow ${getSeverityColor(incident.severity)}`}>
// //                       <div className="flex justify-between items-center">
// //                         <h3 className="text-xl font-bold">{incident.incident_type} at {incident.location_zone}</h3>
// //                         <span className="font-mono text-sm">{new Date(incident.reported_at).toLocaleTimeString('en-IN')}</span>
// //                       </div>
// //                       <p className="mt-2 text-gray-700">{incident.description || 'No further details provided.'}</p>
// //                       <div className="mt-2 flex justify-between items-center">
// //                           <span className="inline-block bg-white px-2 py-1 text-xs font-semibold rounded-full border">
// //                               Severity: <strong>{incident.severity}</strong>
// //                           </span>
// //                           <IncidentActions incident={incident} eventId={event.id} />
// //                       </div>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="p-6 text-center bg-white rounded-lg shadow">
// //                     <p className="text-gray-500">No incidents reported for this event yet.</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       )}
// //     </main>
// //   );
// // }

// //new code

// // src/app/events/[id]/page.js (Enhanced Indian Modern Theme)

// import { getEventById, getIncidentsByEventId, getAnnouncementsByEventId } from '@/lib/db';
// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import IncidentActions from '@/components/IncidentActions';
// import VenueMap from '@/components/VenueMap';
// import locationsData from '@/data/database.json';

// export const dynamic = 'force-dynamic';

// const getSeverityColor = (severity) => {
//   switch (severity) {
//     case 'High': return 'bg-gradient-to-br from-red-50 to-red-100 border-red-400 text-red-900 shadow-red-100';
//     case 'Medium': return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400 text-orange-900 shadow-orange-100';
//     case 'Low': return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-400 text-yellow-900 shadow-yellow-100';
//     default: return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-400 text-gray-900 shadow-gray-100';
//   }
// };

// const getSeverityIcon = (severity) => {
//   switch (severity) {
//     case 'High': return '🔴';
//     case 'Medium': return '🟡';
//     case 'Low': return '🟢';
//     default: return '⚪';
//   }
// };

// const getCrowdStatusConfig = (level) => {
//   switch (level) {
//     case 'CRITICAL': return {
//       gradient: 'from-red-600 via-red-500 to-red-400',
//       bgGradient: 'from-red-50 to-red-100',
//       borderColor: 'border-red-300',
//       textColor: 'text-red-900',
//       icon: '🚨'
//     };
//     case 'HIGH': return {
//       gradient: 'from-orange-600 via-orange-500 to-orange-400',
//       bgGradient: 'from-orange-50 to-orange-100',
//       borderColor: 'border-orange-300',
//       textColor: 'text-orange-900',
//       icon: '⚠️'
//     };
//     case 'ELEVATED': return {
//       gradient: 'from-yellow-600 via-yellow-500 to-yellow-400',
//       bgGradient: 'from-yellow-50 to-yellow-100',
//       borderColor: 'border-yellow-300',
//       textColor: 'text-yellow-900',
//       icon: '⚡'
//     };
//     default: return {
//       gradient: 'from-green-600 via-green-500 to-green-400',
//       bgGradient: 'from-green-50 to-green-100',
//       borderColor: 'border-green-300',
//       textColor: 'text-green-900',
//       icon: '✅'
//     };
//   }
// };

// function calculateCrowdStatus(incidents) {
//     const highSeverityCount = incidents.filter(i => i.severity === 'High' && i.status !== 'Resolved').length;
//     const mediumSeverityCount = incidents.filter(i => i.severity === 'Medium' && i.status !== 'Resolved').length;
//     if (highSeverityCount > 0) return { level: 'CRITICAL', color: 'text-red-600' };
//     if (mediumSeverityCount > 2) return { level: 'HIGH', color: 'text-orange-600' };
//     if (mediumSeverityCount > 0) return { level: 'ELEVATED', color: 'text-yellow-600' };
//     return { level: 'NORMAL', color: 'text-green-600' };
// }

// export default async function EventDetailPage({ params }) {
//   const [event, incidents, announcements, session] = await Promise.all([
//     getEventById(params.id),
//     getIncidentsByEventId(params.id),
//     getAnnouncementsByEventId(params.id),
//     getServerSession(authOptions)
//   ]);
  
//   if (!event) {
//     notFound();
//   }
  
//   const isLoggedIn = !!session;
//   const crowdStatus = calculateCrowdStatus(incidents);
//   const venue = locationsData.locations.find(loc => loc.id === event.venue_id);
//   const statusConfig = getCrowdStatusConfig(crowdStatus.level);

//   // Calculate incident statistics
//   const totalIncidents = incidents.length;
//   const activeIncidents = incidents.filter(i => i.status !== 'Resolved').length;
//   const resolvedIncidents = totalIncidents - activeIncidents;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
//       {/* Decorative Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <main className="relative container mx-auto p-4 md:p-8">
//         {/* Navigation */}
//         <div className="mb-8">
//           <Link 
//             href="/" 
//             className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 text-gray-700 hover:text-blue-600"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             <span className="font-medium">वापस होमपेज पर | Back to Homepage</span>
//           </Link>
//         </div>

//         {/* Event Header */}
//         <header className="mb-8 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500">
//           <div className="flex items-start justify-between mb-6">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-green-600 bg-clip-text text-transparent mb-2">
//                 {event.title}
//               </h1>
//               <div className="flex items-center space-x-2 text-green-600">
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="font-semibold text-lg">लाइव | Live Event</span>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
//                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span className="font-semibold text-green-700">Active</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-blue-700">तारीख | Date</p>
//                 <p className="text-lg font-bold text-blue-900">
//                   {new Date(event.event_date).toLocaleDateString('en-IN', { 
//                     dateStyle: 'full' 
//                   })}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-purple-700">अपेक्षित भीड़ | Expected Crowd</p>
//                 <p className="text-lg font-bold text-purple-900">
//                   {event.expected_crowd.toLocaleString('en-IN')} लोग
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
//               <div className="p-2 bg-emerald-100 rounded-lg">
//                 <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-emerald-700">स्थान | Venue</p>
//                 <p className="text-lg font-bold text-emerald-900">
//                   {venue?.name || 'Venue Information'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Public Safety Status */}
//         <section className={`mb-8 p-8 bg-gradient-to-br ${statusConfig.bgGradient} backdrop-blur-sm rounded-2xl border-2 ${statusConfig.borderColor} shadow-lg hover:shadow-xl transition-all duration-500`}>
//           <div className="text-center mb-6">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               🛡️ सार्वजनिक सुरक्षा स्थिति | Public Safety Status
//             </h2>
//             <div className="inline-flex items-center space-x-3">
//               <span className="text-2xl">{statusConfig.icon}</span>
//               <div>
//                 <p className="text-lg font-medium text-gray-700">वर्तमान भीड़ स्थिति | Current Crowd Status:</p>
//                 <div className={`inline-block px-6 py-3 bg-gradient-to-r ${statusConfig.gradient} text-white rounded-xl shadow-lg`}>
//                   <p className="text-4xl font-black tracking-wider">{crowdStatus.level}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="text-center p-4 bg-white/70 rounded-xl">
//               <p className="text-2xl font-bold text-gray-800">{totalIncidents}</p>
//               <p className="text-sm font-medium text-gray-600">कुल घटनाएं | Total Incidents</p>
//             </div>
//             <div className="text-center p-4 bg-white/70 rounded-xl">
//               <p className="text-2xl font-bold text-orange-600">{activeIncidents}</p>
//               <p className="text-sm font-medium text-gray-600">सक्रिय | Active</p>
//             </div>
//             <div className="text-center p-4 bg-white/70 rounded-xl">
//               <p className="text-2xl font-bold text-green-600">{resolvedIncidents}</p>
//               <p className="text-sm font-medium text-gray-600">हल हो गया | Resolved</p>
//             </div>
//           </div>

//           {/* Latest Announcements */}
//           {announcements.length > 0 && (
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
//               <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
//                 📢 नवीनतम घोषणाएं | Latest Announcements
//               </h3>
//               <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                 <p className="text-xl font-semibold text-center text-gray-800 mb-2">
//                   {announcements[0].message}
//                 </p>
//                 <p className="text-sm text-center text-gray-500">
//                   पोस्ट किया गया | Posted at {new Date(announcements[0].created_at).toLocaleTimeString('en-IN')}
//                 </p>
//               </div>
//             </div>
//           )}
//         </section>

//         {/* Authority Command View */}
//         {isLoggedIn && (
//           <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
//             <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-200">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <h2 className="text-3xl font-bold text-gray-800">
//                 🏛️ प्राधिकरण कमांड दृश्य | Authority Command View
//               </h2>
//             </div>
            
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//               {/* Live Venue Map */}
//               <div className="lg:col-span-3">
//                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//                   <div className="flex items-center space-x-2 mb-4">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                       <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3L9 7" />
//                       </svg>
//                     </div>
//                     <h3 className="text-xl font-bold text-blue-900">🗺️ लाइव वेन्यू मैप | Live Venue Map</h3>
//                   </div>
//                   <VenueMap mapUrl={venue?.map_url} incidents={incidents} />
//                 </div>
//               </div>
              
//               {/* Incident Feed */}
//               <div className="lg:col-span-2">
//                 <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
//                   <div className="flex items-center space-x-2 mb-4">
//                     <div className="p-2 bg-red-100 rounded-lg">
//                       <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                       </svg>
//                     </div>
//                     <h3 className="text-xl font-bold text-red-900">⚡ घटना फीड | Incident Feed</h3>
//                   </div>
                  
//                   <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//                     {incidents.length > 0 ? (
//                       incidents.map((incident) => (
//                         <div 
//                           key={incident.id} 
//                           className={`p-4 rounded-xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 ${getSeverityColor(incident.severity)}`}
//                         >
//                           <div className="flex justify-between items-start mb-3">
//                             <div>
//                               <div className="flex items-center space-x-2 mb-1">
//                                 <span className="text-lg">{getSeverityIcon(incident.severity)}</span>
//                                 <h4 className="text-lg font-bold">
//                                   {incident.incident_type}
//                                 </h4>
//                               </div>
//                               <p className="text-sm font-medium opacity-80">
//                                 📍 {incident.location_zone}
//                               </p>
//                             </div>
//                             <div className="text-right">
//                               <span className="inline-block px-3 py-1 bg-white/80 rounded-lg text-xs font-mono border border-gray-300">
//                                 {new Date(incident.reported_at).toLocaleTimeString('en-IN')}
//                               </span>
//                             </div>
//                           </div>
                          
//                           <p className="text-sm mb-3 opacity-90">
//                             {incident.description || 'कोई और विवरण प्रदान नहीं किया गया। | No further details provided.'}
//                           </p>
                          
//                           <div className="flex justify-between items-center">
//                             <div className="flex items-center space-x-2">
//                               <span className="inline-flex items-center space-x-1 bg-white/90 px-3 py-1 text-xs font-semibold rounded-full border">
//                                 <span>गंभीरता | Severity:</span>
//                                 <span className="font-bold">{incident.severity}</span>
//                               </span>
//                             </div>
//                             <IncidentActions incident={incident} eventId={event.id} />
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="p-8 text-center bg-white/80 rounded-xl shadow border border-gray-200">
//                         <div className="mb-4">
//                           <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                         </div>
//                         <p className="text-gray-600 font-medium">
//                           🎉 इस कार्यक्रम के लिए अभी तक कोई घटना रिपोर्ट नहीं हुई है।
//                         </p>
//                         <p className="text-gray-500 text-sm mt-1">
//                           No incidents reported for this event yet.
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }

// src/app/events/[id]/page.js (Corrected and with New UI)

import { getEventById, getIncidentsByEventId, getAnnouncementsByEventId } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import IncidentActions from '@/components/IncidentActions';
import VenueMap from '@/components/VenueMap';
import locationsData from '@/data/database.json';

export const dynamic = 'force-dynamic';

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'High': return 'bg-gradient-to-br from-red-50 to-red-100 border-red-400 text-red-900 shadow-red-100';
    case 'Medium': return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400 text-orange-900 shadow-orange-100';
    case 'Low': return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-400 text-yellow-900 shadow-yellow-100';
    default: return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-400 text-gray-900 shadow-gray-100';
  }
};

const getSeverityIcon = (severity) => {
  switch (severity) {
    case 'High': return '🔴';
    case 'Medium': return '🟡';
    case 'Low': return '🟢';
    default: return '⚪';
  }
};

const getCrowdStatusConfig = (level) => {
  switch (level) {
    case 'CRITICAL': return {
      gradient: 'from-red-600 via-red-500 to-red-400',
      bgGradient: 'from-red-50 to-red-100',
      borderColor: 'border-red-300',
      textColor: 'text-red-900',
      icon: '🚨'
    };
    case 'HIGH': return {
      gradient: 'from-orange-600 via-orange-500 to-orange-400',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-900',
      icon: '⚠️'
    };
    case 'ELEVATED': return {
      gradient: 'from-yellow-600 via-yellow-500 to-yellow-400',
      bgGradient: 'from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-300',
      textColor: 'text-yellow-900',
      icon: '⚡'
    };
    default: return {
      gradient: 'from-green-600 via-green-500 to-green-400',
      bgGradient: 'from-green-50 to-green-100',
      borderColor: 'border-green-300',
      textColor: 'text-green-900',
      icon: '✅'
    };
  }
};

function calculateCrowdStatus(incidents) {
    const highSeverityCount = incidents.filter(i => i.severity === 'High' && i.status !== 'Resolved').length;
    const mediumSeverityCount = incidents.filter(i => i.severity === 'Medium' && i.status !== 'Resolved').length;
    if (highSeverityCount > 0) return { level: 'CRITICAL' };
    if (mediumSeverityCount > 2) return { level: 'HIGH' };
    if (mediumSeverityCount > 0) return { level: 'ELEVATED' };
    return { level: 'NORMAL' };
}

export default async function EventDetailPage({ params }) {
  // Pass params.id directly into the data fetching functions
  const [event, incidents, announcements, session] = await Promise.all([
    getEventById(params.id),
    getIncidentsByEventId(params.id),
    getAnnouncementsByEventId(params.id),
    getServerSession(authOptions)
  ]);
  
  if (!event) {
    notFound();
  }
  
  const isLoggedIn = !!session;
  const crowdStatus = calculateCrowdStatus(incidents);
  const venue = locationsData.locations.find(loc => loc.id === event.venue_id);
  const statusConfig = getCrowdStatusConfig(crowdStatus.level);

  // Calculate incident statistics
  const totalIncidents = incidents.length;
  const activeIncidents = incidents.filter(i => i.status !== 'Resolved').length;
  const resolvedIncidents = totalIncidents - activeIncidents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <main className="relative container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 text-gray-700 hover:text-blue-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">वापस होमपेจ पर | Back to Homepage</span>
          </Link>
        </div>

        <header className="mb-8 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-green-600 bg-clip-text text-transparent mb-2">
                {event.title}
              </h1>
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-lg">लाइव | Live Event</span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-green-700">Active</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="p-2 bg-blue-100 rounded-lg"><svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
              <div>
                <p className="text-sm font-medium text-blue-700">तारीख | Date</p>
                <p className="text-lg font-bold text-blue-900">{new Date(event.event_date).toLocaleDateString('en-IN', { dateStyle: 'full' })}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="p-2 bg-purple-100 rounded-lg"><svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
              <div>
                <p className="text-sm font-medium text-purple-700">अपेक्षित भीड़ | Expected Crowd</p>
                <p className="text-lg font-bold text-purple-900">{event.expected_crowd.toLocaleString('en-IN')} लोग</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="p-2 bg-emerald-100 rounded-lg"><svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
              <div>
                <p className="text-sm font-medium text-emerald-700">स्थान | Venue</p>
                <p className="text-lg font-bold text-emerald-900">{venue?.name || 'Venue Information'}</p>
              </div>
            </div>
          </div>
        </header>

        <section className={`mb-8 p-8 bg-gradient-to-br ${statusConfig.bgGradient} backdrop-blur-sm rounded-2xl border-2 ${statusConfig.borderColor} shadow-lg hover:shadow-xl transition-all duration-500`}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">🛡️ सार्वजनिक सुरक्षा स्थिति | Public Safety Status</h2>
            <div className="inline-flex items-center space-x-3">
              <span className="text-2xl">{statusConfig.icon}</span>
              <div>
                <p className="text-lg font-medium text-gray-700">वर्तमान भीड़ स्थिति | Current Crowd Status:</p>
                <div className={`inline-block px-6 py-3 bg-gradient-to-r ${statusConfig.gradient} text-white rounded-xl shadow-lg`}><p className="text-4xl font-black tracking-wider">{crowdStatus.level}</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white/70 rounded-xl"><p className="text-2xl font-bold text-gray-800">{totalIncidents}</p><p className="text-sm font-medium text-gray-600">कुल घटनाएं | Total Incidents</p></div>
            <div className="text-center p-4 bg-white/70 rounded-xl"><p className="text-2xl font-bold text-orange-600">{activeIncidents}</p><p className="text-sm font-medium text-gray-600">सक्रिय | Active</p></div>
            <div className="text-center p-4 bg-white/70 rounded-xl"><p className="text-2xl font-bold text-green-600">{resolvedIncidents}</p><p className="text-sm font-medium text-gray-600">हल हो गया | Resolved</p></div>
          </div>

          {announcements.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">📢 नवीनतम घोषणाएं | Latest Announcements</h3>
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-xl font-semibold text-center text-gray-800 mb-2">{announcements[0].message}</p>
                <p className="text-sm text-center text-gray-500">पोस्ट किया गया | Posted at {new Date(announcements[0].created_at).toLocaleTimeString('en-IN')}</p>
              </div>
            </div>
          )}
        </section>

        {isLoggedIn && (
          <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-200">
              <div className="p-2 bg-red-100 rounded-lg"><svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
              <h2 className="text-3xl font-bold text-gray-800">🏛️ प्राधिकरण कमांड दृश्य | Authority Command View</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-4"><div className="p-2 bg-blue-100 rounded-lg"><svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3L9 7" /></svg></div><h3 className="text-xl font-bold text-blue-900">🗺️ लाइव वेन्यू मैप | Live Venue Map</h3></div>
                  <VenueMap mapUrl={venue?.map_url} incidents={incidents} />
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                  <div className="flex items-center space-x-2 mb-4"><div className="p-2 bg-red-100 rounded-lg"><svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg></div><h3 className="text-xl font-bold text-red-900">⚡ घटना फीड | Incident Feed</h3></div>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {incidents.length > 0 ? (
                      incidents.map((incident) => (
                        <div key={incident.id} className={`p-4 rounded-xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 ${getSeverityColor(incident.severity)}`}>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-1"><span className="text-lg">{getSeverityIcon(incident.severity)}</span><h4 className="text-lg font-bold">{incident.incident_type}</h4></div>
                              <p className="text-sm font-medium opacity-80">📍 {incident.location_zone}</p>
                            </div>
                            <div className="text-right"><span className="inline-block px-3 py-1 bg-white/80 rounded-lg text-xs font-mono border border-gray-300">{new Date(incident.reported_at).toLocaleTimeString('en-IN')}</span></div>
                          </div>
                          <p className="text-sm mb-3 opacity-90">{incident.description || 'कोई और विवरण प्रदान नहीं किया गया। | No further details provided.'}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2"><span className="inline-flex items-center space-x-1 bg-white/90 px-3 py-1 text-xs font-semibold rounded-full border"><span>गंभीरता | Severity:</span><span className="font-bold">{incident.severity}</span></span></div>
                            <IncidentActions incident={incident} eventId={event.id} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center bg-white/80 rounded-xl shadow border border-gray-200">
                        <div className="mb-4"><svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                        <p className="text-gray-600 font-medium">🎉 इस कार्यक्रम के लिए अभी तक कोई घटना रिपोर्ट नहीं हुई है।</p>
                        <p className="text-gray-500 text-sm mt-1">No incidents reported for this event yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}