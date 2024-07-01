import projectService from '../services/projectService.js';

export const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const searchQuery = req.query.search || null;
    const buildPageUrl = (pageNum) => `/api/projects?page=${pageNum}&pageSize=${pageSize}&search=${searchQuery}`;

    const projects = await projectService.getAllProjects(page, pageSize, searchQuery);
    const response = {
      totalItems: projects.totalItems,
      totalPages: projects.totalPages,
      currentPage: projects.currentPage,
      pageSize: projects.pageSize,
      nextPage: projects.nextPage ? buildPageUrl(projects.nextPage) : null,
      prevPage: projects.prevPage ? buildPageUrl(projects.prevPage) : null,
      projects: projects.projects
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    res.status(200).json(project);
  } catch (error) {
    res.status(error.message === 'Proyecto no encontrado' ? 404 : 500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(error.message === 'Proyecto no encontrado' ? 404 : 500).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(200).send('Proyecto eliminado');
  } catch (error) {
    res.status(error.message === 'Proyecto no encontrado' ? 404 : 500).json({ error: error.message });
  }
};
