/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Link } from 'lucide-react';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        techStack: '',
        liveLink: '',
        githubLink: '',
        isFeatured: false
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/projects`);
                // Ideally backend should have /api/projects/:id GET endpoint, but simplistic list fetch works for now
                // Wait, server.js doesn't hav GET by ID. I added PUT/DELETE. 
                // I should add GET /:id or just filter from all. Filtering is fine for small portfolio.
                // Actually, efficient way: GET all and find. 

                // Correction: Let's fetch all and filter.
                if (response.ok) {
                    const data = await response.json();
                    const project = data.find(p => p._id === id);
                    if (project) {
                        setFormData({
                            title: project.title,
                            description: project.description,
                            image: project.image,
                            techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack,
                            liveLink: project.liveLink || '',
                            githubLink: project.githubLink || '',
                            isFeatured: project.isFeatured || false
                        });
                        setImagePreview(project.image);
                        if (project.image.includes('/uploads/')) {
                            setUploadType('file'); // Assume file if local path
                            // But for editing, we default to showing URL unless changed
                        } else {
                            setUploadType('url');
                        }
                    } else {
                        alert('Project not found');
                        navigate('/admin');
                    }
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setFetching(false);
            }
        };
        fetchProject();
    }, [id, navigate]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('techStack', formData.techStack);
            submitData.append('liveLink', formData.liveLink);
            submitData.append('githubLink', formData.githubLink);
            submitData.append('isFeatured', formData.isFeatured);

            if (uploadType === 'file' && imageFile) {
                submitData.append('imageFile', imageFile);
                submitData.append('image', '');
            } else {
                submitData.append('image', formData.image);
            }

            const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'PUT',
                body: submitData
            });

            if (response.ok) {
                alert('Project updated successfully!');
                navigate('/admin');
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Server error, please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-center py-20">Loading project details...</div>;

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#050614] transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Dashboard
                </button>

                <div className="bg-white dark:bg-[#0a0a1a] rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-white/5">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Project</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        {/* Description with Word Limit */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
                                <span className={`text-xs ${formData.description.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {formData.description.length}/500
                                </span>
                            </div>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                maxLength={500}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                            ></textarea>
                        </div>

                        {/* Image Selection Toggle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Image *</label>
                            <div className="flex space-x-4 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setUploadType('url')}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${uploadType === 'url'
                                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/30 border'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <Link size={16} className="mr-2" />
                                    Image URL
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUploadType('file')}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${uploadType === 'file'
                                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/30 border'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <Upload size={16} className="mr-2" />
                                    Upload File
                                </button>
                            </div>

                            {uploadType === 'url' ? (
                                <input
                                    type="url"
                                    name="image"
                                    readOnly={uploadType === 'file'} // Prevent editing if file mode selected roughly
                                    required={uploadType === 'url'}
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                    />
                                    {imagePreview && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech Stack (comma separated) *</label>
                            <input
                                type="text"
                                name="techStack"
                                required
                                value={formData.techStack}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live Demo Link</label>
                                <input
                                    type="url"
                                    name="liveLink"
                                    value={formData.liveLink}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub Repository</label>
                                <input
                                    type="url"
                                    name="githubLink"
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                id="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                Feature this project (Show at Top)
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                            >
                                {loading ? 'Updating...' : 'Update Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProject;
