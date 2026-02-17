/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Link } from 'lucide-react';
import API_BASE_URL from '../config';

const AddProject = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Use FormData for file upload
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('techStack', formData.techStack);
            submitData.append('liveLink', formData.liveLink);
            submitData.append('githubLink', formData.githubLink);
            submitData.append('isFeatured', formData.isFeatured);

            if (uploadType === 'file' && imageFile) {
                submitData.append('imageFile', imageFile);
                // We still need to send 'image' field as empty string or something if backend expects it via body, 
                // but our backend logic handles req.file priority. 
                // However, let's append image as empty string to match schema if validation is strict on body only.
                // Actually backend checks req.file OR req.body.image.
                submitData.append('image', '');
            } else {
                submitData.append('image', formData.image);
            }

            const response = await fetch(`${API_BASE_URL}/api/projects`, {
                method: 'POST',
                // No Content-Type header needed, browser sets it with boundary for FormData
                body: submitData
            });

            if (response.ok) {
                alert('Project added successfully!');
                navigate('/');
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Server error, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#050614] transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Portfolio
                </button>

                <div className="bg-white dark:bg-[#0a0a1a] rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-white/5">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Add New Project</h1>

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
                                placeholder="e.g. E-Commerce Platform"
                            />
                        </div>

                        {/* Description */}
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
                                placeholder="Project description..."
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
                                    required={uploadType === 'url'}
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="https://example.com/image.jpg"
                                />
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-white/10 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                required={uploadType === 'file'}
                                            />
                                        </label>
                                    </div>
                                    {imagePreview && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => { setImageFile(null); setImagePreview(null); }}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <div className="sr-only">Remove</div>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
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
                                placeholder="React, Node.js, MongoDB"
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
                                    placeholder="https://"
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
                                    placeholder="https://"
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
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <Save size={20} className="mr-2" />
                                        Save Project
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
