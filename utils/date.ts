export function timeAgo(time: ConstructorParameters<typeof Date>[number]) {
  const between = (Date.now() - +new Date(time)) / 1000
  if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟前')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时前')
  } else if (between < 2592000) {
    return pluralize(~~(between / 86400), ' 天前')
  } else if (between < 31536000) {
    return pluralize(~~(between / 2592000), ' 个月前')
  } else {
    return pluralize(~~(between / 31536000), ' 年前')
  }
}

function pluralize(time: number, label: string) {
  return time + label
}
