// // src/components/AnnouncementForm.js
// 'use client';

// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <button type="submit" disabled={pending} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400">
//       {pending ? 'Posting...' : 'Post Announcement'}
//     </button>
//   );
// }

// export default function AnnouncementForm({ createAnnouncementAction, events }) {
//   const [state, formAction] = useActionState(createAnnouncementAction, { message: null, success: false });

//   if (events.length === 0) {
//     return null; // Don't show the form if there are no active events
//   }

//   return (
//     <form action={formAction} className="p-6 bg-white rounded-lg shadow border border-green-200 space-y-4">
//       <div>
//         <label htmlFor="event_id_announcement" className="block text-sm font-medium text-gray-700">Select Event</label>
//         <select name="event_id" id="event_id_announcement" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//           {events.map(event => (
//             <option key={event.id} value={event.id}>{event.title}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="message" className="block text-sm font-medium text-gray-700">Public Announcement Message</label>
//         <textarea name="message" id="message" rows="4" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., The main stage is at capacity. Please proceed to viewing screens in Zone B."></textarea>
//       </div>
//       <SubmitButton />
//       {state?.message && (
//         <p className={`mt-2 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
//           {state.message}
//         </p>
//       )}
//     </form>
//   );
// }

//--new code

// src/components/AnnouncementForm.js (Enhanced Indian Modern Theme)
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:transform-none"
    >
      {pending ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Publishing...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span>Post Announcement</span>
        </div>
      )}
    </button>
  );
}

export default function AnnouncementForm({ createAnnouncementAction, events }) {
  const [state, formAction] = useActionState(createAnnouncementAction, { message: null, success: false });

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Events</h3>
        <p className="text-gray-500">Create an event first to post announcements.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="event_id_announcement" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6" />
          </svg>
          <span>Select Event</span>
        </label>
        <select 
          name="event_id" 
          id="event_id_announcement" 
          required 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300"
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
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span>Public Announcement Message</span>
        </label>
        <textarea 
          name="message" 
          id="message" 
          rows="5" 
          required 
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200/50 transition-all duration-200 text-gray-900 font-medium shadow-sm hover:border-gray-300 resize-none"
          placeholder="Enter your announcement here... e.g., The main stage is at capacity. Please proceed to viewing screens in Zone B for a better experience."
        ></textarea>
        <p className="text-xs text-gray-500 flex items-center space-x-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>This message will be broadcast to all event attendees</span>
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