import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import type { AuthResponse } from '../types';
import { Lock, Mail, UserIcon, Loader2, UserCheck } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post<AuthResponse>('/public/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, { name: data.name, email: data.email, role: data.role });
      navigate('/dashboard');
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || 'Registration failed. Email might already be in use.');
    }
  });

  const onSubmit = (data: any) => {
    setErrorMsg('');
    registerMutation.mutate(data);
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl transform transition-all">
        
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <UserCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm transition-colors"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required', 
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/,
                      message: 'Password must contain uppercase, lowercase, number and special character'
                    }
                  })}
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Role</label>
              <div className="mt-2 flex space-x-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="radio" className="form-radio h-4 w-4 text-purple-600" value="USER" {...register('role')} defaultChecked />
                  <span className="ml-2 text-gray-700">User</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="radio" className="form-radio h-4 w-4 text-purple-600" value="ADMIN" {...register('role')} />
                  <span className="ml-2 text-gray-700">Admin</span>
                </label>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{errorMsg}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="group relative flex w-full justify-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-70 transition-colors shadow-md"
            >
              {registerMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Register'
              )}
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-500">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
