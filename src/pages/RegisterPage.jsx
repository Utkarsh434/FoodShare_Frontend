
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import { UserPlus, User, AtSign, KeyRound, HandHeart, Utensils } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, register, isLoading, isError, message } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 'donor',
  });

  const { name, email, password, password2, role } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user) {
      navigate('/donations');
    }
  }, [user, isError, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    }
    const userData = { name, email, password, role };
    try {
      await register(userData);
      toast.success('Registration successful! Welcome.');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-gray-100 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Left Motivational Part */}
          <div className="md:w-5/12 bg-green-600 text-white p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <HandHeart className="w-16 h-16 mb-4 opacity-80" />
            <h1 className="text-4xl font-bold leading-tight mb-3">Join the Movement</h1>
            <p className="text-lg text-green-100 opacity-90">
              Create an account to start sharing surplus food and help us fight hunger in our community. Every contribution matters.
            </p>
          </div>

          {/* Right Form Part */}
          <div className="md:w-7/12 p-8 md:p-12">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <UserPlus className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
              <p className="text-gray-500 mt-1">to start making a difference</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                 </div>
                 <input type="text" name="name" value={name} onChange={onChange} placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-gray-400" />
                 </div>
                 <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                 </div>
                 <input type="password" name="password" value={password} onChange={onChange} placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>
              
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                 </div>
                 <input type="password" name="password2" value={password2} onChange={onChange} placeholder="Confirm Password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">I am a...</label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setFormData({...formData, role: 'donor'})}
                    className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${role === 'donor' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                    <HandHeart className={`h-5 w-5 ${role === 'donor' ? 'text-green-600' : 'text-gray-500'}`} />
                    <span className="font-semibold">Donor</span>
                  </button>
                  <button type="button" onClick={() => setFormData({...formData, role: 'receiver'})}
                    className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${role === 'receiver' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                    <Utensils className={`h-5 w-5 ${role === 'receiver' ? 'text-green-600' : 'text-gray-500'}`} />
                    <span className="font-semibold">Receiver</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105 disabled:bg-green-400"
                >
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
