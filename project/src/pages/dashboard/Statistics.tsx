import React from 'react';
import { BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';

const Statistics = () => {
  // Mock data - in a real app, this would come from your backend
  const performanceData = {
    overallGPA: 3.5,
    attendance: 88,
    submittedAssignments: 15,
    totalAssignments: 18,
    subjects: [
      { name: 'Mathematics', grade: 'B+', attendance: 85, needsImprovement: true },
      { name: 'Physics', grade: 'A-', attendance: 92, needsImprovement: false },
      { name: 'Chemistry', grade: 'B', attendance: 88, needsImprovement: true },
      { name: 'Biology', grade: 'A', attendance: 95, needsImprovement: false },
      { name: 'Computer Science', grade: 'A', attendance: 90, needsImprovement: false }
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Academic Statistics</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall GPA</p>
              <p className="text-2xl font-bold text-gray-900">{performanceData.overallGPA}</p>
            </div>
            <BarChart2 className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{performanceData.attendance}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Assignment Completion</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((performanceData.submittedAssignments / performanceData.totalAssignments) * 100)}%
              </p>
            </div>
            <AlertTriangle className={`h-8 w-8 ${performanceData.submittedAssignments < performanceData.totalAssignments ? 'text-yellow-500' : 'text-green-600'}`} />
          </div>
        </div>
      </div>

      {/* Subjects Performance */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Subject-wise Performance</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {performanceData.subjects.map((subject) => (
            <div key={subject.name} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{subject.name}</h4>
                  <div className="mt-1 flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Grade: {subject.grade}</span>
                    <span className="text-sm text-gray-500">Attendance: {subject.attendance}%</span>
                  </div>
                </div>
                {subject.needsImprovement && (
                  <div className="bg-yellow-50 text-yellow-800 text-sm px-3 py-1 rounded-full">
                    Needs Improvement
                  </div>
                )}
              </div>
              {subject.needsImprovement && (
                <div className="mt-2 text-sm text-gray-500">
                  <p>Recommendations:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Attend extra practice sessions</li>
                    <li>Complete all pending assignments</li>
                    <li>Schedule consultation with faculty</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;