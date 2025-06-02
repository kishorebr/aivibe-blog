import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              AIVibe
            </Link>
            <p className="text-sm text-gray-600">
              Where AI meets everyday life
            </p>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}