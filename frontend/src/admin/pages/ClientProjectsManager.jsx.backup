import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Upload, Download, FileText, X } from 'lucide-react';
import clientService from '../../services/clientService';

export default function ClientProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    client_id: '',
    description: '',
    status: 'pending',
    progress: 0,
    expected_delivery: '',
    notes: ''
  });

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await clientService.getAllClientProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await clientService.updateClientProject(editingProject.id, formData);
        toast.success('Project updated successfully');
      } else {
        await clientService.createClientProject(formData);
        toast.success('Project created successfully');
      }
      
      fetchProjects();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving project:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to save project';
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project? All associated files will be deleted.')) {
      return;
    }

    try {
      await clientService.deleteClientProject(projectId);
      toast.success('Project deleted successfully');
      fetchProjects();
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      client_id: project.client_id,
      description: project.description || '',
      status: project.status,
      progress: project.progress,
      expected_delivery: project.expected_delivery || '',
      notes: project.notes || ''
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData({
      name: '',
      client_id: '',
      description: '',
      status: 'pending',
      progress: 0,
      expected_delivery: '',
      notes: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = async (projectId, file) => {
    setUploadingFile(true);
    try {
      await clientService.uploadProjectFile(projectId, file);
      toast.success('File uploaded successfully');
      fetchProjects();
      // Refresh selected project
      const updatedProjects = await clientService.getAllClientProjects();
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedProject);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDeleteFile = async (projectId, fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      await clientService.deleteProjectFile(projectId, fileId);
      toast.success('File deleted successfully');
      fetchProjects();
      // Refresh selected project
      const updatedProjects = await clientService.getAllClientProjects();
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedProject);
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      review: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      review: 'Under Review',
      completed: 'Completed'
    };
    return labels[status] || status;
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6" data-testid="client-projects-manager">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Projects</h1>
          <p className="text-gray-600 mt-1">Manage client projects and deliverables</p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2"
          data-testid="create-project-btn"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">All Projects</h2>
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {projects.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No projects found. Create your first project to get started.
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedProject?.id === project.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedProject(project)}
                  data-testid={`project-item-${project.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600">{getClientName(project.client_id)}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              {selectedProject ? 'Project Details' : 'Select a Project'}
            </h2>
            {selectedProject && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(selectedProject)}
                  data-testid="edit-selected-project-btn"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(selectedProject.id)}
                  className="text-red-600 hover:text-red-700"
                  data-testid="delete-selected-project-btn"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="p-4 max-h-[600px] overflow-y-auto">
            {selectedProject ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-600">Client</Label>
                  <p className="font-medium">{getClientName(selectedProject.client_id)}</p>
                </div>
                {selectedProject.description && (
                  <div>
                    <Label className="text-gray-600">Description</Label>
                    <p className="text-gray-900">{selectedProject.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={getStatusColor(selectedProject.status)}>
                      {getStatusLabel(selectedProject.status)}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Progress</Label>
                    <p className="font-medium">{selectedProject.progress}%</p>
                  </div>
                </div>
                {selectedProject.expected_delivery && (
                  <div>
                    <Label className="text-gray-600">Expected Delivery</Label>
                    <p className="font-medium">
                      {new Date(selectedProject.expected_delivery).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {selectedProject.notes && (
                  <div>
                    <Label className="text-gray-600">Notes</Label>
                    <div className="bg-gray-50 p-3 rounded whitespace-pre-wrap text-sm">
                      {selectedProject.notes}
                    </div>
                  </div>
                )}
                
                {/* Files Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-gray-900">Project Files</Label>
                    <Button
                      size="sm"
                      onClick={() => document.getElementById('file-upload').click()}
                      disabled={uploadingFile}
                      data-testid="upload-file-btn"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingFile ? 'Uploading...' : 'Upload File'}
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          handleFileUpload(selectedProject.id, e.target.files[0]);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                  {selectedProject.files && selectedProject.files.length > 0 ? (
                    <div className="space-y-2">
                      {selectedProject.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded"
                          data-testid={`file-item-${file.id}`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.filename}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(file.uploaded_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFile(selectedProject.id, file.id)}
                            className="text-red-600 hover:text-red-700"
                            data-testid={`delete-file-btn-${file.id}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No files uploaded yet</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Select a project to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col" data-testid="project-dialog">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </DialogTitle>
            <DialogDescription>
              {editingProject ? 'Update project details' : 'Assign a new project to a client'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="space-y-4 py-4 overflow-y-auto pr-2">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="project-name-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client_id">Client *</Label>
                <Select
                  name="client_id"
                  value={formData.client_id}
                  onValueChange={(value) => setFormData({ ...formData, client_id: value })}
                  required
                >
                  <SelectTrigger data-testid="project-client-select">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.filter(c => c.is_active).map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} ({client.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  data-testid="project-description-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    name="status"
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger data-testid="project-status-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    name="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleChange}
                    data-testid="project-progress-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expected_delivery">Expected Delivery</Label>
                <Input
                  id="expected_delivery"
                  name="expected_delivery"
                  type="date"
                  value={formData.expected_delivery}
                  onChange={handleChange}
                  data-testid="project-delivery-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Visible to Client)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add any notes or updates for the client..."
                  data-testid="project-notes-input"
                />
              </div>
            </div>
            <DialogFooter className="pt-4 border-t mt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" data-testid="save-project-btn">
                {editingProject ? 'Update Project' : 'Create Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
