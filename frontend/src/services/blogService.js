import api from './api';

// Public blog endpoints
export const getPublishedBlogs = async () => {
  const response = await api.get('/blogs/');
  return response.data;
};

export const getBlogBySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};

// Admin blog endpoints
export const getAllBlogs = async () => {
  const response = await api.get('/blogs/admin/all');
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await api.post('/blogs/admin/create', blogData);
  return response.data;
};

export const updateBlog = async (blogId, blogData) => {
  const response = await api.put(`/blogs/admin/${blogId}`, blogData);
  return response.data;
};

export const deleteBlog = async (blogId) => {
  const response = await api.delete(`/blogs/admin/${blogId}`);
  return response.data;
};
