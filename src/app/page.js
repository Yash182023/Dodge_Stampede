import locationsData from '@/data/database.json';
import Link from 'next/link';

export default function HomePage() {
  // We can directly access the locations array from our imported JSON
  const locations = locationsData.locations;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Stampede Safe India
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          An initiative to provide historical data and risk factors for crowded locations in India.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Link 
            key={location.id} 
            href={`/locations/${location.id}`}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{location.name}</h2>
            <p className="font-normal text-gray-500">{location.city}, {location.state}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded mt-4">
              {location.type}
            </span>
          </Link>
        ))}
      </div>

      <footer className="text-center mt-16 text-gray-500">
        <p>Stay informed. Stay safe.</p>
      </footer>
    </main>
  );
}