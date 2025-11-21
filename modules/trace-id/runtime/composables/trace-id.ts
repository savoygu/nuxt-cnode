export function useTraceId() {
  return useState<string>('traceId', () => useRequestEvent()?.context?.traceId)
}
