import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Camera } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    parentPhoneNumber: user?.parentPhoneNumber || '',
    parentEmail: user?.parentEmail || '',
    photoUrl: user?.photoUrl || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === 'phoneNumber' || name === 'parentPhoneNumber') && value.length > 10) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to your server/storage
      // For now, we'll just create a temporary URL
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        photoUrl: url
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the user data in your backend
    console.log('Updated profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Edit Profile
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={formData.photoUrl}
                  alt={`${formData.firstName} ${formData.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handlePhotoClick}
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <Camera className="h-5 w-5 text-gray-600" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InfoField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InfoField
                label="Age"
                name="age"
                value={formData.age}
                type="number"
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InfoField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InfoField
                label="Email"
                name="email"
                value={formData.email}
                type="email"
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InfoField
                label="Parent's Phone"
                name="parentPhoneNumber"
                value={formData.parentPhoneNumber}
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InfoField
                label="Parent's Email"
                name="parentEmail"
                value={formData.parentEmail}
                type="email"
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
            {isEditing && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

interface InfoFieldProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  pattern?: string;
  maxLength?: number;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  name,
  value,
  type = "text",
  pattern,
  maxLength,
  isEditing,
  onChange
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        pattern={pattern}
        maxLength={maxLength}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    ) : (
      <div className="mt-1 p-3 bg-gray-50 rounded-md">
        <p className="text-gray-900">{value}</p>
      </div>
    )}
  </div>
);

export default Profile;