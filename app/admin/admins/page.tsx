/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Plus, Edit, Trash2, Eye, Shield, Calendar, User, Clock, Download, Loader2
} from 'lucide-react';

interface Admin {
  id: string;
  name: string | null;
  email: string;
  role: 'SUPERADMIN' | 'WRITER' | 'EXTERNAL';
  createdAt: string;
  updatedAt: string;
}

export default function AdminsManagement() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', role: 'WRITER' });
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '', role: 'WRITER' });

  const roles = ['All Roles', 'SUPERADMIN', 'WRITER', 'EXTERNAL'];

  useEffect(() => { fetchAdmins(); }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      if (res.status === 401) {
        router.push('/login?redirect=/admin/admins');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setAdmins(data.users || []);
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = (admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || admin.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleDelete = (admin: Admin) => { setSelectedAdmin(admin); setShowDeleteModal(true); };
  const handleViewDetail = (admin: Admin) => { setSelectedAdmin(admin); setShowDetailModal(true); };
  const handleEdit = (admin: Admin) => {
    if (admin.role === 'SUPERADMIN') return;
    setSelectedAdmin(admin);
    setEditForm({ name: admin.name || '', email: admin.email, password: '', role: admin.role });
    setShowEditModal(true);
  };
  const handleCreate = () => {
    setCreateForm({ name: '', email: '', password: '', role: 'WRITER' });
    setShowCreateModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedAdmin) return;
    try {
      const res = await fetch(`/api/users/${selectedAdmin.id}`, { method: 'DELETE' });
      if (res.ok) {
        setAdmins(admins.filter(a => a.id !== selectedAdmin.id));
        setShowDeleteModal(false);
      }
    } catch (error) { console.error('Delete failed:', error); }
  };

  const handleSaveEdit = async () => {
    if (!selectedAdmin) return;
    setSaving(true);
    try {
      const payload: { name: string; email: string; role: string; password?: string } = { name: editForm.name, email: editForm.email, role: editForm.role };
      if (editForm.password && editForm.password.length >= 6) payload.password = editForm.password;
      const res = await fetch(`/api/users/${selectedAdmin.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchAdmins();
        setShowEditModal(false);
      }
    } catch (error) { console.error('Update failed:', error); }
    finally { setSaving(false); }
  };

  const handleCreateSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm)
      });
      if (res.ok) {
        await fetchAdmins();
        setShowCreateModal(false);
      }
    } catch (error) { console.error('Create failed:', error); }
    finally { setSaving(false); }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPERADMIN': return 'bg-violet-100 text-violet-800';
      case 'WRITER': return 'bg-blue-100 text-blue-800';
      case 'EXTERNAL': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <>
      <header className="h-auto min-h-14 px-4 py-3 sm:px-6 bg-white border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Admin Management</h1>
          <p className="text-xs text-gray-500">{filteredAdmins.length} admin users</p>
        </div>
        <button onClick={handleCreate} className="h-9 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4 flex-shrink-0" />New Admin
        </button>
      </header>

      <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
          </div>
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
            className="h-10 px-3 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-auto w-full">
            {roles.map(r => <option key={r} value={r} className="text-gray-900">{r}</option>)}
          </select>
        </div>
      </div>

      <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50 min-h-0">
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <table className="w-full text-xs min-w-[520px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Admin</th>
                <th className="text-left p-3 font-medium text-gray-700">Role</th>
                <th className="text-left p-3 font-medium text-gray-700">Created</th>
                <th className="text-center p-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map(admin => (
                <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{admin.name || 'No name'}</p>
                        <p className="text-gray-500">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadge(admin.role)}`}>{admin.role}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(admin.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleViewDetail(admin)} className="w-7 h-7 flex items-center justify-center hover:bg-blue-50 rounded-md"><Eye className="w-3.5 h-3.5 text-blue-600" /></button>
                      {admin.role !== 'SUPERADMIN' && (
                        <button onClick={() => handleEdit(admin)} className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md" title="Edit"><Edit className="w-3.5 h-3.5 text-amber-600" /></button>
                      )}
                      {admin.role !== 'SUPERADMIN' && (
                        <button onClick={() => handleDelete(admin)} className="w-7 h-7 flex items-center justify-center hover:bg-red-50 rounded-md"><Trash2 className="w-3.5 h-3.5 text-red-600" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAdmins.length === 0 && <div className="text-center py-12"><Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" /><p className="text-sm text-gray-500">No admins found</p></div>}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-900">Create Admin</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700 text-lg font-semibold">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Name</label>
                <input type="text" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="w-full h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Email</label>
                <input type="email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="w-full h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Password</label>
                <input type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Role</label>
                <select value={createForm.role} onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                  className="w-full h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="WRITER" className="text-gray-900">Writer</option>
                  <option value="EXTERNAL" className="text-gray-900">External</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowCreateModal(false)} className="h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm transition-colors">Cancel</button>
              <button onClick={handleCreateSubmit} disabled={saving} className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm disabled:opacity-50 transition-colors">
                {saving ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-900">Admin Details</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700 text-lg font-semibold">✕</button>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <p><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{selectedAdmin.name || '-'}</span></p>
              <p><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-900">{selectedAdmin.email}</span></p>
              <p><span className="font-semibold text-gray-700">Role:</span> <span className="text-gray-900">{selectedAdmin.role}</span></p>
              <p><span className="font-semibold text-gray-700">Created:</span> <span className="text-gray-900">{new Date(selectedAdmin.createdAt).toLocaleString()}</span></p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end"><button onClick={() => setShowDetailModal(false)} className="h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm transition-colors">Close</button></div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-900">Edit Admin</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700 text-lg font-semibold">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Name</label>
                <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Email</label>
                <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">New password (kosongkan jika tidak diubah)</label>
                <input type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                  placeholder="Min. 6 karakter"
                  className="w-full h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Role</label>
                <select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full h-9 px-3 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="WRITER" className="text-gray-900">Writer</option>
                  <option value="EXTERNAL" className="text-gray-900">External</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowEditModal(false)} className="h-8 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm transition-colors">Cancel</button>
              <button onClick={handleSaveEdit} disabled={saving} className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm disabled:opacity-50 transition-colors">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200"><h2 className="text-base font-semibold text-gray-900">Delete Admin</h2></div>
            <div className="p-4"><p className="text-sm text-gray-700">Delete <strong className="text-gray-900">{selectedAdmin?.name || selectedAdmin?.email}</strong>?</p></div>
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