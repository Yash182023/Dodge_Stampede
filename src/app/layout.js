// // // src/app/layout.js (Final and Corrected Code)

// // import './globals.css';
// // import { Inter } from 'next/font/google';
// // import AuthProvider from '@/components/AuthProvider';
// // import Navbar from '@/components/Navbar'; // We import our single, definitive Navbar

// // const inter = Inter({ subsets: ['latin'] });

// // export const metadata = {
// //   title: 'Dodge Stampede',
// //   description: 'Crowd safety and risk awareness platform',
// // };

// // export default function RootLayout({ children }) {
// //   return (
// //     <html lang="en">
// //       <body className={`${inter.className} bg-gray-50`}>
// //         <AuthProvider>
          
// //           {/* We place the Navbar component here. It will be at the top of every page. */}
// //           <Navbar />
          
// //           {/* All other page content (like the homepage, dashboard, etc.) will be rendered here. */}
// //           <main>
// //             {children}
// //           </main>

// //         </AuthProvider>
// //       </body>
// //     </html>
// //   );
// // }



// //new look
// // src/app/layout.js (Enhanced Indian Modern Theme)

// import './globals.css';
// import { Inter } from 'next/font/google';
// import AuthProvider from '@/components/AuthProvider';
// import Navbar from '@/components/Navbar';

// const inter = Inter({ 
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter'
// });

// export const metadata = {
//   title: {
//     default: 'Dodge Stampede - Crowd Safety Platform',
//     template: '%s | Dodge Stampede'
//   },
//   description: 'Advanced crowd safety and risk awareness platform for India. Monitor events, assess risks, and prevent stampedes with real-time data and historical analysis.',
//   keywords: ['crowd safety', 'stampede prevention', 'event management', 'crowd control', 'India', 'public safety'],
//   authors: [{ name: 'Dodge Stampede Team' }],
//   creator: 'Dodge Stampede',
//   publisher: 'Dodge Stampede',
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   openGraph: {
//     type: 'website',
//     locale: 'en_IN',
//     url: 'https://dodgestampede.com',
//     title: 'Dodge Stampede - Crowd Safety Platform',
//     description: 'Advanced crowd safety and risk awareness platform for India',
//     siteName: 'Dodge Stampede',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Dodge Stampede - Crowd Safety Platform',
//     description: 'Advanced crowd safety and risk awareness platform for India',
//   },
//   viewport: {
//     width: 'device-width',
//     initialScale: 1,
//     maximumScale: 1,
//   },
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: '#ffffff' },
//     { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
//   ],
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={inter.variable}>
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link 
//           href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
//           rel="stylesheet" 
//         />
//         <meta name="format-detection" content="telephone=no" />
//         <meta name="mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//         <meta name="apple-mobile-web-app-title" content="Dodge Stampede" />
//       </head>
//       <body className={`${inter.className} antialiased bg-gray-50 dark:bg-slate-900 transition-colors duration-300`}>
//         {/* Background Pattern */}
//         <div className="fixed inset-0 pattern-bg pointer-events-none z-0" />
        
//         {/* Main App Container */}
//         <div className="relative z-10 min-h-screen flex flex-col">
//           <AuthProvider>
//             {/* Navigation */}
//             <Navbar />
            
//             {/* Main Content Area */}
//             <main className="flex-1 relative">
//               {/* Decorative elements */}
//               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl" />
//               <div className="absolute top-20 right-0 w-48 h-48 bg-gradient-to-bl from-green-400/10 to-transparent rounded-full blur-3xl" />
              
//               {/* Page Content */}
//               <div className="relative z-10">
//                 {children}
//               </div>
//             </main>

//             {/* Footer */}
//             <footer className="relative z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700 mt-auto">
//               <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                   {/* Brand Section */}
//                   <div className="col-span-1 md:col-span-2">
//                     <div className="flex items-center space-x-3 mb-4">
//                       <div className="w-8 h-8 bg-gradient-indian rounded-lg flex items-center justify-center">
//                         <span className="text-white font-bold text-sm">DS</span>
//                       </div>
//                       <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
//                         Dodge Stampede
//                       </span>
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
//                       Empowering safer gatherings across India through advanced crowd monitoring, 
//                       risk assessment, and real-time safety intelligence.
//                     </p>
//                     <div className="flex items-center space-x-1 mt-3">
//                       <div className="w-4 h-3 bg-saffron rounded-sm"></div>
//                       <div className="w-4 h-3 bg-white border border-gray-300 rounded-sm"></div>
//                       <div className="w-4 h-3 bg-indian-green rounded-sm"></div>
//                       <span className="text-xs text-gray-500 ml-2">Made in India</span>
//                     </div>
//                   </div>

//                   {/* Quick Links */}
//                   <div>
//                     <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Links</h3>
//                     <ul className="space-y-2 text-sm">
//                       <li><a href="/events" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Live Events</a></li>
//                       <li><a href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Dashboard</a></li>
//                       <li><a href="/reports" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Safety Reports</a></li>
//                     </ul>
//                   </div>

//                   {/* Support */}
//                   <div>
//                     <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Support</h3>
//                     <ul className="space-y-2 text-sm">
//                       <li><a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Help Center</a></li>
//                       <li><a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Contact Us</a></li>
//                       <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Privacy Policy</a></li>
//                       <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Terms of Service</a></li>
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Bottom Bar */}
//                 <div className="border-t border-gray-200 dark:border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     © 2024 Dodge Stampede. All rights reserved. Building safer communities.
//                   </p>
//                   <div className="flex items-center space-x-4 mt-4 sm:mt-0">
//                     <span className="text-xs text-gray-500">Emergency: </span>
//                     <a href="tel:100" className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-medium">
//                       100
//                     </a>
//                     <a href="tel:108" className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
//                       108
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </footer>
//           </AuthProvider>
//         </div>

//         {/* Loading indicator for navigation */}
//         <div id="loading-indicator" className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron to-indian-green transform -translate-x-full transition-transform duration-300 z-50" />
//       </body>
//     </html>
//   );
// }

// src/app/layout.js (Full and Complete Enhanced Version)

import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Setup the Inter font with necessary weights and a CSS variable for Tailwind
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '700'] // Ensure all needed weights are loaded
});

// Advanced Metadata for SEO and Sharing
export const metadata = {
  title: {
    default: 'Dodge Stampede - Crowd Safety Platform',
    template: '%s | Dodge Stampede'
  },
  description: 'Advanced crowd safety and risk awareness platform for India. Monitor events, assess risks, and prevent stampedes with real-time data and historical analysis.',
  keywords: ['crowd safety', 'stampede prevention', 'event management', 'crowd control', 'India', 'public safety'],
  authors: [{ name: 'StampedeSafe Initiative' }],
  creator: 'StampedeSafe Initiative',
  publisher: 'StampedeSafe Initiative',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dodgestampede.vercel.app', // Replace with your actual URL after deployment
    title: 'Dodge Stampede - Crowd Safety Platform',
    description: 'Advanced crowd safety and risk awareness platform for India',
    siteName: 'Dodge Stampede',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dodge Stampede - Crowd Safety Platform',
    description: 'Advanced crowd safety and risk awareness platform for India',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Background Pattern */}
        <div className="fixed inset-0 pattern-bg pointer-events-none z-0" />
        
        {/* Main App Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <AuthProvider>
            {/* Navigation */}
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700 mt-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Brand Section */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">DS</span>
                      </div>
                      <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Dodge Stampede
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
                      Empowering safer gatherings across India through advanced crowd monitoring, 
                      risk assessment, and real-time safety intelligence.
                    </p>
                    <div className="flex items-center space-x-1 mt-3">
                      <div className="w-4 h-3 bg-saffron rounded-sm"></div>
                      <div className="w-4 h-3 bg-white border border-gray-300 rounded-sm"></div>
                      <div className="w-4 h-3 bg-indian-green rounded-sm"></div>
                      <span className="text-xs text-gray-500 ml-2">Made in India</span>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                      <li><Link href="/events" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Live Events</Link></li>
                      <li><Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors">Dashboard</Link></li>
                      {/* Note: The links below will 404 until you create these pages */}
                      <li><a href="#" className="text-gray-500 cursor-not-allowed">Safety Reports</a></li>
                    </ul>
                  </div>

                  {/* Support */}
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="text-gray-500 cursor-not-allowed">Help Center</a></li>
                      <li><a href="#" className="text-gray-500 cursor-not-allowed">Contact Us</a></li>
                      <li><a href="#" className="text-gray-500 cursor-not-allowed">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2025 Dodge Stampede. All rights reserved. Building safer communities.
                  </p>
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <span className="text-xs text-gray-500">Emergency: </span>
                    <a href="tel:100" className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-medium">
                      100
                    </a>
                    <a href="tel:108" className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                      108
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}