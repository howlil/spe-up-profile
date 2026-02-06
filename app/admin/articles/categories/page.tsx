/** @format */

'use client';

import { useState } from 'react';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Tag,
    ArrowLeft,
    X
} from 'lucide-react';
import Link from 'next/link';

// Types
interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    articleCount: number;
    createdAt: string;
}

// Mock data untuk categories
const initialCategories: Category[] = [
    {
        id: 1,
        name: 'Technology',
        slug: 'technology',
        description: 'Articles about technological advancements in petroleum engineering',
        articleCount: 5,
        createdAt: '2026-01-01',
    },
    {
        id: 2,
        name: 'Research',
        slug: 'research',
        description: 'Academic research and scientific papers',
        articleCount: 3,
        createdAt: '2026-01-02',
    },
    {
        id: 3,
        name: 'Innovation',
        slug: 'innovation',
        description: 'Innovative approaches and new methodologies',
        articleCount: 2,
        createdAt: '2026-01-03',
    },
    {
        id: 4,
        name: 'Sustainability',
        slug: 'sustainability',
        description: 'Environmental sustainability and green energy transitions',
        articleCount: 4,
        createdAt: '2026-01-04',
    },
    {
        id: 5,
        name: 'Career Development',
        slug: 'career-development',
        description: 'Career guides and professional development resources',
        articleCount: 2,
        createdAt: '2026-01-05',
    },
    {
        id: 6,
        name: 'Academic',
        slug: 'academic',
        description: 'Academic content and educational materials',
        articleCount: 3,
        createdAt: '2026-01-06',
    },
];

export default function CategoriesAdmin() {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Filter categories
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    const handleAdd = () => {
        setFormData({ name: '', description: '' });
        setShowAddModal(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setFormData({
            name: category.name,
            description: category.description
        });
        setShowEditModal(true);
    };

    const handleDelete = (category: Category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const confirmAdd = () => {
        const newCategory: Category = {
            id: Math.max(...categories.map(c => c.id)) + 1,
            name: formData.name,
            slug: generateSlug(formData.name),
            description: formData.description,
            articleCount: 0,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setCategories([...categories, newCategory]);
        setShowAddModal(false);
        setFormData({ name: '', description: '' });
    };

    const confirmEdit = () => {
        if (!selectedCategory) return;
        setCategories(categories.map(c =>
            c.id === selectedCategory.id
                ? {
                    ...c,
                    name: formData.name,
                    slug: generateSlug(formData.name),
                    description: formData.description
                }
                : c
        ));
        setShowEditModal(false);
        setSelectedCategory(null);
        setFormData({ name: '', description: '' });
    };

    const confirmDelete = () => {
        if (!selectedCategory) return;
        setCategories(categories.filter(c => c.id !== selectedCategory.id));
        setShowDeleteModal(false);
        setSelectedCategory(null);
    };

    return (
        <>
            {/* Header */}
            <header className="h-14 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/articles"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-900">Category Management</h1>
                        <p className="text-xs text-gray-500">{filteredCategories.length} categories found</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleAdd}
                        className="h-8 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs flex items-center gap-1.5 transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        New Category
                    </button>
                </div>
            </header>

            {/* Search */}
            <div className="p-6 bg-white border-b border-gray-200">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Categories Table */}
            <main className="flex-1 overflow-auto p-6 bg-gray-50">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-3 font-medium text-gray-700 text-xs">Name</th>
                                <th className="text-left p-3 font-medium text-gray-700 text-xs">Slug</th>
                                <th className="text-left p-3 font-medium text-gray-700 text-xs">Description</th>
                                <th className="text-center p-3 font-medium text-gray-700 text-xs">Articles</th>
                                <th className="text-left p-3 font-medium text-gray-700 text-xs">Created</th>
                                <th className="text-center p-3 font-medium text-gray-700 text-xs">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-xs font-medium text-gray-900">{category.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <span className="text-xs text-gray-500">{category.slug}</span>
                                    </td>
                                    <td className="p-3">
                                        <span className="text-xs text-gray-600 line-clamp-1">{category.description}</span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className="text-xs text-gray-900">{category.articleCount}</span>
                                    </td>
                                    <td className="p-3">
                                        <span className="text-xs text-gray-500">{category.createdAt}</span>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="w-7 h-7 flex items-center justify-center hover:bg-amber-50 rounded-md transition-all group"
                                                title="Edit"
                                            >
                                                <Edit className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-700" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category)}
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

                    {/* Empty State */}
                    {filteredCategories.length === 0 && (
                        <div className="text-center py-12">
                            <Tag className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-sm font-medium text-gray-900 mb-1">No categories found</h3>
                            <p className="text-xs text-gray-500 mb-4">Try adjusting your search or create a new category</p>
                            <button
                                onClick={handleAdd}
                                className="h-8 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs flex items-center gap-1.5 mx-auto transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Create Category
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Add/Edit Modal */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">
                                {showAddModal ? 'Create New Category' : 'Edit Category'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                    setSelectedCategory(null);
                                }}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Category Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-9 px-3 text-xs text-gray-900 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                                    placeholder="e.g., Technology"
                                />
                                {formData.name && (
                                    <p className="text-xs text-gray-500 mt-1">Slug: {generateSlug(formData.name)}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full h-20 p-3 text-xs text-gray-900 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                                    placeholder="Brief description of this category..."
                                />
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setShowEditModal(false);
                                    setSelectedCategory(null);
                                }}
                                className="h-8 px-4 border border-gray-200 rounded-md hover:bg-gray-50 text-xs transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={showAddModal ? confirmAdd : confirmEdit}
                                disabled={!formData.name.trim()}
                                className="h-8 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {showAddModal ? 'Create Category' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedCategory && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-sm font-semibold text-gray-900">Delete Category</h2>
                        </div>

                        <div className="p-4">
                            <p className="text-xs text-gray-600">
                                Are you sure you want to delete <strong>{selectedCategory.name}</strong>?
                                {selectedCategory.articleCount > 0 && (
                                    <span className="text-amber-600 block mt-2">
                                        Warning: This category has {selectedCategory.articleCount} articles associated with it.
                                    </span>
                                )}
                            </p>
                        </div>

                        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedCategory(null);
                                }}
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
