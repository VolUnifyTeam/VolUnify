import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
    const [email,setEmail] = useState(" ");
    const [password,setPassword] = useState(" ");
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const {session, signUpNewUser} = UserAuth();
    const navigate = useNavigate();

    const handleSignUp = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signUpNewUser(email,password)
            if(result.success){
                navigate('/Dashboard')
            }
        } catch (err) {
            setError("An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex-grow">
                <div className="max-w-md mx-auto px-4 py-24">
                    <p onClick={() => navigate("/OrgSearch")} className="hover:cursor-pointer text-center text-blue-600 hover:text-blue-800 mb-8">
                        <Link to='/OrgSearch'>Volunteer For An Organization Here!</Link>
                    </p>

                  

                    <form onSubmit={handleSignUp} className="bg-gray-800 p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-100 pb-4 text-center">
                            Organization Signup
                        </h2>
                    
                        <p className="text-center text-gray-100 mb-6">
                            Already have an account? <Link to='/signin' className="text-blue-600 hover:underline">Sign In!</Link>
                        </p>

                        <div className='flex flex-col py-2'>
                            <input 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder='yourEmail@domain.end' 
                                className='p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="email" 
                                id="email"
                                name="email"
                                required
                            />
                        </div>

                        <div className="flex flex-col py-2">
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder='Password' 
                                className='p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                type="password" 
                                id="password"
                                name="password"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className='mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded transition duration-200'
                        >
                            {loading ? 'Processing...' : 'Sign Up'}
                        </button>
                        
                        {error && <p className='text-red-600 text-center pt-4'>{error}</p>}
                    </form>
                </div>
            </div>

            {/* Footer Section */}
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

export default Signup;