import React from 'react';

const grades = [
  {
    semester: 1,
    courses: [
      { name: 'Mathematics', grade: 'A', credits: 4 },
      { name: 'Physics', grade: 'A-', credits: 4 },
      { name: 'Chemistry', grade: 'B+', credits: 4 },
      { name: 'Biology', grade: 'A', credits: 4 },
      { name: 'Computer Science', grade: 'A', credits: 4 }
    ]
  },
  {
    semester: 2,
    courses: [
      { name: 'Advanced Mathematics', grade: 'B+', credits: 4 },
      { name: 'Quantum Physics', grade: 'A-', credits: 4 },
      { name: 'Organic Chemistry', grade: 'A', credits: 4 },
      { name: 'Molecular Biology', grade: 'A-', credits: 4 },
      { name: 'Data Structures', grade: 'A', credits: 4 }
    ]
  }
];

const calculateGPA = (courses: { grade: string; credits: number }[]) => {
  const gradePoints: { [key: string]: number } = {
    'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const totalPoints = courses.reduce((sum, course) => 
    sum + (gradePoints[course.grade] * course.credits), 0);
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return (totalPoints / totalCredits).toFixed(2);
};

const Grades = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Academic Record</h2>
      {grades.map((semester) => (
        <div key={semester.semester} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Semester {semester.semester}
              </h3>
              <span className="text-sm font-medium text-gray-500">
                GPA: {calculateGPA(semester.courses)}
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {semester.courses.map((course) => (
                  <tr key={course.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${course.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                          course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                          course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {course.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grades;