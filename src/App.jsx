import { Outlet, Link, useNavigation } from 'react-router-dom';
import LoadingSpinner from './Components/LoadingSpinner';

function App() {
  const navigation = useNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Show spinner during route transitions */}
      {navigation.state === 'loading' && <LoadingSpinner />}
      
      {/* Header Section */}
      <div className="bg-gray-100 pb-4 tracking-tight relative">
        <div className="text-center pt-6 drop-shadow-md tracking-tight">
          <Link to="/" className="no-underline">
            <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight hover:text-blue-700 transition-colors">
              VOLUNIFY
            </h1>
          </Link>
          <p className="text-blue-400 mt-2"> 
            All Your Volunteering Needs In One Place!
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 shadow-[0_2px_4px_0px_rgba(0,0,0,0.1)]"></div>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default App;