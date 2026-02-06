/** @format */

'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
  MoreHorizontal,
  Calendar,
  Building,
  Mail,
  FileText,
  Paperclip
} from 'lucide-react';

// Mock data untuk partnerships
const partnershipsData = [
  {
    id: 1,
    name: 'Dr. Ahmad Wijaya',
    institution: 'Pertamina Hulu Energy',
    email: 'ahmad.wijaya@phe.pertamina.com',
    subject: 'Research Collaboration Proposal',
    message: 'We would like to propose a research collaboration on enhanced oil recovery techniques...',
    file: 'partnership-proposal-phe.pdf',
    dateSubmitted: '2026-01-20',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    institution: 'Schlumberger Indonesia',
    email: 'sarah.johnson@slb.com',
    subject: 'Guest Lecture Opportunity',
    message: 'We are interested in providing guest lectures on modern drilling technologies...',
    file: null,
    dateSubmitted: '2026-01-18',
  },
  {
    id: 3,
    name: 'Michael Chen',
    institution: 'Baker Hughes',
    email: 'm.chen@bakerhughes.com',
    subject: 'Internship Program Partnership',
    message: 'Baker Hughes would like to establish an internship program for SPE students...',
    file: 'internship-program-outline.pdf',
    dateSubmitted: '2026-01-15',
  },
  {
    id: 4,
    name: 'Lisa Rodriguez',
    institution: 'Chevron Indonesia',
    email: 'lisa.rodriguez@chevron.com',
    subject: 'Equipment Donation',
    message: 'We have surplus laboratory equipment that we would like to donate to SPE UP SC...',
    file: 'equipment-list.xlsx',
    dateSubmitted: '2026-01-12',
  },
];

export default function PartnershipsAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter partnerships
  const filteredPartnerships = partnershipsData.filter(partnership => {
    const matchesSearch =
      partnership.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partnership.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partnership.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partnership.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPartnerships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPartnerships = filteredPartnerships.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleDelete = (partnership: any) => {
    setSelectedPartnership(partnership);
    setShowDeleteModal(true);
  };

  const handleViewDetail = (partnership: any) => {
    setSelectedPartnership(partnership);
    setShowDetailModal(true);
  };

  const handleEdit = (partnership: any) => {
    setSelectedPartnership(partnership);
    setShowEditModal(true);
  };

  const handleExportAll = () => {
    // Handle bulk export logic here - exports all filtered partnerships
    console.log('Export all partnerships:', filteredPartnerships);
  };

  const confirmDelete = () => {
    console.log('Delete partnership:', selectedPartnership?.id);
    setShowDeleteModal(false);
    setSelectedPartnership(null);
  };

  return (
    <>
      {/* Header */}
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Partnership Management</h1>
          <p className="text-xs text-gray-500">{filteredPartnerships.length} applications found</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAll}
            className="h-8 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100 hover:border-emerald-300 text-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export All
          </button>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, institution, subject..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Partnerships Table */}
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        {/* Items per page selector */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-8 px-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>items per page</span>
          </div>
          <div className="text-xs text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPartnerships.length)} of {filteredPartnerships.length} partnerships
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Applicant</th>
                  <th className="text-left p-3 font-medium text-gray-700">Institution</th>
                  <th className="text-left p-3 font-medium text-gray-700">Subject</th>
                  <th className="text-left p-3 font-medium text-gray-700">Date</th>
                  <th className="text-left p-3 font-medium text-gray-700">File</th>
                  <th className="text-center p-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPartnerships.map((partnership, index) => (
                  <tr key={partnership.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-gray-25'}`}>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-gray-900">{partnership.name}</p>
                        <p className="text-gray-500">{partnership.email}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{partnership.institution}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="text-gray-900 line-clamp-2 max-w-xs">{partnership.subject}</p>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{partnership.dateSubmitted}</span>
                      </div>
                    </td>

                    <td className="p-3">
                      {partnership.file ? (
                        <button className="flex items-center gap-1 text-blue-600 hover:underline">
                          <Paperclip className="w-3 h-3" />
                          <span className="max-w-20 truncate">{partnership.file}</span>
                        </button>
                      ) : (
                        <span className="text-gray-400">No file</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleViewDetail(partnership)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 rounded-md transition-all group"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600 group-hover:text-blue-700" />
                        </button>
                        <button
                          onClick={() => handleEdit(partnership)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md transition-all group"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-700" />
                        </button>
                        <button
                          onClick={() => handleDelete(partnership)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-red-50 rounded-md transition-all group"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-600 group-hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredPartnerships.length > 0 && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3 text-xs border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-8 w-8 text-xs rounded-md transition-all ${currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-8 px-3 text-xs border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>

            <div className="text-xs text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPartnerships.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No partnership applications found</h3>
            <p className="text-xs text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {showDetailModal && selectedPartnership && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Partnership Application Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Name</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedPartnership.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Institution</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedPartnership.institution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Email</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedPartnership.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Date Submitted</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedPartnership.dateSubmitted}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Subject</label>
                  <p className="text-xs text-gray-900 mt-1">{selectedPartnership.subject}</p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Message</label>
                  <p className="text-xs text-gray-900 mt-1 leading-relaxed">{selectedPartnership.message}</p>
                </div>


                {selectedPartnership.file && (
                  <div>
                    <label className="text-xs font-medium text-gray-700">Attachment</label>
                    <div className="mt-1">
                      <button className="flex items-center gap-2 text-blue-600 hover:underline text-xs">
                        <Paperclip className="w-3 h-3" />
                        {selectedPartnership.file}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowDetailModal(false)}
                className="h-8 px-4 border border-gray-200 rounded-md hover:bg-gray-50 text-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedPartnership && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Edit Partnership Application</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-all"
              >
                ✕
              </button>
            </div>

            <form className="p-4 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={selectedPartnership.name}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Institution</label>
                  <input
                    type="text"
                    defaultValue={selectedPartnership.institution}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedPartnership.email}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  defaultValue={selectedPartnership.subject}
                  className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  defaultValue={selectedPartnership.message}
                  className="w-full h-24 p-3 text-xs border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Attachment</label>
                <input
                  type="file"
                  className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {selectedPartnership.file && (
                  <p className="text-xs text-gray-500 mt-1">Current file: {selectedPartnership.file}</p>
                )}
              </div>
            </form>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="h-8 px-4 border border-gray-200 rounded-md hover:bg-gray-50 text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-8 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Delete Partnership Application</h2>
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-600">
                Are you sure you want to delete this partnership application from <strong>{selectedPartnership?.name}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="h-8 px-4 border border-gray-200 rounded-md hover:bg-gray-50 text-xs transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="h-8 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}