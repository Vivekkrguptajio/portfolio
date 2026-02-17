import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Plus, ExternalLink, ArrowLeft } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/projects');
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setProjects(projects.filter(p => p._id !== id));
                    alert('Project deleted successfully');
                } else {
                    alert('Failed to delete project');
                }
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#050614] transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Portfolio
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <button
                        onClick={() => navigate('/add/projects')}
                        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Plus size={20} className="mr-2" />
                        Add New Project
                    </button>
                </div>

                <div className="bg-white dark:bg-[#0a0a1a] rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-white/5">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 uppercase text-xs font-semibold">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Tech Stack</th>
                                <th className="p-4">Featured</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {projects.map(project => (
                                <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <img src={project.image} alt={project.title} className="w-16 h-12 object-cover rounded" />
                                    </td>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">{project.title}</td>
                                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                        {Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack}
                                    </td>
                                    <td className="p-4">
                                        {project.isFeatured ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Featured</span>
                                        ) : (
                                            <span className="text-gray-400 text-xs">-</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button
                                            onClick={() => navigate(`/edit/project/${project._id}`)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {projects.length === 0 && (
                        <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                            No projects found. Add one to get started!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
