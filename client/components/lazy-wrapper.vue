<script>
import Spinner from './spinner'

export default {
  functional: true,
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  render(h, { props, children }) {
    return props.loading
      ? h('div', { style: { 'text-align': 'center', height: props.height  } }, [
          h(Spinner, { props: { show: true } })
        ])
      : children
  }
}
</script>
