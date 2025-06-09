// src/components/IncidentActions.js

'use client';

import { acknowledgeIncident, resolveIncident } from '@/lib/actions';
import { useState, useTransition } from 'react';

export default function IncidentActions({ incident, eventId }) {
  const [isPending, startTransition] = useTransition();
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [notes, setNotes] = useState('');

  const handleAcknowledge = () => {
    startTransition(async () => {
      await acknowledgeIncident(incident.id, eventId);
    });
  };

  const handleResolveClick = () => {
    setShowResolveForm(true);
  };
  
  const handleResolveSubmit = () => {
    startTransition(async () => {
        await resolveIncident(incident.id, eventId, notes);
        setShowResolveForm(false);
    });
  };

  if (incident.status === 'Resolved') {
    return <p className="text-sm text-green-700 font-semibold mt-2">Resolved at {new Date(incident.resolved_at).toLocaleTimeString()}</p>;
  }

  if (incident.status === 'Acknowledged') {
    return (
        <div>
            <p className="text-sm text-blue-700 font-semibold mt-2">Acknowledged</p>
            {!showResolveForm && (
                <button onClick={handleResolveClick} disabled={isPending} className="mt-2 text-xs bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 disabled:bg-gray-400">
                    Mark as Resolved
                </button>
            )}
            {showResolveForm && (
                <div className="mt-2 space-y-2">
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add resolution notes..." className="w-full text-sm p-1 border rounded"></textarea>
                    <button onClick={handleResolveSubmit} disabled={isPending} className="text-xs bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 disabled:bg-gray-400">
                        {isPending ? 'Saving...' : 'Confirm Resolution'}
                    </button>
                </div>
            )}
        </div>
    );
  }

  // Default: Status is 'Reported'
  return (
    <button onClick={handleAcknowledge} disabled={isPending} className="mt-2 text-xs bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
      {isPending ? 'Acknowledging...' : 'Acknowledge'}
    </button>
  );
}