import React, { useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const navigation = useNavigation();

    const { signUpNewUser } = UserAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        // Simulate page load (remove timeout in production)
        const timer = setTimeout(() => setIsPageLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const result = await signUpNewUser(email, password);
            if (result.success) {
                navigate('/Dashboard');
            }
        } catch (err) {
            setError(err.message || "An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    if (isPageLoading || navigation.state === 'loading') {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex-grow">
                <div className="max-w-md mx-auto px-4 py-24">
                    <p className="text-center mb-8">
                        <Link 
                            to="/OrgSearch" 
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            Volunteer For An Organization Here!
                        </Link>
                    </p>

                    <form onSubmit={handleSignUp} className="bg-gray-800 p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-100 pb-4 text-center">
                            Organization Signup
                        </h2>
                    
                        <p className="text-center text-gray-100 mb-6">
                            Already have an account?{' '}
                            <Link to='/signin' className="text-blue-400 hover:underline">
                                Sign In!
                            </Link>
                        </p>

                        <div className='flex flex-col py-2'>
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder='yourEmail@domain.end' 
                                className='p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="email" 
                                id="email"
                                name="email"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="flex flex-col py-2">
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder='Password' 
                                className='p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="password" 
                                id="password"
                                name="password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className='mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded transition duration-200 flex justify-center items-center'
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : 'Sign Up'}
                        </button>
                        
                        {error && (
                            <p className='text-red-400 text-center pt-4'>
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <footer className="py-6 bg-indigo-900 text-white">
                <div className="max-w-md mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-2">VolUnify</h2>
                    <p className="text-indigo-200">
                        Have any questions? Contact us at:{' '}
                        <a 
                            href="mailto:volunifyteam@gmail.com" 
                            className="text-indigo-300 hover:text-white underline"
                        >
                            volunifyteam@gmail.com
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Signup;