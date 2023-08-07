import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import { exportReportPresent } from '../../handlers/present/exportReportPresent'
import { ParamsEntity } from '../../interfaces'

export function PresentRoute() {
    const presentRoute = (fastify: FastifyInstance, options: FastifyPluginOptions, done: (error?: FastifyError) => void) => {
        fastify.get<{ Querystring: ParamsEntity }>(
            '/report/export',
            {
                logLevel: 'info'
            },
            exportReportPresent
        )

        done()
    }

    return presentRoute
}