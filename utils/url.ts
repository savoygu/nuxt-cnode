export function host(url: string) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') {
    parts.shift()
  }
  return parts.join('.')
}
