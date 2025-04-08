import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const examSchedule = [
  {
    id: '1',
    title: 'Mathematics Mid-term',
    date: new Date('2024-04-15T09:00:00'),
    duration: 180,
    course: 'Mathematics',
    room: 'Hall A'
  },
  {
    id: '2',
    title: 'Physics Lab Test',
    date: new Date('2024-04-18T14:00:00'),
    duration: 120,
    course: 'Physics',
    room: 'Lab 102'
  },
  {
    id: '3',
    title: 'Chemistry Final',
    date: new Date('2024-04-22T10:00:00'),
    duration: 180,
    course: 'Chemistry',
    room: 'Hall B'
  }
];

const ExamSchedule = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Exam Schedule</h2>
        <Link
          to="test"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Take Test
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {examSchedule.map((exam) => (
          <div key={exam.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium text-indigo-600">{exam.course}</span>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900">{exam.title}</h3>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(exam.date, 'PPP p')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Duration</label>
                  <p className="mt-1 text-sm text-gray-900">{exam.duration} minutes</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="mt-1 text-sm text-gray-900">{exam.room}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExamTest = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = React.useState('');

  const handleStartTest = () => {
    if (selectedExam) {
      navigate(`/test/${selectedExam}`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Take Test</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select an exam</option>
              {examSchedule.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleStartTest}
            disabled={!selectedExam}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

const Exams = () => {
  return (
    <Routes>
      <Route index element={<ExamSchedule />} />
      <Route path="test" element={<ExamTest />} />
    </Routes>
  );
};

export default Exams;