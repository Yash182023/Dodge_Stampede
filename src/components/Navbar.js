// // // src/components/Navbar.js (Final and Complete Code)

// // import Link from 'next/link';
// // import { getServerSession } from 'next-auth/next';
// // import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// // import AuthButton from './AuthButton'; // This component handles the Sign In/Out logic

// // // The Navbar is a server component, so it can be async to fetch session data
// // export default async function Navbar() {
// //   const session = await getServerSession(authOptions);

// //   return (
// //     <header className="bg-white shadow-md sticky top-0 z-50">
// //       <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
// //         <div className="flex items-center justify-between">
          
// //           {/* Left Side: Logo and Main Links */}
// //           <div className="flex items-center gap-6">
// //             <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
// //               Dodge Stampede
// //             </Link>
// //           </div>

// //           {/* Right Side: Dashboard Link (if logged in) and Auth Button */}
// //           <div className="flex items-center gap-4">
            
// //             {/* This Dashboard link will ONLY appear if a user is logged in */}
// //             {session && (
// //               <Link href="/dashboard" className="text-gray-600 font-semibold hover:text-blue-600 transition-colors">
// //                 Dashboard
// //               </Link>
// //             )}

// //             {/* The AuthButton component handles showing Sign In or Sign Out */}
// //             <AuthButton />
// //           </div>
          
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // }

// // src/components/AuthButton.js (Enhanced UI Version)

// 'use client';

// import { useSession, signIn, signOut } from 'next-auth/react';
// import Image from 'next/image';

// export default function AuthButton() {
//   const { data: session, status } = useSession();

//   if (status === 'loading') {
//     return <div className="w-24 h-9 bg-slate-200 rounded-lg animate-pulse"></div>;
//   }

//   if (session) {
//     return (
//       <div className="flex items-center gap-3">
//         <Image
//           src={session.user.image}
//           alt={session.user.name}
//           width={32}
//           height={32}
//           className="rounded-full border-2 border-slate-200"
//         />
//         <button
//           onClick={() => signOut()}
//           className="px-4 py-1.5 text-sm font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
//         >
//           Sign Out
//         </button>
//       </div>
//     );
//   }

//   return (
//     <button
//       onClick={() => signIn('google')}
//       className="px-4 py-1.5 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//     >
//       Sign In
//     </button>
//   );
// }

// src/components/Navbar.js (Corrected, Refined UI)

import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AuthButton from './AuthButton';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    // The main header element with modern styling
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-medium text-slate-900">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {/* Using a lighter font weight for the brand name */}
              <span className="font-light">DodgeStampede</span>
            </Link>
          </div>

          {/* Right Side: Dashboard Link and Auth Button */}
          <div className="flex items-center gap-6">
            
            {/* --- THIS LINK IS NOW CORRECTLY INCLUDED --- */}
            {/* It will ONLY appear if a user is logged in */}
            {session && (
              <Link href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
            )}

            {/* The AuthButton component handles showing Sign In or Sign Out */}
            <AuthButton />
          </div>
          
        </div>
      </nav>
    </header>
  );
}