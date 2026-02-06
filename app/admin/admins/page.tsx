/** @format */

'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  Calendar,
  Mail,
  User,
  Key,
  Clock,
  Download
} from 'lucide-react';

// Type definition for Admin
interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  dateCreated: string;
  status: string;
  permissions: string[];
}

// Mock data untuk admin users
const adminsData: Admin[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@speupsc.com',
    role: 'super_admin',
    lastLogin: '2026-01-22 08:30:00',
    dateCreated: '2025-06-15',
    status: 'active',
    permissions: ['articles', 'partnerships', 'alumni', 'admin_management'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@speupsc.com',
    role: 'admin',
    lastLogin: '2026-01-21 16:45:00',
    dateCreated: '2025-08-20',
    status: 'active',
    permissions: ['articles', 'partnerships', 'alumni'],
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.johnson@speupsc.com',
    role: 'editor',
    lastLogin: '2026-01-20 14:20:00',
    dateCreated: '2025-10-10',
    status: 'active',
    permissions: ['articles'],
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@speupsc.com',
    role: 'admin',
    lastLogin: '2026-01-15 10:15:00',
    dateCreated: '2025-09-05',
    status: 'inactive',
    permissions: ['partnerships', 'alumni'],
  },
];

const roles = ['All Roles', 'super_admin', 'admin', 'editor'];

export default function AdminsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter admins
  const filteredAdmins = adminsData.filter(admin => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || admin.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAdmins = filteredAdmins.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'search') setSearchQuery(value);
    if (filterType === 'role') setSelectedRole(value);
  };

  const handleDelete = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const handleViewDetail = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowDetailModal(true);
  };

  const handleEdit = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowEditModal(true);
  };

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleExportAll = () => {
    // Handle bulk export logic here - exports all filtered admins
    console.log('Export all admins:', filteredAdmins);
  };

  const confirmDelete = () => {
    console.log('Delete admin:', selectedAdmin?.id);
    setShowDeleteModal(false);
    setSelectedAdmin(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'inactive':
        return 'bg-slate-100 text-slate-700 border border-slate-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-violet-100 text-violet-800 border border-violet-200';
      case 'admin':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'editor':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const formatRole = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <>
      {/* Header */}
      <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Admin Management</h1>
          <p className="text-xs text-gray-500">{filteredAdmins.length} admin users found</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAll}
            className="h-8 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100 hover:border-emerald-300 text-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export All
          </button>

          <button
            onClick={handleCreate}
            className="h-8 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm text-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            New Admin
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
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={selectedRole}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Admins Table */}
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
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAdmins.length)} of {filteredAdmins.length} admins
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">Admin</th>
                  <th className="text-left p-3 font-medium text-gray-700">Role</th>
                  <th className="text-left p-3 font-medium text-gray-700">Last Login</th>
                  <th className="text-left p-3 font-medium text-gray-700">Created</th>
                  <th className="text-left p-3 font-medium text-gray-700">Status</th>
                  <th className="text-left p-3 font-medium text-gray-700">Permissions</th>
                  <th className="text-center p-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAdmins.map((admin, index) => (
                  <tr key={admin.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-gray-25'}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{admin.name}</p>
                          <p className="text-gray-500">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`h-4 px-2 text-xs rounded-full ${getRoleBadge(admin.role)}`}>
                        {formatRole(admin.role)}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{admin.lastLogin}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{admin.dateCreated}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`h-4 px-2 text-xs rounded-full ${getStatusBadge(admin.status)}`}>
                        {formatStatus(admin.status)}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.slice(0, 2).map((permission) => (
                          <span key={permission} className="h-4 px-1.5 text-xs bg-gray-100 text-gray-600 rounded">
                            {permission.replace('_', ' ')}
                          </span>
                        ))}
                        {admin.permissions.length > 2 && (
                          <span className="h-4 px-1.5 text-xs bg-gray-100 text-gray-600 rounded">
                            +{admin.permissions.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleViewDetail(admin)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 rounded-md transition-all group"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600 group-hover:text-blue-700" />
                        </button>
                        <button
                          onClick={() => handleEdit(admin)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md transition-all group"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-700" />
                        </button>
                        <button
                          className="w-7 h-7 flex items-center justify-center hover:bg-emerald-50 rounded-md transition-all group"
                          title="Reset Password"
                        >
                          <Key className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-700" />
                        </button>
                        <button
                          onClick={() => handleDelete(admin)}
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
        {filteredAdmins.length > 0 && totalPages > 1 && (
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
        {filteredAdmins.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No admin users found</h3>
            <p className="text-xs text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={handleCreate}
              className="h-8 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs flex items-center gap-1.5 mx-auto transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Admin
            </button>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Create New Admin</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-all"
              >
                ✕
              </button>
            </div>

            <form className="p-4 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Role *</label>
                  <select
                    required
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    required
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Permissions *</label>
                <div className="grid grid-cols-2 gap-2">
                  {['articles', 'partnerships', 'alumni', 'admin_management'].map((permission) => (
                    <label key={permission} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-700 capitalize">{permission.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="h-8 px-4 border border-gray-200 rounded-md hover:bg-gray-50 text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-8 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs transition-all"
              >
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Admin Details</h2>
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
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedAdmin.name}</h3>
                    <span className={`inline-block h-4 px-2 text-xs rounded-full ${getRoleBadge(selectedAdmin.role)}`}>
                      {formatRole(selectedAdmin.role)}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Email</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedAdmin.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Status</label>
                    <span className={`inline-block h-4 px-2 text-xs rounded-full mt-1 ${getStatusBadge(selectedAdmin.status)}`}>
                      {formatStatus(selectedAdmin.status)}
                    </span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Last Login</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedAdmin.lastLogin}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Created Date</label>
                    <p className="text-xs text-gray-900 mt-1">{selectedAdmin.dateCreated}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Permissions</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedAdmin.permissions.map((permission) => (
                      <span key={permission} className="h-4 px-2 text-xs bg-blue-100 text-blue-700 rounded">
                        {permission.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
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
              <button
                onClick={() => handleEdit(selectedAdmin)}
                className="h-8 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs transition-all flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Edit Admin</h2>
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
                    defaultValue={selectedAdmin.name}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedAdmin.email}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Role</label>
                  <select
                    defaultValue={selectedAdmin.role}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                  <select
                    defaultValue={selectedAdmin.status}
                    className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {['articles', 'partnerships', 'alumni', 'admin_management'].map((permission) => (
                    <label key={permission} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={selectedAdmin.permissions.includes(permission)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-700 capitalize">{permission.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Leave empty to keep current password"
                  className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to keep current password</p>
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
              <h2 className="text-sm font-semibold text-gray-900">Delete Admin User</h2>
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-600">
                Are you sure you want to delete admin user <strong>{selectedAdmin?.name}</strong>? This action cannot be undone and will revoke all their access.
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
                Delete Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}