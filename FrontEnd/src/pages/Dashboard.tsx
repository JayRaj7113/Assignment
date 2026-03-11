import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { LogOut, Shield, User as UserIcon, AlertCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Function to handle logout and redirect to login page
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const { data: userContent, isLoading: isUserLoading, isError: isUserError } = useQuery({
    queryKey: ['userContent'],
    queryFn: async () => {
      const res = await api.get('/user');
      return res.data;
    },
    // Both ADMIN and USER can see this content
  });

  // Only run if user is ADMIN
  const { data: adminContent, isLoading: isAdminLoading, isError: isAdminError } = useQuery({
    queryKey: ['adminContent'],
    queryFn: async () => {
      const res = await api.get('/admin');
      return res.data;
    },
    // This query only runs if the user is an ADMIN
    enabled: user?.role === 'ADMIN',
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="flex-shrink-0 h-8 w-8 text-indigo-600" />
              <span className="ml-3 text-xl font-bold text-gray-900">SecureApp Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 hidden sm:flex">
                <span className="font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
                  {user?.role}
                </span>
                <span>{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-2 text-gray-600">This is your role-based personalized dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* User Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transform transition hover:shadow-md">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex items-center">
              <UserIcon className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-lg font-bold text-gray-900">User Content</h2>
            </div>
            <div className="p-6">
              {isUserLoading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ) : isUserError ? (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Failed to load user content.
                </div>
              ) : (
                <p className="text-gray-700 font-medium">{userContent}</p>
              )}
            </div>
          </div>

          {/* Admin Content Card - conditionally rendered or conditionally accessible */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transform transition hover:shadow-md">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200 flex items-center">
              <Shield className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-lg font-bold text-gray-900">Admin Content</h2>
            </div>
            <div className="p-6">
              {user?.role !== 'ADMIN' ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Lock className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-sm font-medium text-gray-500">Restricted Access</p>
                  <p className="text-xs text-gray-400 mt-1">You must be an ADMIN to view this content.</p>
                </div>
              ) : isAdminLoading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ) : isAdminError ? (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Failed to load admin content.
                </div>
              ) : (
                <p className="text-purple-700 font-medium">{adminContent}</p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

