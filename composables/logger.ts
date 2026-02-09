import type { Bindings, LogFn, Logger } from 'pino'

export const LOGGER = 'logger'

export type LogFnArgs = Parameters<LogFn>

export function hasLoggerParam() {
  const { $url } = useNuxtApp()
  return $url.hasParam(LOGGER)
}

export function useLogger(msgPrefix: string, bindings: Bindings = {}) {
  const { $logger } = useNuxtApp()
  const isServer = import.meta.server

  if (!msgPrefix.startsWith('[client:') && !msgPrefix.startsWith('[server:')) {
    msgPrefix = msgPrefix.replace('[', isServer ? '[server:' : '[client:')
  }

  const childLogger = $logger.child(bindings, { msgPrefix: isServer ? '' : msgPrefix })

  const addPrefix = (args: any[]): LogFnArgs => {
    if (args.length > 0 && typeof args[0] === 'string') {
      // 第一个参数是字符串消息
      const newArgs = [...args]
      newArgs[0] = `${msgPrefix} ${args[0]}`
      return newArgs as LogFnArgs
    }
    else if (args.length > 1 && typeof args[0] === 'object' && args[0] !== null && typeof args[1] === 'string') {
      // 第一个参数是对象，第二个参数是字符串消息
      const newArgs = [...args]
      newArgs[1] = `${msgPrefix} ${args[1]}`
      return newArgs as LogFnArgs
    }
    // 其他情况直接返回原参数
    return args as LogFnArgs
  }

  const logger: Logger = {
    ...childLogger,
    trace: ((...args: LogFnArgs) => childLogger.trace(...addPrefix(args))) as LogFn,
    debug: ((...args: LogFnArgs) => childLogger.debug(...addPrefix(args))) as LogFn,
    info: ((...args: LogFnArgs) => childLogger.info(...addPrefix(args))) as LogFn,
    warn: ((...args: LogFnArgs) => childLogger.warn(...addPrefix(args))) as LogFn,
    error: ((...args: LogFnArgs) => childLogger.error(...addPrefix(args))) as LogFn,
    fatal: ((...args: LogFnArgs) => childLogger.fatal(...addPrefix(args))) as LogFn,
  }

  return logger
}
