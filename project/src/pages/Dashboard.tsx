import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings, BookOpen, Calendar as CalendarIcon, FileText, GraduationCap, PenTool, DollarSign, MessageSquare, User, BarChart2, PieChart, ChevronRight, ChevronLeft } from 'lucide-react';
import ReactCalendar from 'react-calendar';
import { format } from 'date-fns';
import Profile from './dashboard/Profile';
import Attendance from './dashboard/Attendance';
import Courses from './dashboard/Courses';
import Assignments from './dashboard/Assignments';
import Grades from './dashboard/Grades';
import Exams from './dashboard/Exams';
import Payments from './dashboard/Payments';
import Feedback from './dashboard/Feedback';
import Statistics from './dashboard/Statistics';
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);

  const sidebarItems = [
    { path: '/dashboard/profile', name: 'Profile', icon: User },
    { path: '/dashboard/statistics', name: 'Statistics', icon: PieChart },
    { path: '/dashboard/attendance', name: 'Attendance', icon: CalendarIcon },
    { path: '/dashboard/courses', name: 'Courses', icon: BookOpen },
    { path: '/dashboard/assignments', name: 'Assignments', icon: FileText },
    { path: '/dashboard/grades', name: 'Grades', icon: GraduationCap },
    { path: '/dashboard/exams', name: 'Exams', icon: PenTool },
    { path: '/dashboard/payments', name: 'Payments', icon: DollarSign },
    { path: '/dashboard/feedback', name: 'Feedback', icon: MessageSquare }
  ];

  // Mock upcoming events - in production, this would come from your backend
  const upcomingEvents = [
    { date: new Date('2024-03-25'), title: 'Mathematics Assignment Due', type: 'assignment' },
    { date: new Date('2024-03-28'), title: 'Physics Mid-term Exam', type: 'exam' },
    { date: new Date('2024-03-30'), title: 'Chemistry Lab Report Due', type: 'assignment' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-16 flex items-center px-6">
          <BarChart2 className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">Student LMS</span>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1">
          {/* Header */}
          <header className="h-16 bg-white shadow">
            <div className="h-full px-6 flex items-center justify-end">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user?.email}</span>
                <div className="relative group">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Settings className="h-5 w-5 text-gray-600" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-1 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/exams/*" element={<Exams />} />
              <Route path="/payments/*" element={<Payments />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/" element={<Profile />} />
            </Routes>
          </main>
        </div>

        {/* Right Calendar Sidebar */}
        <div className={`bg-white shadow-lg transition-all duration-300 ${isCalendarOpen ? 'w-80' : 'w-12'}`}>
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            {isCalendarOpen ? <ChevronRight /> : <ChevronLeft />}
          </button>
          
          {isCalendarOpen && (
            <div className="p-4">
              <ReactCalendar className="w-full rounded-lg shadow-sm" />
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {format(event.date, 'PPP')}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.type === 'exam' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;