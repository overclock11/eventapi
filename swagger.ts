import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API para gestionar eventos',
            description: "API para gestionar evetos en node + typescript + express",
            contact: {
                name: "Julián Borray",
                email: "jlian92@gmail.com",
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server"
            }
        ]
    },
    // looks for configuration in specified directories
    apis: ['./src/routes/*.ts'],
}
export const swaggerSpec = swaggerJsdoc(options)