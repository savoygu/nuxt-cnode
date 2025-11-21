import type { Logger, LoggerOptions } from 'pino'
import pino from 'pino'

export interface LoggerInstance extends Logger {}

export default defineNuxtPlugin({
  name: 'logger',
  enforce: 'pre',
  dependsOn: ['traceId', 'url'],
  setup() {
    const baseConfig: LoggerOptions = {
      timestamp: pino.stdTimeFunctions.isoTime,
    }
    let parentLogger: Logger

    if (import.meta.server) {
      parentLogger = pino({
        ...baseConfig,
        transport: {
          targets: import.meta.env.PROD
            ? [{
                target: 'pino/file',
                options: { destination: 'logs/app.log', mkdir: true },
                level: 'info',
              }, {
                target: 'pino/file',
                options: { destination: 'logs/error.log', mkdir: true },
                level: 'error',
              }]
            : [{ target: 'pino-pretty' }],
          dedupe: true, // 避免重复打印
        },
        level: 'trace',
      })
    }
    else {
      parentLogger = pino({
        ...baseConfig,
        enabled: import.meta.env.DEV || hasLoggerParam(),
        browser: {
          asObject: true,
          serialize: true,
          formatters: {
            level: label => ({ level: label }),
          },
        },
        transport: {
          targets: [{ target: 'pino-pretty' }],
        },
      })
    }

    const logger: LoggerInstance = parentLogger.child({ requestId: useTraceId().value })

    return {
      provide: {
        logger,
      },
    }
  },
})
