export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  parentPhoneNumber: string;
  parentEmail: string;
  photoUrl: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  deadline: Date;
  submitted: boolean;
}

export interface Grade {
  courseId: string;
  grade: string;
  semester: number;
}

export interface Exam {
  id: string;
  courseId: string;
  date: Date;
  duration: number;
  title: string;
}

export interface Payment {
  id: string;
  type: 'exam' | 'semester' | 'certification';
  amount: number;
  date: Date;
  status: 'pending' | 'completed';
  description: string;
}