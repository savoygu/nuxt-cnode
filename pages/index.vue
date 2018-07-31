<script>
import { validTabs } from '~/common/constants'

export default {
  fetch({ redirect }) {
    redirect('/' + validTabs[0])
  }
}
</script>
