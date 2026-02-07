/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Trash2, Eye, Download, User, Loader2, Building, Phone, FileText, Pencil
} from 'lucide-react';

interface Alumni {
  id: string;
  name: string;
  email: string;
  institution: string;
  phone: string;
  position: string;
  message: string;
  photoPath: string | null;
  isNewData: boolean;
  createdAt: string;
}

type UserRole = 'SUPERADMIN' | 'WRITER' | 'EXTERNAL';

export default function AlumniAdmin() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [editForm, setEditForm] = useState<Partial<Alumni>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetch('/api/auth/me');
        if (me.ok) {
          const d = await me.json();
          setUserRole(d.user?.role ?? null);
        }
      } catch (_) {}
    })();
  }, []);
  useEffect(() => { fetchAlumni(); }, []);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/alumni');
      if (res.status === 401) {
        router.push('/login?redirect=/admin/alumni');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setAlumni(data.alumni || []);
      }
    } catch (error) {
      console.error('Failed to fetch alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlumni = alumni.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlumni = filteredAlumni.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (a: Alumni) => { setSelectedAlumni(a); setShowDeleteModal(true); };
  const handleViewDetail = (a: Alumni) => { setSelectedAlumni(a); setShowDetailModal(true); };
  const handleEdit = (a: Alumni) => {
    setSelectedAlumni(a);
    setEditForm({ name: a.name, email: a.email, institution: a.institution, phone: a.phone, position: a.position, message: a.message, photoPath: a.photoPath ?? '', isNewData: a.isNewData });
    setShowEditModal(true);
  };

  const handleAlumniPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/alumni/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setEditForm(f => ({ ...f, photoPath: data.url }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const saveAlumniEdit = async () => {
    if (!selectedAlumni) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/alumni/${selectedAlumni.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          institution: editForm.institution,
          phone: editForm.phone,
          position: editForm.position,
          message: editForm.message,
          photoPath: editForm.photoPath || null,
          isNewData: editForm.isNewData,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setAlumni(alumni.map(a => a.id === selectedAlumni.id ? { ...a, ...data.alumni, createdAt: a.createdAt } : a));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedAlumni) return;
    try {
      const res = await fetch(`/api/alumni/${selectedAlumni.id}`, { method: 'DELETE' });
      if (res.ok) {
        setAlumni(alumni.filter(a => a.id !== selectedAlumni.id));
        setShowDeleteModal(false);
      }
    } catch (error) { console.error('Delete failed:', error); }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <>
      <header className="h-auto min-h-14 px-4 py-3 sm:px-6 bg-white border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Alumni Management</h1>
          <p className="text-xs text-gray-500">{filteredAlumni.length} records</p>
        </div>
        <button onClick={() => window.open('/api/alumni/export', '_blank')} className="h-9 px-3 sm:px-4 border border-emerald-300 bg-emerald-50 text-emerald-700 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:bg-emerald-100 transition-colors self-start sm:self-auto">
          <Download className="w-4 h-4 flex-shrink-0" />Export
        </button>
      </header>

      <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
        <div className="flex-1 min-w-0 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search by name, email, or institution..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 pl-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
        </div>
      </div>

      <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50 min-h-0">
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <table className="w-full text-xs min-w-[560px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Alumni</th>
                <th className="text-left p-3 font-medium text-gray-700">Institution</th>
                <th className="text-left p-3 font-medium text-gray-700">Position</th>
                <th className="text-left p-3 font-medium text-gray-700">Type</th>
                <th className="text-center p-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAlumni.map(a => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {a.photoPath ? (
                        <img src={a.photoPath} alt={a.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{a.name}</p>
                        <p className="text-gray-500">{a.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3"><span className="text-gray-900">{a.institution}</span></td>
                  <td className="p-3"><span className="text-gray-900">{a.position}</span></td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${a.isNewData ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {a.isNewData ? 'New Data' : 'Update'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleViewDetail(a)} className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 rounded-md" title="View"><Eye className="w-3.5 h-3.5 text-blue-600" /></button>
                      {userRole === 'SUPERADMIN' && (
                        <button onClick={() => handleEdit(a)} className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md" title="Edit"><Pencil className="w-3.5 h-3.5 text-amber-600" /></button>
                      )}
                      <button onClick={() => handleDelete(a)} className="w-7 h-7 flex items-center justify-center hover:bg-red-50 rounded-md" title="Delete"><Trash2 className="w-3.5 h-3.5 text-red-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAlumni.length === 0 && <div className="text-center py-12"><User className="w-12 h-12 text-gray-400 mx-auto mb-4" /><p className="text-sm text-gray-500">No alumni found</p></div>}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded text-sm ${currentPage === page ? 'bg-[#3C8C98] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                {page}
              </button>
            ))}
          </div>
        )}
      </main>

      {showDetailModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-900">Alumni Details</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700 text-lg font-semibold">✕</button>
            </div>
            <div className="p-4 space-y-3 text-sm">
              {selectedAlumni.photoPath && (
                <div className="flex justify-center mb-4">
                  <img src={selectedAlumni.photoPath} alt={selectedAlumni.name} className="w-24 h-24 rounded-full object-cover" />
                </div>
              )}
              <p><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{selectedAlumni.name}</span></p>
              <p><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-900">{selectedAlumni.email}</span></p>
              <p><span className="font-semibold text-gray-700">Institution:</span> <span className="text-gray-900">{selectedAlumni.institution}</span></p>
              <p><span className="font-semibold text-gray-700">Phone:</span> <span className="text-gray-900">{selectedAlumni.phone}</span></p>
              <p><span className="font-semibold text-gray-700">Position:</span> <span className="text-gray-900">{selectedAlumni.position}</span></p>
              <p><span className="font-semibold text-gray-700">Message:</span> <span className="text-gray-900">{selectedAlumni.message}</span></p>
              <p><span className="font-semibold text-gray-700">Type:</span> <span className="text-gray-900">{selectedAlumni.isNewData ? 'New Data' : 'Update Data'}</span></p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end"><button onClick={() => setShowDetailModal(false)} className="h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm transition-colors">Close</button></div>
          </div>
        </div>
      )}

      {showEditModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-900">Edit Alumni</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700 text-lg font-semibold">✕</button>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={editForm.name ?? ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} className="w-full h-9 px-3 border border-gray-300 rounded-md text-gray-900" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={editForm.email ?? ''} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} className="w-full h-9 px-3 border border-gray-300 rounded-md text-gray-900" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Institution</label>
                <input type="text" value={editForm.institution ?? ''} onChange={e => setEditForm(f => ({ ...f, institution: e.target.value }))} className="w-full h-9 px-3 border border-gray-300 rounded-md text-gray-900" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" value={editForm.phone ?? ''} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} className="w-full h-9 px-3 border border-gray-300 rounded-md text-gray-900" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Position</label>
                <input type="text" value={editForm.position ?? ''} onChange={e => setEditForm(f => ({ ...f, position: e.target.value }))} className="w-full h-9 px-3 border border-gray-300 rounded-md text-gray-900" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Message</label>
                <textarea value={editForm.message ?? ''} onChange={e => setEditForm(f => ({ ...f, message: e.target.value }))} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Foto</label>
                <div className="flex flex-col gap-2">
                  {(editForm.photoPath || selectedAlumni?.photoPath) && (
                    <div className="flex items-center gap-3">
                      <img src={(editForm.photoPath || selectedAlumni?.photoPath) ?? ''} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-gray-200" />
                      <span className="text-xs text-gray-500">Preview</span>
                    </div>
                  )}
                  <label className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer w-fit">
                    {uploadingPhoto ? <Loader2 className="w-4 h-4 animate-spin" /> : <Pencil className="w-4 h-4" />}
                    {uploadingPhoto ? 'Uploading...' : 'Ganti foto'}
                    <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleAlumniPhotoChange} disabled={uploadingPhoto} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Type</label>
                <select value={editForm.isNewData ? 'new' : 'update'} onChange={e => setEditForm(f => ({ ...f, isNewData: e.target.value === 'new' }))} className="w-full h-9 px-3 border border-gray-300 rounded-md text-gray-900">
                  <option value="new">New Data</option>
                  <option value="update">Update Data</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowEditModal(false)} className="h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm">Cancel</button>
              <button onClick={saveAlumniEdit} disabled={saving} className="h-8 px-4 bg-[#3C8C98] hover:bg-[#2d6b75] text-white font-medium rounded-md text-sm disabled:opacity-50 flex items-center gap-1.5">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200"><h2 className="text-base font-semibold text-gray-900">Delete Alumni</h2></div>
            <div className="p-4"><p className="text-sm text-gray-700">Delete <strong className="text-gray-900">{selectedAlumni?.name}</strong>?</p></div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowDeleteModal(false)} className="h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="h-8 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md text-sm transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}