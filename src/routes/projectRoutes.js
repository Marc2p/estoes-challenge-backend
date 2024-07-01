import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { validateProject } from '../middlewares/projectValidator.js';

const router = express.Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', validateProject, createProject);
router.post('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;