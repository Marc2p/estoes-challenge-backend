import { body, validationResult } from 'express-validator';
import projectService from '../services/projectService.js';

export const validateProject = [
  body('ProjectName')
    .isString()
    .withMessage('ProjectName debe ser un string.')
    .isLength({ min: 1, max: 100 })
    .withMessage('ProjectName debe tener entre 1 y 100 caracteres.')
    .custom(async (value) => {
      const projectExists = await projectService.projectExists(value);
      if (projectExists) {
        throw new Error('El nombre del proyecto ya existe.');
      }
      return true;
    }),
  body('ProjectDescription')
    .isString()
    .withMessage('ProjectDescription debe ser un string.')
    .isLength({ min: 1, max: 500 })
    .withMessage('ProjectDescription debe tener entre 1 y 500 caracteres.'),
  body('ProjectManager')
    .isString()
    .withMessage('ProjectManager debe ser un string.')
    .notEmpty()
    .withMessage('ProjectManager no puede estar vacío.'),
  body('AssignedTo')
    .isString()
    .withMessage('AssignedTo debe ser un string.')
    .notEmpty()
    .withMessage('AssignedTo no puede estar vacío.'),
  body('Status')
    .isIn(['activo', 'completado', 'en progreso', 'cancelado'])
    .withMessage('Status debe ser uno de los siguientes: activo, completado, en progreso, cancelado.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];