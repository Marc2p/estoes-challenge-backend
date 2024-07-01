import Project from '../models/project.js';
import { Op } from 'sequelize';

class ProjectService {
  async createProject(projectData) {
    try {
      const project = await Project.create(projectData);
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllProjects(page = 1, pageSize = 10, searchQuery = null) {
    try {
      const offset = (page - 1) * pageSize;
      const whereClause = searchQuery
      ? {
        ProjectName: { [Op.like]: `%${searchQuery}%` }
        }
      : {};
      const { count, rows } = await Project.findAndCountAll({
        where: whereClause,
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
        throw new Error('Proyecto no encontrado');
      }
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async projectExists(ProjectName) {
    try {
      const project = await Project.findOne({ where: { ProjectName } });
      return !!project;
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
        throw new Error('Proyecto no encontrado');
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
        throw new Error('Proyecto no encontrado');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new ProjectService();
