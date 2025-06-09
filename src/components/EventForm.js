// // src/components/EventForm.js

// 'use client';

// // Corrected Imports:
// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';

// import locationsData from '@/data/database.json';

// // This component is now correct because useFormStatus is imported from 'react-dom'
// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//     >
//       {pending ? 'Creating...' : 'Create Event'}
//     </button>
//   );
// }

// export default function EventForm({ createEventAction }) {
//   const [state, formAction] = useActionState(createEventAction, { message: null, success: false });
//   const locations = locationsData.locations;

//   return (
//     <form action={formAction} className="p-6 bg-white rounded-lg shadow border space-y-4">
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
//         <input type="text" name="title" id="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Dussehra Mela 2024" />
//       </div>
//       <div>
//         <label htmlFor="venue_id" className="block text-sm font-medium text-gray-700">Venue</label>
//         <select name="venue_id" id="venue_id" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//           <option value="">Select a venue</option>
//           {locations.map(loc => (
//             <option key={loc.id} value={loc.id}>{loc.name}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">Event Date</label>
//         <input type="date" name="event_date" id="event_date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
//       </div>
//       <div>
//         <label htmlFor="expected_crowd" className="block text-sm font-medium text-gray-700">Expected Crowd Size</label>
//         <input type="number" name="expected_crowd" id="expected_crowd" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., 100000" />
//       </div>
//       <SubmitButton />
//       {/* Show a different message color based on success */}
//       {state?.message && (
//         <p className={`mt-2 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
//           {state.message}
//         </p>
//       )}
//     </form>
//   );
// }
//-newlook

// src/components/EventForm.js (Enhanced Indian Modern Theme)

'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import locationsData from '@/data/database.json';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:transform-none"
    >
      {pending ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Creating Event...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Create Event</span>
        </div>
      )}
    </button>
  );
}

export default function EventForm({ createEventAction }) {
  const [state, formAction] = useActionState(createEventAction, { message: null, success: false });
  const locations = locationsData.locations;

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Event Title</span>
        </label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          required 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300" 
          placeholder="e.g., Dussehra Mela 2024, Ganesh Chaturthi Celebration"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="venue_id" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Venue Location</span>
        </label>
        <select 
          name="venue_id" 
          id="venue_id" 
          required 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300"
        >
          <option value="" className="text-gray-500">Select a venue...</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id} className="text-gray-900 font-medium py-2">
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="event_date" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6m-6 0V7m6 8V7m-6 0l-2-2m2 2l2-2" />
          </svg>
          <span>Event Date</span>
        </label>
        <input 
          type="date" 
          name="event_date" 
          id="event_date" 
          required 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="expected_crowd" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Expected Crowd Size</span>
        </label>
        <input 
          type="number" 
          name="expected_crowd" 
          id="expected_crowd" 
          required 
          min="1"
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300" 
          placeholder="e.g., 50000, 100000"
        />
        <p className="text-xs text-gray-500 flex items-center space-x-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Enter the anticipated number of attendees</span>
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