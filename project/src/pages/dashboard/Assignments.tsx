import React from 'react';
import { format } from 'date-fns';

const assignments = [
  {
    id: '1',
    subject: 'Mathematics',
    title: 'Linear Algebra Assignment',
    deadline: new Date('2024-03-25'),
    description: 'Complete exercises 1-10 from Chapter 4',
    submitted: false
  },
  {
    id: '2',
    subject: 'Physics',
    title: 'Lab Report: Wave Motion',
    deadline: new Date('2024-03-28'),
    description: 'Write a detailed report on the wave motion experiment',
    submitted: true
  },
  {
    id: '3',
    subject: 'Chemistry',
    title: 'Organic Chemistry Problems',
    deadline: new Date('2024-03-30'),
    description: 'Solve problems related to reaction mechanisms',
    submitted: false
  }
];

const Assignments = () => {
  const handleFileUpload = (assignmentId: string, file: File) => {
    console.log(`Uploading file for assignment ${assignmentId}:`, file);
    // Handle file upload logic here
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assignments</h2>
      <div className="grid grid-cols-1 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium text-indigo-600">{assignment.subject}</span>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900">{assignment.title}</h3>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    assignment.submitted
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {assignment.submitted ? 'Submitted' : 'Pending'}
                </span>
              </div>
              <p className="mt-4 text-gray-600">{assignment.description}</p>
              <div className="mt-6">
                <div className="text-sm text-gray-500">
                  Deadline: {format(assignment.deadline, 'PPP')}
                </div>
                {!assignment.submitted && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Assignment</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(assignment.id, file);
                                }
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;