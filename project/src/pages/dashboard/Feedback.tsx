import React from 'react';

const instructors = [
  { id: '1', name: 'Dr. Sarah Johnson', subject: 'Mathematics' },
  { id: '2', name: 'Prof. Michael Chen', subject: 'Physics' },
  { id: '3', name: 'Dr. Emily Brown', subject: 'Chemistry' },
  { id: '4', name: 'Prof. James Wilson', subject: 'Biology' },
  { id: '5', name: 'Dr. Lisa Anderson', subject: 'Computer Science' }
];

const Feedback = () => {
  const [selectedInstructor, setSelectedInstructor] = React.useState('');
  const [ratings, setRatings] = React.useState({
    teaching: 0,
    knowledge: 0,
    communication: 0,
    helpfulness: 0,
    overall: 0
  });
  const [comment, setComment] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      instructor: selectedInstructor,
      ratings,
      comment
    });
    // Handle feedback submission
  };

  const StarRating: React.FC<{
    name: string;
    value: number;
    onChange: (value: number) => void;
  }> = ({ name, value, onChange }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${
            star <= value
              ? 'text-yellow-400'
              : 'text-gray-300'
          } hover:text-yellow-400 focus:outline-none`}
          onClick={() => onChange(star)}
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Faculty Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Instructor</label>
          <select
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select an instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name} - {instructor.subject}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teaching Quality
            </label>
            <StarRating
              name="teaching"
              value={ratings.teaching}
              onChange={(value) => setRatings({ ...ratings, teaching: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Knowledge
            </label>
            <StarRating
              name="knowledge"
              value={ratings.knowledge}
              onChange={(value) => setRatings({ ...ratings, knowledge: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Communication Skills
            </label>
            <StarRating
              name="communication"
              value={ratings.communication}
              onChange={(value) => setRatings({ ...ratings, communication: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Helpfulness
            </label>
            <StarRating
              name="helpfulness"
              value={ratings.helpfulness}
              onChange={(value) => setRatings({ ...ratings, helpfulness: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating
            </label>
            <StarRating
              name="overall"
              value={ratings.overall}
              onChange={(value) => setRatings({ ...ratings, overall: value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Share your thoughts about the instructor..."
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;