import React from 'react';

const courses = [
  {
    name: 'Mathematics',
    instructor: 'Dr. Sarah Johnson',
    description: 'Advanced calculus and linear algebra concepts for engineering applications.',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    room: 'Room 301'
  },
  {
    name: 'Physics',
    instructor: 'Prof. Michael Chen',
    description: 'Classical mechanics and electromagnetic theory with practical experiments.',
    schedule: 'Tue, Thu - 10:30 AM',
    room: 'Room 205'
  },
  {
    name: 'Chemistry',
    instructor: 'Dr. Emily Brown',
    description: 'Organic chemistry with focus on reaction mechanisms and synthesis.',
    schedule: 'Mon, Wed - 2:00 PM',
    room: 'Lab 102'
  },
  {
    name: 'Biology',
    instructor: 'Prof. James Wilson',
    description: 'Cell biology and genetics with laboratory work.',
    schedule: 'Tue, Thu - 1:00 PM',
    room: 'Lab 203'
  },
  {
    name: 'Computer Science',
    instructor: 'Dr. Lisa Anderson',
    description: 'Data structures, algorithms, and software engineering principles.',
    schedule: 'Wed, Fri - 11:00 AM',
    room: 'Room 405'
  }
];

const Courses = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Courses</h2>
      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <div key={course.name} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{course.instructor}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <p className="mt-4 text-gray-600">{course.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Schedule</label>
                  <p className="mt-1 text-sm text-gray-900">{course.schedule}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="mt-1 text-sm text-gray-900">{course.room}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;