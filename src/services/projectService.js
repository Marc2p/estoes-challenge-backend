import Project from '../models/project.js';

class ProjectService {
  async createProject(projectData) {
    try {
      const project = await Project.create(projectData);
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllProjects(page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      const { count, rows } = await Project.findAndCountAll({
        limit: pageSize,
        offset
      });

      const totalPages = Math.ceil(count / pageSize);

      return {
        totalItems: count,
        totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        projects: rows,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProjectById(id) {
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProject(id, projectData) {
    try {
      const [updated] = await Project.update(projectData, {
        where: { ProjectId: id },
      });
      if (!updated) {
        throw new Error('Project not found');
      }
      const updatedProject = await Project.findByPk(id);
      return updatedProject;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProject(id) {
    try {
      const deleted = await Project.destroy({
        where: { ProjectId: id },
      });
      if (!deleted) {
        throw new Error('Project not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new ProjectService();
