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
  User,
  Briefcase,
  FileImage
} from 'lucide-react';

// Mock data untuk alumni
const alumniData = [
  {
    id: 1,
    name: 'Alshavira Putri',
    institution: 'Chevron Indonesia',
    email: 'alshavira.putri@chevron.com',
    position: 'Reservoir Engineer',
    message: 'Graduated from SPE UP SC program in 2019. Currently working in field development projects.',
    file: 'alshavira-photo.jpg',
    dateRegistered: '2026-01-20',
    graduationYear: '2019',
  },
  {
    id: 2,
    name: 'Bima Putra Adipratama',
    institution: 'Pertamina Hulu Energy',
    email: 'bima.adipratama@phe.pertamina.com',
    position: 'Drilling Engineer',
    message: 'Active member of SPE UP SC from 2017-2021. Passionate about drilling optimization.',
    file: 'bima-photo.jpg',
    dateRegistered: '2026-01-18',
    graduationYear: '2021',
  },
  {
    id: 3,
    name: 'Naufal Ferdiansha',
    institution: 'Schlumberger',
    email: 'naufal.ferdiansha@slb.com',
    position: 'Field Engineer',
    message: 'Thank you SPE UP SC for the amazing learning experience during my studies.',
    file: 'naufal-photo.jpg',
    dateRegistered: '2026-01-15',
    graduationYear: '2020',
  },
  {
    id: 4,
    name: 'Asyfa Defi Maharani',
    institution: 'Baker Hughes',
    email: 'asyfa.maharani@bakerhughes.com',
    position: 'Production Engineer',
    message: 'SPE UP SC helped shape my career in petroleum engineering.',
    file: null,
    dateRegistered: '2026-01-12',
    graduationYear: '2022',
  },
  {
    id: 5,
    name: 'Kenan Dipa Mahardika',
    institution: 'Total Energies',
    email: 'kenan.mahardika@totalenergies.com',
    position: 'Subsurface Engineer',
    message: 'Proud to be part of SPE UP SC alumni network.',
    file: 'kenan-photo.jpg',
    dateRegistered: '2026-01-10',
    graduationYear: '2021',
  },
];

const graduationYears = ['All Years', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function AlumniAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter alumni
  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'All Years' || alumni.graduationYear === selectedYear;

    return matchesSearch && matchesYear;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlumni = filteredAlumni.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'search') setSearchQuery(value);
    if (filterType === 'year') setSelectedYear(value);
  };

  const handleDelete = (alumni: any) => {
    setSelectedAlumni(alumni);
    setShowDeleteModal(true);
  };

  const handleViewDetail = (alumni: any) => {
    setSelectedAlumni(alumni);
    setShowDetailModal(true);
  };

  const handleEdit = (alumni: any) => {
    setSelectedAlumni(alumni);
    setShowEditModal(true);
  };

  const handleExportAll = () => {
    // Handle bulk export logic here - exports all filtered alumni
    console.log('Export all alumni:', filteredAlumni);
  };

  const confirmDelete = () => {
    console.log('Delete alumni:', selectedAlumni?.id);
    setShowDeleteModal(false);
    setSelectedAlumni(null);
  };

  return (
    <>
      {/* Header */}
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Alumni Management</h1>
          <p className="text-xs text-gray-500">{filteredAlumni.length} alumni records found</p>
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
              placeholder="Search by name, institution, position..."
              value={searchQuery}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={selectedYear}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              {graduationYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Alumni Table */}
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
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAlumni.length)} of {filteredAlumni.length} alumni
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Alumni</th>
                  <th className="text-left p-3 font-medium text-gray-700">Institution</th>
                  <th className="text-left p-3 font-medium text-gray-700">Position</th>
                  <th className="text-left p-3 font-medium text-gray-700">Year</th>
                  <th className="text-left p-3 font-medium text-gray-700">Date Registered</th>
                  <th className="text-left p-3 font-medium text-gray-700">Photo</th>
                  <th className="text-center p-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAlumni.map((alumni, index) => (
                  <tr key={alumni.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-gray-25'}`}>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-gray-900">{alumni.name}</p>
                        <p className="text-gray-500">{alumni.email}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{alumni.institution}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-900">
                        <Briefcase className="w-3 h-3 text-gray-400" />
                        <span>{alumni.position}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-gray-900">{alumni.graduationYear}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{alumni.dateRegistered}</span>
                      </div>
                    </td>

                    <td className="p-3">
                      {alumni.file ? (
                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                          <img
                            src={`/alumnae/alumanae/${alumni.file}`}
                            alt={alumni.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleViewDetail(alumni)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 rounded-md transition-all group"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600 group-hover:text-blue-700" />
                        </button>
                        <button
                          onClick={() => handleEdit(alumni)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md transition-all group"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-700" />
                        </button>
                        <button
                          onClick={() => handleDelete(alumni)}
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
        {filteredAlumni.length > 0 && totalPages > 1 && (
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
        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No alumni records found</h3>
            <p className="text-xs text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <p className="text-xs text-gray-500">Alumni data is managed automatically through the system.</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {showDetailModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Alumni Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Profile Section */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                    {selectedAlumni.file ? (
                      <img
                        src={`/alumnae/${selectedAlumni.file}`}
                        alt={selectedAlumni.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedAlumni.name}</h3>
                    <p className="text-sm text-gray-600">{selectedAlumni.position}</p>
                    <p className="text-sm text-gray-500">{selectedAlumni.institution}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Email</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedAlumni.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Graduation Year</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedAlumni.graduationYear}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Registration Date</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedAlumni.dateRegistered}</p>
                  </div>

                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Message</label>
                  <p className="text-xs text-gray-900 mt-1 leading-relaxed">{selectedAlumni.message}</p>
                </div>
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
      {showEditModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Edit Alumni</h2>
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
                    defaultValue={selectedAlumni.name}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedAlumni.email}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Institution</label>
                  <input
                    type="text"
                    defaultValue={selectedAlumni.institution}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    defaultValue={selectedAlumni.position}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Graduation Year</label>
                  <select
                    defaultValue={selectedAlumni.graduationYear}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {graduationYears.slice(1).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  defaultValue={selectedAlumni.message}
                  className="w-full h-24 p-3 text-xs border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
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
              <h2 className="text-sm font-semibold text-gray-900">Delete Alumni Record</h2>
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-600">
                Are you sure you want to delete the alumni record for <strong>{selectedAlumni?.name}</strong>? This action cannot be undone.
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