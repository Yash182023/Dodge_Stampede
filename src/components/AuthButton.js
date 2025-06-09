// // src/components/AuthButton.js

// 'use client';

// import { useSession, signIn, signOut } from 'next-auth/react';
// import Image from 'next/image';

// export default function AuthButton() {
//   const { data: session, status } = useSession();

//   if (status === 'loading') {
//     return <div className="w-24 h-9 bg-gray-200 rounded animate-pulse"></div>;
//   }

//   if (session) {
//     return (
//       <div className="flex items-center gap-4">
//         <Image
//           src={session.user.image}
//           alt={session.user.name}
//           width={36}
//           height={36}
//           className="rounded-full"
//         />
//         <button
//           onClick={() => signOut()}
//           className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
//         >
//           Sign Out
//         </button>
//       </div>
//     );
//   }

//   return (
//     <button
//       onClick={() => signIn('google')}
//       className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
//     >
//       Sign In with Google
//     </button>
//   );
// }

// src/components/AuthButton.js (Refined UI)

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="w-24 h-9 bg-slate-200 rounded-lg animate-pulse"></div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User avatar'}
            width={32}
            height={32}
            className="rounded-full border-2 border-slate-200"
          />
        )}
        <button
          onClick={() => signOut()}
          className="px-4 py-1.5 text-sm font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Sign In
    </button>
  );
}