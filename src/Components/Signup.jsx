import React, { useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import starDesign from '../realassets/images/stardesign.png';

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
            {/* Main content with stars */}
            <div className="flex-grow flex items-start justify-between p-8 relative">
                {/* Left side stars - alternating right position */}
                <div className="hidden lg:flex flex-col w-1/6 h-full justify-start items-start space-y-16">
                    {/* Top star - pushed right */}
                    <div className="w-full flex justify-end pr-8 pt-16">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-32 opacity-70" 
                        />
                    </div>
                    {/* Middle star - centered left */}
                    <div className="w-full flex justify-start pl-8">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-28 opacity-70" 
                        />
                    </div>
                    {/* Bottom star - pushed right */}
                    <div className="w-full flex justify-end pr-16">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-24 opacity-70" 
                        />
                    </div>
                </div>

                {/* Center content */}
                <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="max-w-md w-full mx-auto px-4 py-24">
                        <form onSubmit={handleSignUp} className="bg-gray-800 p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-gray-100 pb-4 text-center">
                                Organization Sign-Up
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

                {/* Right side stars - mirror of left side */}
                <div className="hidden lg:flex flex-col w-1/6 h-full justify-start items-end space-y-16">
                    {/* Top star - pushed left */}
                    <div className="w-full flex justify-start pl-8 pt-16">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-32 opacity-70" 
                        />
                    </div>
                    {/* Middle star - centered right */}
                    <div className="w-full flex justify-end pr-8">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-28 opacity-70" 
                        />
                    </div>
                    {/* Bottom star - pushed left */}
                    <div className="w-full flex justify-start pl-16">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-24 opacity-70" 
                        />
                    </div>
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