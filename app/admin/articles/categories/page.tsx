/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Edit, Trash2, Tag, ArrowLeft, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Category {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    _count?: { articles: number };
}

export default function CategoriesAdmin() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => { fetchCategories(); }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/articles/categories');
            if (res.status === 401) {
                router.push('/login?redirect=/admin/articles/categories');
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setCategories(data.categories || []);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const handleAdd = () => { setFormData({ name: '' }); setShowAddModal(true); };
    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setFormData({ name: category.name });
        setShowEditModal(true);
    };
    const handleDelete = (category: Category) => { setSelectedCategory(category); setShowDeleteModal(true); };

    const confirmAdd = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/articles/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.name, slug: generateSlug(formData.name) })
            });
            if (res.ok) {
                await fetchCategories();
                setShowAddModal(false);
            }
        } catch (error) { console.error('Create failed:', error); }
        finally { setSaving(false); }
    };

    const confirmEdit = async () => {
        if (!selectedCategory) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/articles/categories?id=${selectedCategory.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.name, slug: generateSlug(formData.name) })
            });
            if (res.ok) {
                await fetchCategories();
                setShowEditModal(false);
            }
        } catch (error) { console.error('Update failed:', error); }
        finally { setSaving(false); }
    };

    const confirmDelete = async () => {
        if (!selectedCategory) return;
        try {
            const res = await fetch(`/api/articles/categories?id=${selectedCategory.id}`, { method: 'DELETE' });
            if (res.ok) {
                setCategories(categories.filter(c => c.id !== selectedCategory.id));
                setShowDeleteModal(false);
            }
        } catch (error) { console.error('Delete failed:', error); }
    };

    if (loading) return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

    return (
        <>
            <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/articles" className="text-gray-600 hover:text-gray-900"><ArrowLeft className="w-4 h-4" /></Link>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-900">Category Management</h1>
                        <p className="text-xs text-gray-500">{filteredCategories.length} categories</p>
                    </div>
                </div>
                <button onClick={handleAdd} className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors">
                    <Plus className="w-4 h-4" />New Category
                </button>
            </header>

            <div className="p-6 bg-white border-b border-gray-200">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
                </div>
            </div>

            <main className="flex-1 overflow-auto p-6 bg-gray-50">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-3 font-medium text-gray-700 text-xs">Name</th>
                                <th className="text-left p-3 font-medium text-gray-700 text-xs">Slug</th>
                                <th className="text-center p-3 font-medium text-gray-700 text-xs">Articles</th>
                                <th className="text-center p-3 font-medium text-gray-700 text-xs">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map(category => (
                                <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-xs font-medium text-gray-900">{category.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3"><span className="text-xs text-gray-500">{category.slug}</span></td>
                                    <td className="p-3 text-center"><span className="text-xs text-gray-900">{category._count?.articles || 0}</span></td>
                                    <td className="p-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <button onClick={() => handleEdit(category)} className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md"><Edit className="w-3.5 h-3.5 text-amber-600" /></button>
                                            <button onClick={() => handleDelete(category)} className="w-7 h-7 flex items-center justify-center hover:bg-red-50 rounded-md"><Trash2 className="w-3.5 h-3.5 text-red-600" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredCategories.length === 0 && <div className="text-center py-12"><Tag className="w-10 h-10 text-gray-400 mx-auto mb-3" /><p className="text-sm text-gray-500">No categories found</p></div>}
                </div>
            </main>

            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-base font-semibold text-gray-900">{showAddModal ? 'Create Category' : 'Edit Category'}</h2>
                            <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Name <span className="text-red-500">*</span></label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-10 px-3 text-sm text-gray-900 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" placeholder="e.g., Technology" />
                                {formData.name && <p className="text-sm text-gray-600 mt-1">Slug: <span className="text-gray-900 font-medium">{generateSlug(formData.name)}</span></p>}
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
                            <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="h-9 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm transition-colors">Cancel</button>
                            <button onClick={showAddModal ? confirmAdd : confirmEdit} disabled={!formData.name.trim() || saving} className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm disabled:opacity-50 transition-colors">
                                {saving ? 'Saving...' : (showAddModal ? 'Create' : 'Save')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && selectedCategory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                        <div className="p-4 border-b border-gray-200"><h2 className="text-base font-semibold text-gray-900">Delete Category</h2></div>
                        <div className="p-4"><p className="text-sm text-gray-700">Delete <strong className="text-gray-900">{selectedCategory.name}</strong>?</p></div>
                        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
                            <button onClick={() => setShowDeleteModal(false)} className="h-9 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 rounded-md text-sm transition-colors">Cancel</button>
                            <button onClick={confirmDelete} className="h-9 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md text-sm transition-colors">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
