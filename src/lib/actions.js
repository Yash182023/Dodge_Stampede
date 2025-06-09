// src/lib/actions.js

'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Helper function to get user ID
async function getUserIdByEmail(email) {
  const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  return result.rows[0]?.id;
}

export async function acknowledgeIncident(incidentId, eventId) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  try {
    const userId = await getUserIdByEmail(session.user.email);
    if (!userId) throw new Error('User not found');

    await pool.query(
      `UPDATE incidents 
       SET status = 'Acknowledged', acknowledged_by_id = $1 
       WHERE id = $2`,
      [userId, incidentId]
    );

    revalidatePath(`/events/${eventId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to acknowledge incident:', error);
    return { success: false, message: error.message };
  }
}

export async function resolveIncident(incidentId, eventId, notes) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        throw new Error('Not authenticated');
    }

    try {
        await pool.query(
            `UPDATE incidents 
             SET status = 'Resolved', resolved_at = NOW(), resolution_notes = $1 
             WHERE id = $2`,
            [notes, incidentId]
        );

        revalidatePath(`/events/${eventId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to resolve incident:', error);
        return { success: false, message: error.message };
    }
}