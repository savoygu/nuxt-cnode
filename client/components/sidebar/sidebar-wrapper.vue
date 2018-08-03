<script>
export default {
  functional: true,
  props: {
    header: {
      type: String,
      default: ''
    }
  },
  render(h, { props, slots, children }) {
    let $slots = slots()

    return (
      <div class="sidebar__panel">
        {
          (props.header || $slots.header)
            && (
              <div class="sidebar__header">
                {
                  $slots.header
                    ? $slots.header
                    : <span>{props.header}</span>
                }
              </div>
            )
        }
        <div class="sidebar__inner">
          {children}
        </div>
      </div>
    )
  }
}
</script>
