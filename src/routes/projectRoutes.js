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

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Endpoints para gestionar proyectos
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtiene una lista de proyectos
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Tamaño de la página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Busca proyectos que coincidan con el término de búsqueda en su nombre
 *     responses:
 *       200:
 *         description: Lista de proyectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 nextPage:
 *                   type: string
 *                 prevPage:
 *                   type: string
 *       500:
 *         description: Error en el servidor
 */
router.get('/projects', getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtiene un proyecto por ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Detalles del proyecto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/projects/:id', getProjectById);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post('/projects', validateProject, createProject);

/**
 * @swagger
 * /projects/{id}:
 *   post:
 *     summary: Actualiza un proyecto existente
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/projects/:id', updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Elimina un proyecto
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       204:
 *         description: Proyecto eliminado exitosamente
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/projects/:id', deleteProject);

export default router;