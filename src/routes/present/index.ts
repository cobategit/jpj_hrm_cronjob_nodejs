import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import { exportReportPresent } from '../../handlers/present/exportReportPresent'
import { ParamsEntity } from '../../interfaces'
import { checkActivityPresent } from '../../handlers/present/check-activity-present'

export function PresentRoute() {
    const presentRoute = (fastify: FastifyInstance, options: FastifyPluginOptions, done: (error?: FastifyError) => void) => {
        fastify.get<{ Querystring: ParamsEntity }>(
            '/report/export',
            {
                logLevel: 'info'
            },
            exportReportPresent
        )

        fastify.get<{ Querystring: ParamsEntity }>(
            '/check-activity',
            {
                logLevel: 'info'
            },
            checkActivityPresent
        )

        done()
    }

    return presentRoute
}