<script setup lang="ts">
definePageMeta({
  redirect: to => {
    return {
      name: 'user',
      params: {
        loginname: to.params.slug
      }
    }
  }
})
</script>
