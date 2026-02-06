/** @format */

'use client';

import { useState, useRef, FormEvent } from 'react';
import { Loader2, CheckCircle, AlertCircle, Upload, X, User } from 'lucide-react';

interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export default function AlumniForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    phone: '',
    position: '',
    message: '',
    isNewData: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      // If checking "New Data", uncheck the other. If checking "Update Data", set isNewData to false
      if (name === 'newData') {
        setFormData(prev => ({ ...prev, isNewData: checked }));
      } else if (name === 'updateData') {
        setFormData(prev => ({ ...prev, isNewData: !checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setFormState(prev => ({ ...prev, error: 'Tipe file tidak valid. Hanya JPEG, PNG, dan WebP yang diperbolehkan.' }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormState(prev => ({ ...prev, error: 'Ukuran file terlalu besar. Maksimal 5MB.' }));
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormState(prev => ({ ...prev, error: null }));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState({ loading: true, success: false, error: null });

    // Validate photo is required
    if (!selectedFile) {
      setFormState({ loading: false, success: false, error: 'Foto wajib diupload' });
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('institution', formData.institution);
      submitData.append('phone', formData.phone);
      submitData.append('position', formData.position);
      submitData.append('message', formData.message);
      submitData.append('isNewData', String(formData.isNewData));
      submitData.append('photo', selectedFile);

      const res = await fetch('/api/alumni/register', {
        method: 'POST',
        body: submitData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      setFormState({ loading: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        institution: '',
        phone: '',
        position: '',
        message: '',
        isNewData: true,
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      setFormState({ 
        loading: false, 
        success: false, 
        error: error instanceof Error ? error.message : 'Terjadi kesalahan' 
      });
    }
  };

  if (formState.success) {
    return (
      <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">Pendaftaran Berhasil!</h3>
        <p className="mt-2 text-gray-600">
          Terima kasih telah mendaftar sebagai alumni SPE. Data Anda telah tersimpan.
        </p>
        <button
          onClick={() => setFormState({ loading: false, success: false, error: null })}
          className="mt-6 rounded-full bg-[#3C8C98] px-8 py-3 font-semibold text-white transition-all hover:bg-[#2d6b75]"
        >
          Daftar Lagi
        </button>
      </div>
    );
  }

  return (
    <form className="mx-auto max-w-6xl" onSubmit={handleSubmit}>
      {formState.error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{formState.error}</p>
        </div>
      )}

      {/* Form Grid - 2 Columns on larger screens */}
      <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Name */}
          <div className="group">
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Input your Full Name"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:border-[#3C8C98] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Institution */}
          <div className="group">
            <label htmlFor="institution" className="mb-2 block text-sm font-semibold text-gray-800">
              Institution <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              placeholder="Input your Institution"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:border-[#3C8C98] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Position */}
          <div className="group">
            <label htmlFor="position" className="mb-2 block text-sm font-semibold text-gray-800">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Input your Current Position"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:border-[#3C8C98] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Photo Upload */}
          <div className="group">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Upload Photo File (Mandatory) <span className="text-red-500">*max 5 mb</span>
            </label>
            {previewUrl ? (
              <div className="relative inline-block">
                <img src={previewUrl} alt="Preview" className="h-24 w-24 rounded-full object-cover border-2 border-[#3C8C98]" />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white px-4 py-3 text-gray-500 transition-all hover:border-[#3C8C98] hover:bg-gray-50"
              >
                <Upload className="h-5 w-5" />
                <span>Choose Files</span>
                <span className="text-gray-400">No file chosen</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Email */}
          <div className="group">
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Input your University Email (Ex: 1917@student.univ)"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:border-[#3C8C98] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="group">
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-800">
              Personal Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Input your Personal Phone Number"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:border-[#3C8C98] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Message */}
          <div className="group">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-800">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Input the message you want to convey"
              className="w-full resize-none rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 placeholder:text-gray-400 focus:border-[#3C8C98] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Data Type Selection */}
          <div className="group">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="newData"
                  checked={formData.isNewData}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#3C8C98] focus:ring-[#3C8C98]"
                />
                <span className="text-sm text-gray-800">New Data</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="updateData"
                  checked={!formData.isNewData}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#3C8C98] focus:ring-[#3C8C98]"
                />
                <span className="text-sm text-gray-800">Update Data</span>
              </label>
              <span className="text-red-500 text-sm">(please select one)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex flex-col items-center gap-6 pt-8">
        <button
          type="submit"
          disabled={formState.loading}
          className="w-full max-w-md rounded-full bg-[#3C8C98] px-12 py-4 text-center font-semibold text-white shadow-lg transition-all hover:bg-[#2d6b75] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          {formState.loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Mengirim...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}
