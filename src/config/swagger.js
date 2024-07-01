import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de la API de proyectos',
    version: '1.0.0',
    description: 'Documentación de la API de proyectos realizada para el desafío backend de Esto Es',
  },
  servers: [
    {
      url: 'http://backend.peirone.ar/api',
      description: 'Servidor de desarrollo'
    }
  ],
  components: {
    schemas: {
      Project: {
        type: 'object',
        required: ['ProjectName', 'ProjectDescription', 'ProjectManager', 'AssignedTo', 'Status'],
        properties: {
          ProjectId: {
            type: 'integer',
            description: 'ID del proyecto'
          },
          ProjectName: {
            type: 'string',
            description: 'Nombre del proyecto'
          },
          ProjectDescription: {
            type: 'string',
            description: 'Descripción del proyecto'
          },
          ProjectManager: {
            type: 'string',
            description: 'Persona encargada del proyecto'
          },
          AssignedTo: {
            type: 'string',
            description: 'Usuarios asignados al proyecto'
          },
          Status: {
            type: 'string',
            description: 'Estado del proyecto',
            enum: ['activo', 'completado', 'en progreso', 'cancelado']
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/projectRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
