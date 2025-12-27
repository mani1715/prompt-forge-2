import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  authService,
  pageService,
  serviceService,
  projectService,
  contactService,
  settingsService,
  adminService
} from '../../services';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({
    pagesContent: {},
    services: [],
    projects: [],
    contacts: [],
    settings: {}
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return authService.isAuthenticated();
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    return authService.getCurrentUser();
  });

  // Fetch services
  const fetchServices = useCallback(async () => {
    try {
      const services = await serviceService.getAllServices();
      setAdminData(prev => ({ ...prev, services }));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }, []);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      const projects = await projectService.getAllProjects();
      setAdminData(prev => ({ ...prev, projects }));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }, []);

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      const contacts = await contactService.getAllContacts();
      setAdminData(prev => ({ ...prev, contacts }));
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }, []);

  // Fetch settings
  const fetchSettings = useCallback(async () => {
    try {
      const settings = await settingsService.getSettings();
      setAdminData(prev => ({ ...prev, settings }));
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchServices(),
        fetchProjects(),
        fetchContacts(),
        fetchSettings()
      ]);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  }, [fetchServices, fetchProjects, fetchContacts, fetchSettings]);

  // Don't automatically fetch all data on mount to prevent infinite loops
  // Each page will fetch its own data as needed
  // useEffect(() => {
  //   if (isAuthenticated && !loading) {
  //     fetchAllData();
  //   }
  // }, [isAuthenticated]);

  // Fetch page content
  const fetchPageContent = useCallback(async (pageName) => {
    try {
      const content = await pageService.getPageContent(pageName);
      setAdminData(prev => ({
        ...prev,
        pagesContent: {
          ...prev.pagesContent,
          [pageName]: content
        }
      }));
      return content;
    } catch (error) {
      console.error('Error fetching page content:', error);
      throw error;
    }
  }, []);

  // Update page content
  const updatePageContent = useCallback(async (pageName, section, data) => {
    try {
      // Use functional update to get current state
      let updatedPageContent;
      setAdminData(prev => {
        // Get current page content
        const currentPageContent = prev.pagesContent[pageName] || {};
        
        // Update the specific section
        updatedPageContent = {
          ...currentPageContent,
          [section]: {
            ...currentPageContent[section],
            ...data
          }
        };

        return {
          ...prev,
          pagesContent: {
            ...prev.pagesContent,
            [pageName]: updatedPageContent
          }
        };
      });

      // Send to API
      await pageService.updatePageContent(pageName, updatedPageContent);

      toast.success('Page content updated successfully');
    } catch (error) {
      console.error('Error updating page content:', error);
      toast.error('Failed to update page content');
      throw error;
    }
  }, []); // No dependencies needed as we use functional updates

  // Service management
  const addService = useCallback(async (service) => {
    try {
      const newService = await serviceService.createService(service);
      setAdminData(prev => ({
        ...prev,
        services: [...prev.services, newService]
      }));
      toast.success('Service added successfully');
      return newService;
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service');
      throw error;
    }
  }, []);

  const updateService = useCallback(async (id, updates) => {
    try {
      const updatedService = await serviceService.updateService(id, updates);
      setAdminData(prev => ({
        ...prev,
        services: prev.services.map(s => s.id === id ? updatedService : s)
      }));
      toast.success('Service updated successfully');
      return updatedService;
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
      throw error;
    }
  }, []);

  const deleteService = useCallback(async (id) => {
    try {
      await serviceService.deleteService(id);
      setAdminData(prev => ({
        ...prev,
        services: prev.services.filter(s => s.id !== id)
      }));
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
      throw error;
    }
  }, []);

  // Project management
  const addProject = useCallback(async (project) => {
    try {
      const newProject = await projectService.createProject(project);
      setAdminData(prev => ({
        ...prev,
        projects: [newProject, ...prev.projects]
      }));
      toast.success('Project added successfully');
      return newProject;
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to add project');
      throw error;
    }
  }, []);

  const updateProject = useCallback(async (id, updates) => {
    try {
      const updatedProject = await projectService.updateProject(id, updates);
      setAdminData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? updatedProject : p)
      }));
      toast.success('Project updated successfully');
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      throw error;
    }
  }, []);

  const deleteProject = useCallback(async (id) => {
    try {
      await projectService.deleteProject(id);
      setAdminData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      throw error;
    }
  }, []);

  // Contact management
  const markContactAsRead = useCallback(async (id, read = true) => {
    try {
      const updatedContact = await contactService.markAsRead(id, read);
      setAdminData(prev => ({
        ...prev,
        contacts: prev.contacts.map(c => c.id === id ? updatedContact : c)
      }));
    } catch (error) {
      console.error('Error marking contact as read:', error);
      toast.error('Failed to update contact');
      throw error;
    }
  }, []);

  const deleteContact = useCallback(async (id) => {
    try {
      await contactService.deleteContact(id);
      setAdminData(prev => ({
        ...prev,
        contacts: prev.contacts.filter(c => c.id !== id)
      }));
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
      throw error;
    }
  }, []);

  // Settings management
  const updateSettings = useCallback(async (section, data) => {
    try {
      // Flatten the settings update
      const updateData = section === 'agency' || section === 'social' || section === 'theme'
        ? { [section === 'social' ? 'social_links' : section === 'theme' ? 'theme' : '']: data, ...data }
        : data;

      const updatedSettings = await settingsService.updateSettings(updateData);
      setAdminData(prev => ({
        ...prev,
        settings: updatedSettings
      }));
      toast.success('Settings updated successfully');
      return updatedSettings;
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
      throw error;
    }
  }, []);

  // Auth functions
  const login = useCallback(async (username, password) => {
    try {
      const result = await authService.login(username, password);
      if (result.success) {
        setIsAuthenticated(true);
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      setAdminData({
        pagesContent: {},
        services: [],
        projects: [],
        contacts: [],
        settings: {}
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  // Reset to defaults (not applicable for real backend)
  const resetToDefaults = useCallback(() => {
    toast.info('Reset functionality not available with real database');
  }, []);

  const value = {
    adminData,
    isAuthenticated,
    loading,
    user,
    fetchPageContent,
    updatePageContent,
    addService,
    updateService,
    deleteService,
    addProject,
    updateProject,
    deleteProject,
    markContactAsRead,
    deleteContact,
    updateSettings,
    login,
    logout,
    resetToDefaults,
    fetchAllData,
    fetchServices,
    fetchProjects,
    fetchContacts,
    fetchSettings
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
