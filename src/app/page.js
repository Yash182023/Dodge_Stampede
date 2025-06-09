// // src/app/page.js (New Version)

// import locationsData from '@/data/database.json';
// import Link from 'next/link';
// import { getUpcomingEvents } from '@/lib/db'; // <-- IMPORT our new function

// export default async function HomePage() {
//   // Directly access the static locations data
//   const locations = locationsData.locations;

//   // --- NEW: FETCH DYNAMIC DATA FROM DATABASE ---
//   const upcomingEvents = await getUpcomingEvents();

//   // Helper function to get location name from venue_id
//   const getLocationName = (venueId) => {
//     const location = locations.find(loc => loc.id === venueId);
//     return location ? location.name : 'Unknown Venue';
//   };
//   // ------------------------------------------

//   return (
//     <main className="container mx-auto p-4 md:p-8">
//       <header className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//           Dodge Stampede
//         </h1>
//         <p className="text-lg text-gray-600 mt-2">
//           An initiative to provide historical data and risk factors for crowded locations in India.
//         </p>
//       </header>

//       {/* --- NEW: UPCOMING EVENTS SECTION --- */}
//       {upcomingEvents.length > 0 && (
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-6 border-b pb-2">Upcoming Registered Events</h2>
//           <div className="space-y-4">
//             {upcomingEvents.map((event) => (
//               <div key={event.id} className="p-4 bg-white rounded-lg shadow-md border border-blue-200">
//                 <Link key={event.id} href={`/events/${event.id}`} className="block p-4 bg-white rounded-lg shadow-md border border-blue-200 hover:bg-blue-50 transition-colors">
//                   <h3 className="text-xl font-bold text-blue-800">{event.title}</h3>
//                   <p className="text-gray-700"><strong>Venue:</strong> {getLocationName(event.venue_id)}</p>
//                   <p className="text-gray-700"><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
//                   <p className="text-gray-700"><strong>Expected Crowd:</strong> {event.expected_crowd.toLocaleString('en-IN')}</p>
//                   <p className="mt-2 font-semibold text-blue-600">View Live Incident Report →</p>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//       {/* ---------------------------------- */}


//       {/* --- EXISTING HISTORICAL LOCATIONS SECTION --- */}
//       <section>
//         <h2 className="text-3xl font-bold mb-6 border-b pb-2">Historical Risk Locations</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {locations.map((location) => (
//             <Link
//               key={location.id}
//               href={`/locations/${location.id}`}
//               className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
//             >
//               <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{location.name}</h2>
//               <p className="font-normal text-gray-500">{location.city}, {location.state}</p>
//               <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded mt-4">
//                 {location.type}
//               </span>
//             </Link>
//           ))}
//         </div>
//       </section>
//       {/* ------------------------------------------ */}

//       <footer className="text-center mt-16 text-gray-500">
//         <p>Stay informed. Stay safe.</p>
//       </footer>
//     </main>
//   );
// }

// new_page.js

// src/app/page.js (Enhanced Indian Modern Design)

import locationsData from '@/data/database.json';
import Link from 'next/link';
import { getUpcomingEvents } from '@/lib/db';

export default async function HomePage() {
  // Directly access the static locations data
  const locations = locationsData.locations;

  // Fetch dynamic data from database
  const upcomingEvents = await getUpcomingEvents();

  // Helper function to get location name from venue_id
  const getLocationName = (venueId) => {
    const location = locations.find(loc => loc.id === venueId);
    return location ? location.name : 'Unknown Venue';
  };

  // Helper function to get risk level color
  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Helper function to format event date
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-saffron/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indian-green/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-saffron/5 to-indian-green/5 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main heading */}
            <div className="mb-6 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-indian rounded-2xl mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-saffron to-indian-green bg-clip-text text-white">
                  Dodge Stampede
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-indian mx-auto rounded-full mb-6" />
            </div>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in max-w-3xl mx-auto">
              Advanced crowd safety and risk awareness platform for India. 
              <span className="font-semibold text-saffron"> Monitor events, assess risks, </span>
              and prevent stampedes with real-time intelligence.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-in-right">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-saffron mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Monitored Locations</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-indian-green mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Real-time Monitoring</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">Zero</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Tolerance for Risk</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
              <Link 
                href="/events" 
                className="bg-gradient-to-r from-saffron to-red-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Monitor Live Events</span>
              </Link>
              
              <Link 
                href="/dashboard" 
                className="bg-white/90 dark:bg-slate-800/90 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 decorated-heading">
                Upcoming Registered Events
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Real-time monitoring and risk assessment for registered public gatherings across India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <Link 
                  key={event.id} 
                  href={`/events/${event.id}`} 
                  className="group block"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg card-hover p-6 h-full">
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-saffron transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {getLocationName(event.venue_id)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          Live
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatEventDate(event.event_date)}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400">
                          Expected: <strong className="text-gray-900 dark:text-white">{event.expected_crowd.toLocaleString('en-IN')}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-saffron group-hover:text-red-600 transition-colors">
                        View Live Report →
                      </span>
                      <div className="w-8 h-8 bg-gradient-to-br from-saffron/20 to-red-600/20 rounded-lg flex items-center justify-center group-hover:from-saffron/30 group-hover:to-red-600/30 transition-colors">
                        <svg className="w-4 h-4 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* --- THIS IS THE CORRECTED BUTTON --- */}
          <div className="text-center mt-8">
            <Link 
              href="/events" // Corrected: Links to the new page, not a specific event
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>View All Events</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          {/* --- END OF BUTTON --- */}

        </section>
      )}

        {/* Historical Risk Locations Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 decorated-heading">
              Historical Risk Locations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive analysis of high-risk venues with historical incident data and safety recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <Link
                key={location.id}
                href={`/locations/${location.id}`}
                className="group block"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg card-hover p-6 h-full">
                  {/* Location Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-saffron transition-colors">
                        {location.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {location.city}, {location.state}
                      </div>
                    </div>
                  </div>

                  {/* Location Type & Risk Level */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      {location.type}
                    </span>
                    
                    {location.risk_level && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(location.risk_level)}`}>
                        {location.risk_level} Risk
                      </span>
                    )}
                  </div>

                  {/* Location Stats */}
                  <div className="space-y-2 mb-6">
                    {location.capacity && (
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a2 2 0 012-2h2a2 2 0 012 2v12" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400">
                          Capacity: <strong className="text-gray-900 dark:text-white">{location.capacity.toLocaleString('en-IN')}</strong>
                        </span>
                      </div>
                    )}
                    
                    {location.incident_count && (
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-400">
                          Incidents: <strong className="text-red-600">{location.incident_count}</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-saffron group-hover:text-red-600 transition-colors">
                      View Risk Analysis →
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg flex items-center justify-center group-hover:from-orange-200 group-hover:to-red-200 dark:group-hover:from-orange-800/30 dark:group-hover:to-red-800/30 transition-colors">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Locations Button */}
          <div className="text-center mt-8">
            <Link 
              href="/locations" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>View All Risk Locations</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Safety Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive crowd management tools designed for Indias unique challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: "Real-time Monitoring",
                description: "Live crowd density tracking and movement analysis",
                color: "blue"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                ),
                title: "Risk Assessment",
                description: "AI-powered risk prediction and early warning systems",
                color: "red"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Data Analytics",
                description: "Historical analysis and crowd behavior insights",
                color: "green"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Mobile Alerts",
                description: "Instant notifications for authorities and event managers",
                color: "purple"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-lg card-hover text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 text-${feature.color}-600 rounded-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-saffron/10 via-white to-indian-green/10 dark:from-saffron/5 dark:via-slate-800 dark:to-indian-green/5 rounded-3xl p-8 md:p-12 border border-orange-200 dark:border-slate-700">
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Building Safer Communities Together
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Join thousands of event organizers, government officials, and safety professionals 
              who trust Dodge Stampede to keep their communities safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-saffron to-red-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started Today
              </Link>
              <Link 
                href="/contact" 
                className="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-saffron/20 rounded-full blur-xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-indian-green/20 rounded-full blur-xl" />
        </section>
      </div>
    </div>
  );
}