// // src/app/locations/[id]/page.js

// import locationsData from '@/data/database.json';
// import { notFound } from 'next/navigation';
// import Link from 'next/link';

// // Helper function to get location data by its ID
// function getLocationById(id) {
//   return locationsData.locations.find((location) => location.id === id);
// }

// // Helper function to calculate a simple risk score
// function calculateRisk(location) {
//   let score = 0;
//   if (location.risk_factors.history_of_incidents) score += 50;
//   if (["Religious Gathering Site", "Religious Site"].includes(location.type)) score += 20;
//   if (location.risk_factors.known_bottlenecks.toLowerCase() !== "none") score += 20;
//   if (location.risk_factors.terrain_issues.toLowerCase() !== "none") score += 10;

//   if (score > 80) return { level: "Very High", color: "red" };
//   if (score > 60) return { level: "High", color: "orange" };
//   if (score > 40) return { level: "Medium", color: "yellow" };
//   return { level: "Moderate", color: "blue" };
// }

// // The main page component - NOW ASYNCHRONOUS
// export default async function LocationDetailPage({ params }) {
//   const location = getLocationById(params.id);

//   // If no location is found for the given ID, show a 404 page
//   if (!location) {
//     notFound();
//   }

//   const risk = calculateRisk(location);
//   const riskColorClasses = {
//     red: 'bg-red-100 text-red-800 border-red-400',
//     orange: 'bg-orange-100 text-orange-800 border-orange-400',
//     yellow: 'bg-yellow-100 text-yellow-800 border-yellow-400',
//     blue: 'bg-blue-100 text-blue-800 border-blue-400',
//   };

//   return (
//     <main className="container mx-auto p-4 md:p-8">
//       <div className="mb-8">
//         <Link href="/" className="text-blue-600 hover:underline">
//           ← Back to all locations
//         </Link>
//       </div>

//       <header className="mb-8">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-white">{location.name}</h1>
//         <p className="text-xl text-gray-500 mt-2">{location.city}, {location.state}</p>
//       </header>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Risk Analysis */}
//         <div className="lg:col-span-2">
//           <div className="bg-white p-6 rounded-lg shadow-lg border">
//             <h2 className="text-2xl font-bold mb-4">Risk Analysis</h2>
            
//             <div className={`p-4 rounded-md border-2 mb-6 ${riskColorClasses[risk.color]}`}>
//               <span className="font-bold text-lg">Overall Risk Level: {risk.level}</span>
//             </div>

//             <h3 className="text-xl font-semibold mb-2">Key Risk Factors:</h3>
//             <ul className="list-disc list-inside space-y-2 text-gray-700">
//               <li><strong>History:</strong> This location has a documented history of stampedes or crowd-related incidents.</li>
//               <li><strong>Bottlenecks:</strong> Known chokepoints include: <span className="font-medium">{location.risk_factors.known_bottlenecks}</span>.</li>
//               <li><strong>Common Triggers:</strong> Incidents are often triggered by: <span className="font-medium">{location.risk_factors.common_triggers}</span>.</li>
//               <li><strong>Terrain Issues:</strong> The area has potential terrain challenges: <span className="font-medium">{location.risk_factors.terrain_issues}</span>.</li>
//             </ul>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg border mt-8">
//             <h2 className="text-2xl font-bold mb-4">Actionable Safety Tips</h2>
//             <ul className="list-disc list-inside space-y-2 text-green-800">
//                 <li><strong>Be Aware:</strong> Always know the location of multiple exits. Dont just rely on the one you entered through.</li>
//                 <li><strong>Stay Calm:</strong> If you feel the crowd pressure increasing, try to move sideways to the edge of the crowd. Do not push.</li>
//                 <li><strong>Communicate:</strong> Pre-designate a meeting spot with your group in case you get separated. Ensure phones are charged.</li>
//                 <li><strong>Avoid the Surge:</strong> After an event (match, concert, ritual), wait 15-20 minutes for the initial, most intense surge to pass before you start moving.</li>
//             </ul>
//           </div>
//         </div>

//         {/* Right Column - Historical Incidents */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-lg border">
//           <h2 className="text-2xl font-bold mb-4">Historical Incidents</h2>
//           <div className="space-y-4">
//             {location.historical_incidents.map((incident, index) => (
//               <div key={index} className="pb-4 border-b last:border-b-0">
//                 <p className="font-bold text-gray-800">{incident.date}</p>
//                 <p className="text-sm text-gray-600">{incident.cause}</p>
//                 <div className="flex space-x-4 mt-2 text-sm">
//                   <span className="font-semibold text-red-600">Deaths: {incident.deaths}</span>
//                   <span className="font-semibold text-orange-600">Injured: {incident.injured}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// src/app/locations/[id]/page.js (Modern Dark UI)

import locationsData from '@/data/database.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Helper function to get location data by its ID
function getLocationById(id) {
  return locationsData.locations.find((location) => location.id === id);
}

// Updated risk calculation with new color classes for a dark theme
function calculateRisk(location) {
  let score = 0;
  if (location.risk_factors.history_of_incidents) score += 50;
  if (["Religious Gathering Site", "Religious Site", "Public Ground"].includes(location.type)) score += 20;
  if (location.risk_factors.known_bottlenecks && location.risk_factors.known_bottlenecks.toLowerCase() !== "none") score += 20;
  if (location.risk_factors.terrain_issues && location.risk_factors.terrain_issues.toLowerCase() !== "none") score += 10;

  if (score > 75) return { level: "VERY HIGH", color: "red" };
  if (score > 55) return { level: "High", color: "orange" };
  if (score > 35) return { level: "Medium", color: "yellow" };
  return { level: "Moderate", color: "blue" };
}

// The main page component
export default async function LocationDetailPage({ params }) {
  // Pass params.id directly to the function to avoid the warning
  const location = getLocationById(params.id);

  if (!location) {
    notFound();
  }

  const risk = calculateRisk(location);
  
  // New color classes tailored for a dark background
  const riskConfig = {
    red:    { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/50' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/50' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/50' },
    blue:   { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/50' }
  };
  const currentRisk = riskConfig[risk.color];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <main className="container mx-auto p-4 md:p-8 lg:p-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Homepage
          </Link>
        </div>

        <header className="mb-12 border-b border-slate-700 pb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">{location.name}</h1>
          <p className="mt-2 text-xl text-slate-400">{location.city}, {location.state}</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Risk Analysis */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-white">Risk Analysis</h2>
              
              <div className={`p-6 rounded-lg border-2 ${currentRisk.bg} ${currentRisk.border} mb-6`}>
                <p className="text-sm font-medium uppercase tracking-wider text-slate-400">Overall Risk Level</p>
                <p className={`text-4xl font-black ${currentRisk.text}`}>{risk.level}</p>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white">Key Risk Factors</h3>
              <div className="space-y-3 text-slate-300">
                <p><strong>🚨 History of Incidents:</strong> This location has a documented history of crowd-related tragedies.</p>
                <p><strong>🚧 Known Bottlenecks:</strong> <span className="font-medium text-slate-100">{location.risk_factors.known_bottlenecks}</span></p>
                <p><strong>⚡ Common Triggers:</strong> <span className="font-medium text-slate-100">{location.risk_factors.common_triggers}</span></p>
                <p><strong>⛰️ Terrain Issues:</strong> <span className="font-medium text-slate-100">{location.risk_factors.terrain_issues}</span></p>
              </div>
            </div>

            <div className="bg-emerald-900/40 p-6 rounded-xl border border-emerald-500/30">
              <h2 className="text-2xl font-bold mb-4 text-emerald-300">Actionable Safety Tips</h2>
              <ul className="list-disc list-inside space-y-3 text-emerald-200">
                  <li><strong>Situational Awareness:</strong> Always know the location of multiple exits. Dont just rely on the one you entered through.</li>
                  <li><strong>Pressure Management:</strong> If you feel the crowd getting too tight, try to move sideways to the edge. Do not push against the flow.</li>
                  <li><strong>Contingency Planning:</strong> Pre-designate a meeting spot with your group in case you get separated. Keep your phone charged.</li>
                  <li><strong>Strategic Exit:</strong> After an event ends, wait 15-20 minutes for the initial, most intense surge to pass before you start moving. Patience is safety.</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Historical Incidents */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Historical Incidents</h2>
            <div className="space-y-6">
              {location.historical_incidents.map((incident, index) => (
                <div key={index} className="pb-6 border-b border-slate-700 last:border-b-0">
                  <p className="text-lg font-bold text-slate-100">{incident.date}</p>
                  <p className="mt-1 text-slate-400">{incident.cause}</p>
                  <div className="flex items-center gap-6 mt-3 text-sm">
                    <span className="font-semibold text-red-400">Deaths: {incident.deaths}</span>
                    <span className="font-semibold text-orange-400">Injured: {incident.injured}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}