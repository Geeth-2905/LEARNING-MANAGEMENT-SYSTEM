import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to Student LMS
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              Your comprehensive learning management system for academic excellence
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/login"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-400"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <GraduationCap className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Learning</h3>
            <p className="text-gray-600">
              Access comprehensive course materials and interactive learning resources
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your academic performance and attendance in real-time
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">
              Engage with instructors and submit assignments easily
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Excel</h3>
            <p className="text-gray-600">
              Achieve your academic goals with personalized insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;