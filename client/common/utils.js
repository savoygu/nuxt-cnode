export const lazy = (commit, task, optimistic, enabled) => {
  // By default, do lazy operations only in client
  if (enabled === undefined) {
    enabled = process.client
  }

  // Non lazy mode
  if (!enabled) {
    return task().then(res => res.data).then(commit)
  }

  // Do real task in background
  Promise.resolve(task(optimistic))
    .then(res => res.data)
    .then(commit)
    .catch(console.error)

  // Commit optimistic value and resolve
  return Promise.resolve(commit(optimistic))
}

export const mixinAuth = {
  methods: {
    checkAuth () {
      if (!this.$store.state.user) {
        this.$router.push(`/signin?from=${this.$route.fullPath}`)
        return true
      }
    }
  }
}
