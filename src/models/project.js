import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Project = sequelize.define('Project', {
  ProjectId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ProjectName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ProjectDescription: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  ProjectManager: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AssignedTo: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  Status: {
    type: DataTypes.ENUM('activo', 'completado', 'en progreso', 'cancelado'),
    allowNull: false,
  },
});

export default Project;
