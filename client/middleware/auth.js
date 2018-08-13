export default function ({ store, redirect, route }) {
  console.log(route)
  if (!store.state.user) {
    return redirect(`/signin?from=${route.fullPath}`)
  }
}
