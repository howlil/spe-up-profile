/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Trash2, Eye, Download, Calendar, Building, Loader2, Shield
} from 'lucide-react';

interface Partnership {
  id: string;
  name: string;
  institution: string;
  email: string;
  subject: string;
  message: string;
  filePath: string | null;
  nda: boolean;
  createdAt: string;
}

export default function PartnershipsAdmin() {
  const router = useRouter();
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => { fetchPartnerships(); }, []);

  const fetchPartnerships = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/partnerships');
      if (res.status === 401) {
        router.push('/login?redirect=/admin/partnerships');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPartnerships(data.partnerships || []);
      }
    } catch (error) {
      console.error('Failed to fetch partnerships:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPartnerships = partnerships.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredPartnerships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPartnerships = filteredPartnerships.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (p: Partnership) => { setSelectedPartnership(p); setShowDeleteModal(true); };
  const handleViewDetail = (p: Partnership) => { setSelectedPartnership(p); setShowDetailModal(true); };

  const confirmDelete = async () => {
    if (!selectedPartnership) return;
    try {
      const res = await fetch(`/api/partnerships/${selectedPartnership.id}`, { method: 'DELETE' });
      if (res.ok) {
        setPartnerships(partnerships.filter(p => p.id !== selectedPartnership.id));
        setShowDeleteModal(false);
      }
    } catch (error) { console.error('Delete failed:', error); }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <>
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Partnership Management</h1>
          <p className="text-xs text-gray-500">{filteredPartnerships.length} applications</p>
        </div>
        <button onClick={() => window.open('/api/partnerships/export', '_blank')} className="h-9 px-4 border border-emerald-300 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium flex items-center gap-1.5 hover:bg-emerald-100 transition-colors">
          <Download className="w-4 h-4" />Export
        </button>
      </header>

      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search by name, institution, subject..." value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 pl-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
        </div>
      </div>

      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Name</th>
                <th className="text-left p-3 font-medium text-gray-700">Institution</th>
                <th className="text-left p-3 font-medium text-gray-700">Subject</th>
                <th className="text-left p-3 font-medium text-gray-700">NDA</th>
                <th className="text-left p-3 font-medium text-gray-700">Date</th>
                <th className="text-center p-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPartnerships.map(p => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <p className="text-gray-500">{p.email}</p>
                  </td>
                  <td className="p-3"><span className="text-gray-900">{p.institution}</span></td>
                  <td className="p-3"><span className="text-gray-900">{p.subject}</span></td>
                  <td className="p-3">
                    {p.nda ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <Shield className="w-3 h-3" /> Yes
                      </span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleViewDetail(p)} className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 rounded-md"><Eye className="w-3.5 h-3.5 text-blue-600" /></button>
                      <button onClick={() => handleDelete(p)} className="w-7 h-7 flex items-center justify-center hover:bg-red-50 rounded-md"><Trash2 className="w-3.5 h-3.5 text-red-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPartnerships.length === 0 && <div className="text-center py-12"><Building className="w-12 h-12 text-gray-400 mx-auto mb-4" /><p className="text-sm text-gray-500">No partnerships found</p></div>}
      </main>

      {showDetailModal && selectedPartnership && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-900">Partnership Details</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700 text-lg font-semibold">✕</button>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <p><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{selectedPartnership.name}</span></p>
              <p><span className="font-semibold text-gray-700">Institution:</span> <span className="text-gray-900">{selectedPartnership.institution}</span></p>
              <p><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-900">{selectedPartnership.email}</span></p>
              <p><span className="font-semibold text-gray-700">Subject:</span> <span className="text-gray-900">{selectedPartnership.subject}</span></p>
              <p><span className="font-semibold text-gray-700">Message:</span> <span className="text-gray-900">{selectedPartnership.message}</span></p>
              <p><span className="font-semibold text-gray-700">NDA:</span> <span className="text-gray-900">{selectedPartnership.nda ? 'Yes' : 'No'}</span></p>
              {selectedPartnership.filePath && (
                <p><span className="font-semibold text-gray-700">Attachment:</span>{' '}
                  <a href={selectedPartnership.filePath} target="_blank" rel="noopener noreferrer" className="text-[#bf1e2e] hover:underline">
                    View File
                  </a>
                </p>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end"><button onClick={() => setShowDetailModal(false)} className="h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm transition-colors">Close</button></div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200"><h2 className="text-base font-semibold text-gray-900">Delete Partnership</h2></div>
            <div className="p-4"><p className="text-sm text-gray-700">Delete partnership request from <strong className="text-gray-900">{selectedPartnership?.name}</strong> ({selectedPartnership?.institution})?</p></div>
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