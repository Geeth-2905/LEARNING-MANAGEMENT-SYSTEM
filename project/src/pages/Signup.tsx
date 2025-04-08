import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SignupForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  parentPhoneNumber: string;
  parentEmail: string;
}

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>();
  const { signup, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard/profile" />;
  }

  const onSubmit = async (data: SignupForm) => {
    try {
      setError('');
      await signup(data);
      navigate('/dashboard/profile');
    } catch (error: any) {
      console.error('Signup failed:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <GraduationCap className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                type="text"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                type="text"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                type="password"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                {...register('age', { 
                  required: 'Age is required',
                  min: { value: 16, message: 'Must be at least 16 years old' }
                })}
                type="number"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                {...register('phoneNumber', { 
                  required: 'Phone number is required',
                  pattern: { 
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be exactly 10 digits'
                  }
                })}
                type="tel"
                maxLength={10}
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <label htmlFor="parentPhoneNumber" className="block text-sm font-medium text-gray-700">Parent's Phone Number</label>
              <input
                {...register('parentPhoneNumber', { 
                  required: 'Parent phone number is required',
                  pattern: { 
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be exactly 10 digits'
                  }
                })}
                type="tel"
                maxLength={10}
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.parentPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.parentPhoneNumber.message}</p>}
            </div>

            <div>
              <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700">Parent's Email</label>
              <input
                {...register('parentEmail', { required: 'Parent email is required' })}
                type="email"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;