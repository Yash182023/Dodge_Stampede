// // src/components/IncidentForm.js (Full and Complete Tier 2 Code)
// 'use client';

// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { useState, useEffect } from 'react';

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <button type="submit" disabled={pending} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400">
//       {pending ? 'Reporting...' : 'Report Incident'}
//     </button>
//   );
// }

// export default function IncidentForm({ createIncidentAction, events, venueZones }) {
//   const [state, formAction] = useActionState(createIncidentAction, { message: null, success: false });
  
//   // State to track the currently selected event in the dropdown
//   const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  
//   // State to hold the list of zones for the currently selected event
//   const [currentZones, setCurrentZones] = useState([]);

//   // This effect runs whenever the selected event changes
//   useEffect(() => {
//     // Find the full event object that matches the selected ID
//     const selectedEvent = events.find(e => e.id == selectedEventId);
    
//     // If we found an event and we have the venueZones data...
//     if (selectedEvent && venueZones) {
//         // Get the list of zones for this event's venue_id
//         const zonesForVenue = venueZones[selectedEvent.venue_id] || [];
//         setCurrentZones(zonesForVenue);
//     } else {
//         setCurrentZones([]);
//     }
//   }, [selectedEventId, events, venueZones]);

//   if (events.length === 0) {
//     return <p className="p-6 bg-white rounded-lg shadow border text-gray-500">There are no active events to report incidents for.</p>;
//   }

//   return (
//     <form action={formAction} className="p-6 bg-white rounded-lg shadow border border-red-200 space-y-4">
//       <div>
//         <label htmlFor="event_id" className="block text-sm font-medium text-gray-700">Select Event</label>
//         <select name="event_id" id="event_id" required value={selectedEventId} onChange={e => setSelectedEventId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//           {events.map(event => (
//             <option key={event.id} value={event.id}>{event.title}</option>
//           ))}
//         </select>
//       </div>
      
//       <div>
//         <label htmlFor="map_zone_id" className="block text-sm font-medium text-gray-700">Location / Zone</label>
//         <select name="map_zone_id" id="map_zone_id" required disabled={currentZones.length === 0} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100">
//             <option value="">{currentZones.length > 0 ? 'Select a zone' : 'No zones defined for this venue'}</option>
//             {currentZones.map(zone => (
//                 <option key={zone.id} value={zone.id}>{zone.name}</option>
//             ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="incident_type" className="block text-sm font-medium text-gray-700">Incident Type</label>
//         <select name="incident_type" id="incident_type" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//           <option value="Overcrowding">Overcrowding</option>
//           <option value="Medical Emergency">Medical Emergency</option>
//           <option value="Scuffle/Fight">Scuffle/Fight</option>
//           <option value="Rumor Spreading">Rumor Spreading</option>
//           <option value="Structural Concern">Structural Concern</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//        <div>
//         <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
//         <select name="severity" id="severity" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//           <option value="Low">Low (Monitor)</option>
//           <option value="Medium">Medium (Action Required)</option>
//           <option value="High">High (Critical Emergency)</option>
//         </select>
//       </div>

//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
//         <textarea name="description" id="description" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
//       </div>

//       <SubmitButton />
//        {state?.message && (
//         <p className={`mt-2 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
//           {state.message}
//         </p>
//       )}
//     </form>
//   );
// }

//newcode

// src/components/IncidentForm.js (Enhanced Indian Modern Theme)
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:transform-none"
    >
      {pending ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Reporting Incident...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>Report Incident</span>
        </div>
      )}
    </button>
  );
}

export default function IncidentForm({ createIncidentAction, events, venueZones }) {
  const [state, formAction] = useActionState(createIncidentAction, { message: null, success: false });
  
  // State to track the currently selected event in the dropdown
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  
  // State to hold the list of zones for the currently selected event
  const [currentZones, setCurrentZones] = useState([]);

  // This effect runs whenever the selected event changes
  useEffect(() => {
    // Find the full event object that matches the selected ID
    const selectedEvent = events.find(e => e.id == selectedEventId);
    
    // If we found an event and we have the venueZones data...
    if (selectedEvent && venueZones) {
        // Get the list of zones for this event's venue_id
        const zonesForVenue = venueZones[selectedEvent.venue_id] || [];
        setCurrentZones(zonesForVenue);
    } else {
        setCurrentZones([]);
    }
  }, [selectedEventId, events, venueZones]);

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Events</h3>
        <p className="text-gray-500">There are no active events to report incidents for.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="event_id" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6" />
          </svg>
          <span>Select Event</span>
        </label>
        <select 
          name="event_id" 
          id="event_id" 
          required 
          value={selectedEventId} 
          onChange={e => setSelectedEventId(e.target.value)} 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300"
        >
          <option value="" className="text-gray-500">Choose an active event...</option>
          {events.map(event => (
            <option key={event.id} value={event.id} className="text-gray-900 font-medium py-2">
              {event.title}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="map_zone_id" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Location / Zone</span>
        </label>
        <select 
          name="map_zone_id" 
          id="map_zone_id" 
          required 
          disabled={currentZones.length === 0} 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
        >
          <option value="" className="text-gray-500">
            {currentZones.length > 0 ? 'Select a zone...' : 'No zones defined for this venue'}
          </option>
          {currentZones.map(zone => (
            <option key={zone.id} value={zone.id} className="text-gray-900 font-medium py-2">
              {zone.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="incident_type" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Incident Type</span>
        </label>
        <select 
          name="incident_type" 
          id="incident_type" 
          required 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300"
        >
          <option value="" className="text-gray-500">Select incident type...</option>
          <option value="Overcrowding" className="text-gray-900 font-medium">🚨 Overcrowding</option>
          <option value="Medical Emergency" className="text-gray-900 font-medium">🏥 Medical Emergency</option>
          <option value="Scuffle/Fight" className="text-gray-900 font-medium">⚔️ Scuffle/Fight</option>
          <option value="Rumor Spreading" className="text-gray-900 font-medium">📢 Rumor Spreading</option>
          <option value="Structural Concern" className="text-gray-900 font-medium">🏗️ Structural Concern</option>
          <option value="Other" className="text-gray-900 font-medium">❓ Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="severity" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>Severity Level</span>
        </label>
        <select 
          name="severity" 
          id="severity" 
          required 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300"
        >
          <option value="" className="text-gray-500">Select severity level...</option>
          <option value="Low" className="text-gray-900 font-medium">🟢 Low (Monitor)</option>
          <option value="Medium" className="text-gray-900 font-medium">🟡 Medium (Action Required)</option>
          <option value="High" className="text-gray-900 font-medium">🔴 High (Critical Emergency)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Description (Optional)</span>
        </label>
        <textarea 
          name="description" 
          id="description" 
          rows="4" 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300 resize-none"
          placeholder="Provide additional details about the incident... (optional)"
        ></textarea>
        <p className="text-xs text-gray-500 flex items-center space-x-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Include any relevant details for emergency response teams</span>
        </p>
      </div>

      <SubmitButton />
      
      {state?.message && (
        <div className={`p-4 rounded-xl border-l-4 ${
          state.success 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-red-50 border-red-500 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            {state.success ? (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{state.message}</span>
          </div>
        </div>
      )}
    </form>
  );
}