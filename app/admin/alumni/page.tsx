/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Trash2, Eye, Download, User, Loader2, Building, Phone, FileText
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

export default function AlumniAdmin() {
  const router = useRouter();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Alumni Management</h1>
          <p className="text-xs text-gray-500">{filteredAlumni.length} records</p>
        </div>
        <button onClick={() => window.open('/api/alumni/export', '_blank')} className="h-9 px-4 border border-emerald-300 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium flex items-center gap-1.5 hover:bg-emerald-100 transition-colors">
          <Download className="w-4 h-4" />Export
        </button>
      </header>

      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search by name, email, or institution..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full h-10 pl-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-xs">
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
                      <button onClick={() => handleViewDetail(a)} className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 rounded-md"><Eye className="w-3.5 h-3.5 text-blue-600" /></button>
                      <button onClick={() => handleDelete(a)} className="w-7 h-7 flex items-center justify-center hover:bg-red-50 rounded-md"><Trash2 className="w-3.5 h-3.5 text-red-600" /></button>
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