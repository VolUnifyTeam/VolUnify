import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import starDesign from '../realassets/images/stardesign.png';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const navigation = useNavigation();

    const { signInUser } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsPageLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const result = await signInUser(email, password);
            if (result.success) {
                navigate('/Dashboard');
            }
        } catch (err) {
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    if (isPageLoading || navigation.state === 'loading') {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Main content with aligned stars and form */}
            <div className="flex-grow flex items-start justify-between p-8 relative">
                {/* Left side stars - original height */}
                <div className="hidden lg:flex flex-col w-1/6 h-full justify-start items-start space-y-16">
                    {/* Top star */}
                    <div className="w-full flex justify-end pr-8 pt-16">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-32 opacity-70" 
                        />
                    </div>
                    {/* Middle star */}
                    <div className="w-full flex justify-start pl-8">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-28 opacity-70" 
                        />
                    </div>
                    {/* Bottom star */}
                    <div className="w-full flex justify-end pr-16">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-24 opacity-70" 
                        />
                    </div>
                </div>

                {/* Center form content - aligned with top stars */}
                <div className="flex-grow flex items-start justify-center pt-16">
                    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                        <h2 className="text-center text-3xl font-bold text-white mb-2">Sign In</h2>
                        <p className="text-gray-400 mb-6">
                            Need an account?{' '}
                            <Link to='/signup' className="text-blue-400 hover:text-blue-300 hover:underline">
                                Create One Here!
                            </Link>
                        </p>

                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email Address
                                </label>
                                <input 
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50" 
                                    type="email" 
                                    id="email"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                    Password
                                </label>
                                <input 
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50" 
                                    type="password" 
                                    id="password"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50 flex justify-center items-center"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing In...
                                    </>
                                ) : 'Sign In'}
                            </button>
                            
                            {error && (
                                <p className="text-red-400 text-center pt-4">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Right side stars - original height */}
                <div className="hidden lg:flex flex-col w-1/6 h-full justify-start items-end space-y-16">
                    {/* Top star */}
                    <div className="w-full flex justify-start pl-8 pt-16">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-32 opacity-70" 
                        />
                    </div>
                    {/* Middle star */}
                    <div className="w-full flex justify-end pr-8">
                        <img 
                            src={starDesign} 
                            alt="Decorative star" 
                            className="w-28 opacity-70" 
                        />
                    </div>
                    {/* Bottom star */}
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
                        Need help? Contact us at:{' '}
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

export default Signin;