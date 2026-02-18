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
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3C8C98]/10">
          <CheckCircle className="h-10 w-10 text-[#3C8C98]" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-gray-900">Pendaftaran Berhasil!</h3>
        <p className="mt-2 text-gray-600">
          Terima kasih telah mendaftar sebagai alumni SPE. Data Anda telah tersimpan.
        </p>
        <button
          onClick={() => setFormState({ loading: false, success: false, error: null })}
          className="mt-6 rounded-xl bg-[#3C8C98] px-8 py-3 font-semibold text-white transition-all hover:bg-[#2d6b75]"
        >
          Daftar Lagi
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-all focus:border-[#3C8C98] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3C8C98]/20';
  const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700';

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Teal accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#3C8C98] to-[#2cb385]" aria-hidden="true" />
        {formState.error && (
          <div className="border-b border-red-100 bg-red-50/80 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{formState.error}</p>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
          {/* Form Grid - 2 Columns on larger screens, full width = same as Alumnae Data title */}
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <label htmlFor="name" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="institution" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="position" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className={labelClass}>
                  Upload Photo <span className="text-red-500">*</span>
                </label>
                <p className="mb-2 text-xs text-gray-500">Max. 5 MB. Format: JPEG, PNG, or WebP.</p>
                {previewUrl ? (
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-20 w-20 rounded-xl object-cover ring-2 ring-[#3C8C98]/30"
                      />
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
                        aria-label="Remove photo"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">Photo selected</span>
                  </div>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 py-8 text-center transition-colors hover:border-[#3C8C98]/50 hover:bg-[#3C8C98]/5"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Choose file</span>
                    <span className="text-xs text-gray-400">No file chosen</span>
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
            <div className="space-y-8">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Input your University Email (e.g. 1917@student.univ)"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
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
                  className={`${inputClass} min-h-[100px] resize-y`}
                />
              </div>

              {/* Data Type - compact group */}
              <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
                <p className="mb-3 text-sm font-medium text-gray-700">Data type</p>
                <div className="flex flex-wrap gap-8">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      name="newData"
                      checked={formData.isNewData}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-[#3C8C98] focus:ring-2 focus:ring-[#3C8C98] focus:ring-offset-0"
                    />
                    <span className="text-sm font-medium text-gray-800">New Data</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      name="updateData"
                      checked={!formData.isNewData}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-[#3C8C98] focus:ring-2 focus:ring-[#3C8C98] focus:ring-offset-0"
                    />
                    <span className="text-sm font-medium text-gray-800">Update Data</span>
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-500">Pilih salah satu.</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-12 flex justify-center border-t border-gray-100 pt-10">
            <button
              type="submit"
              disabled={formState.loading}
              className="min-w-[220px] rounded-xl bg-[#3C8C98] px-12 py-4 font-semibold text-white shadow-md transition-all hover:bg-[#2d6b75] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
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
        </div>
      </div>
    </form>
  );
}
