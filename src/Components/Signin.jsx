import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const Signin = () => {
    const [email,setEmail] = useState(" ");
    const [password,setPassword] = useState(" ");
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const {session, signInUser} = UserAuth();
    const navigate = useNavigate();

    const handleSignIn = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signInUser(email,password)
            if(result.success){
                navigate('/Dashboard')
            }
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                    <h2 className="text-center text-3xl font-bold text-white mb-2">Sign In</h2>
                    <p className="text-gray-400 mb-6">
                        Need to Create an Account? <Link to='/signup' className="text-blue-400 hover:text-blue-300">Create One Here!</Link>
                    </p>

                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                Email Address
                            </label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                type="email" 
                                id="email"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                Password
                            </label>
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                type="password" 
                                id="password"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                        
                        {error && <p className="text-red-400 text-center pt-4">{error}</p>}
                    </form>
                </div>
            </div>

           <footer className="py-6 bg-indigo-900 text-white">
                <div className="max-w-md mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-2">VolUnify</h2>
                    <p className="text-indigo-200">
                        Have any questions or need support? Contact us at:{" "}
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