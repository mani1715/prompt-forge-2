import api from './api';

export const noteService = {
  // Get all notes with optional search
  getAllNotes: async (searchQuery = '') => {
    const params = searchQuery ? { search: searchQuery } : {};
    const response = await api.get('/notes/', { params });
    return response.data;
  },

  // Get a single note
  getNote: async (noteId) => {
    const response = await api.get(`/notes/${noteId}`);
    return response.data;
  },

  // Create a new note
  createNote: async (noteData) => {
    const response = await api.post('/notes/', noteData);
    return response.data;
  },

  // Update a note
  updateNote: async (noteId, noteData) => {
    const response = await api.put(`/notes/${noteId}`, noteData);
    return response.data;
  },

  // Delete a note
  deleteNote: async (noteId) => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  },
};

export default noteService;
