import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { format } from 'date-fns';

const MyPayments = () => {
  const payments = [
    {
      id: '1',
      type: 'semester',
      amount: 5000,
      date: new Date('2024-02-15'),
      status: 'completed',
      description: 'Spring 2024 Semester Fee'
    },
    {
      id: '2',
      type: 'exam',
      amount: 150,
      date: new Date('2024-03-01'),
      status: 'completed',
      description: 'Mid-term Examination Fee'
    },
    {
      id: '3',
      type: 'certification',
      amount: 300,
      date: new Date('2024-03-10'),
      status: 'pending',
      description: 'Advanced Python Certification'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment History</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                  <div className="text-sm text-gray-500">{payment.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${payment.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{format(payment.date, 'PP')}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select payment method</option>
          <option value="upi">UPI</option>
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
        </select>
      </div>

      {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="month"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </>
      )}

      {paymentMethod === 'upi' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">UPI ID</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="username@bank"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Pay Now
      </button>
    </form>
  );
};

const ExamFee = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const courses = [
    { id: '1', name: 'Mathematics', fee: 50 },
    { id: '2', name: 'Physics', fee: 50 },
    { id: '3', name: 'Chemistry', fee: 50 },
    { id: '4', name: 'Biology', fee: 50 },
    { id: '5', name: 'Computer Science', fee: 50 }
  ];

  const totalAmount = courses
    .filter(course => selectedCourses.includes(course.id))
    .reduce((sum, course) => sum + course.fee, 0);

  const handleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Exam Fee Payment</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Courses</label>
            <div className="mt-4 space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleCourseSelection(course.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    {course.name} - ${course.fee}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          {selectedCourses.length > 0 && <PaymentForm />}
        </div>
      </div>
    </div>
  );
};

const SemesterFee = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Semester Fee Payment</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Academic Year</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>2023-2024</option>
                <option>2024-2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Semester</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                className="mt-1 block w-full pl-7 pr-12 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <select className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>
          </div>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

const CertificationFee = () => {
  const certifications = [
    { id: '1', name: 'Web Development', fee: 299 },
    { id: '2', name: 'Data Science', fee: 399 },
    { id: '3', name: 'Machine Learning', fee: 499 },
    { id: '4', name: 'Cloud Computing', fee: 299 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Certification Fee Payment</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Certification</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              {certifications.map((cert) => (
                <option key={cert.id} value={cert.id}>
                  {cert.name} - ${cert.fee}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>2024</option>
                <option>2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Semester</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

const Payments = () => {
  return (
    <div>
      <div className="mb-6 flex space-x-4">
        <Link
          to="/payments"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          My Payments
        </Link>
        <Link
          to="/payments/exam"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Exam Fee
        </Link>
        <Link
          to="/payments/semester"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Semester Fee
        </Link>
        <Link
          to="/payments/certification"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          Certification Fee
        </Link>
      </div>

      <Routes>
        <Route index element={<MyPayments />} />
        <Route path="exam" element={<ExamFee />} />
        <Route path="semester" element={<SemesterFee />} />
        <Route path="certification" element={<CertificationFee />} />
      </Routes>
    </div>
  );
};

export default Payments;