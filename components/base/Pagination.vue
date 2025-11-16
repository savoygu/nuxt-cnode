<script setup lang="ts">
interface PaginationProps {
  currentPage: number
  totalPage: number
  pageRange?: number
  edgePages?: number
}

// props
const props = withDefaults(defineProps<PaginationProps>(), {
  pageRange: 5,
  edgePages: 1,
})

// emits
const emit = defineEmits<{ (e: 'change', page: number): void }>()

// reactive
const quicknextIconName = ref('icon-more')
const quickprevIconName = ref('icon-more')
const showPrevMoreRef = ref(false)
const showNextMoreRef = ref(false)

// computed
const pagers = computed(() => {
  const { currentPage, totalPage, pageRange, edgePages } = props
  const pagerCount = pageRange + edgePages * 2
  let showPrevMore = false
  let showNextMore = false
  if (totalPage > pagerCount) {
    const half = Math.ceil(pagerCount / 2) - 1
    if (currentPage > pagerCount - half) {
      showPrevMore = true
    }
    if (currentPage < totalPage - half) {
      showNextMore = true
    }
  }
  const pagers = []
  if (showPrevMore && !showNextMore) {
    const startPage = totalPage - (pagerCount - 2)
    for (let i = startPage + 1; i <= totalPage - edgePages; i++) {
      pagers.push(i)
    }
  }
  else if (!showPrevMore && showNextMore) {
    for (let i = edgePages + 1; i <= pagerCount - edgePages; i++) {
      pagers.push(i)
    }
  }
  else if (showPrevMore && showNextMore) {
    const offset = Math.ceil(pagerCount / 2) - 1 - edgePages
    const endPage = pagerCount % 2 === 1 ? currentPage + offset : currentPage + offset + 1
    for (let i = currentPage - offset; i <= endPage; i++) {
      pagers.push(i)
    }
  }
  else {
    for (let i = edgePages + 1; i <= totalPage - edgePages; i++) {
      pagers.push(i)
    }
  }
  showPrevMoreRef.value = showPrevMore
  showNextMoreRef.value = showNextMore
  return pagers
})
const leftPagers = computed(() => {
  const { totalPage, edgePages } = props
  const pagers = []
  if (totalPage < edgePages) {
    for (let i = 1; i <= totalPage; i++) {
      pagers.push(i)
    }
  }
  else {
    for (let i = 1; i <= edgePages; i++) {
      pagers.push(i)
    }
  }
  return pagers
})
const rightPagers = computed(() => {
  const { totalPage, edgePages } = props
  const pagers = []
  if (totalPage < edgePages * 2) {
    for (let i = edgePages + 1; i <= totalPage; i++) {
      pagers.push(i)
    }
  }
  else {
    for (let i = totalPage - edgePages + 1; i <= totalPage; i++) {
      pagers.push(i)
    }
  }
  return pagers
})

// watch
watch(showPrevMoreRef, (val) => {
  if (!val) {
    quickprevIconName.value = 'icon-more'
  }
})
watch(showNextMoreRef, (val) => {
  if (!val) {
    quicknextIconName.value = 'icon-more'
  }
})

// methods
function setCurrentPage(pager: 'prev' | 'next' | 'prevMore' | 'nextMore' | number) {
  const { currentPage, totalPage, pageRange } = props
  let page = currentPage

  switch (pager) {
    case 'prev':
      page--
      break
    case 'next':
      page++
      break
    case 'prevMore':
      page -= pageRange
      break
    case 'nextMore':
      page += pageRange
      break
    default:
      page = pager
      break
  }

  if (page < 1) {
    page = 1
  }
  else if (page > totalPage) {
    page = totalPage
  }
  if (page !== currentPage) {
    emit('change', page)
  }
}
</script>

<template>
  <ul class="inline-flex flex-wrap m-0 rounded-[4px]">
    <li
      class="flex w-[32px] h-[32px] items-center justify-center border border-l-0 border-[#ddd] bg-white text-[#778087] cursor-pointer text-[14px] text-center first:border-l first:border-l-[1px] first:rounded-l-[4px] last:rounded-r-[4px] hover:text-[#80bd01]"
      :class="{ 'cursor-not-allowed opacity-75': 1 === currentPage }"
      @click="setCurrentPage('prev')"
    >
      <slot name="prev">
        <i class="iconfont icon-arrow_left" />
      </slot>
    </li>
    <li
      v-for="pager in leftPagers"
      :key="pager"
      class="flex w-[32px] h-[32px] items-center justify-center border border-l-0 border-[#ddd] bg-white text-[#778087] cursor-pointer text-[14px] text-center first:border-l first:border-l-[1px] first:rounded-l-[4px] last:rounded-r-[4px] hover:text-[#80bd01]"
      :class="{ 'border border-[#80bd01] bg-[#80bd01] text-white cursor-default': pager === currentPage }"
      @click="setCurrentPage(pager)"
    >
      {{ pager }}
    </li>
    <li
      v-if="showPrevMoreRef"
      class="flex w-[32px] h-[32px] items-center justify-center border border-l-0 border-[#ddd] bg-white text-[#778087] cursor-pointer text-[14px] text-center first:border-l first:border-l-[1px] first:rounded-l-[4px] last:rounded-r-[4px] hover:text-[#80bd01]"
      @mouseenter="quickprevIconName = 'icon-db-arrow_left'"
      @mouseleave="quickprevIconName = 'icon-more'"
      @click="setCurrentPage('prevMore')"
    >
      <i class="iconfont" :class="quickprevIconName" />
    </li>
    <li
      v-for="pager in pagers"
      :key="pager"
      class="flex w-[32px] h-[32px] items-center justify-center border border-l-0 border-[#ddd] bg-white text-[#778087] cursor-pointer text-[14px] text-center first:border-l first:border-l-[1px] first:rounded-l-[4px] last:rounded-r-[4px] hover:text-[#80bd01]"
      :class="{ 'border border-[#80bd01] bg-[#80bd01] text-white cursor-default': pager === currentPage }"
      @click="setCurrentPage(pager)"
    >
      {{ pager }}
    </li>
    <li
      v-if="showNextMoreRef"
      class="flex w-[32px] h-[32px] items-center justify-center border border-l-0 border-[#ddd] bg-white text-[#778087] cursor-pointer text-[14px] text-center first:border-l first:border-l-[1px] first:rounded-l-[4px] last:rounded-r-[4px] hover:text-[#80bd01]"
      @mouseenter="quicknextIconName = 'icon-db-arrow_right'"
      @mouseleave="quicknextIconName = 'icon-more'"
      @click="setCurrentPage('nextMore')"
    >
      <i class="iconfont" :class="quicknextIconName" />
    </li>
    <li
      v-for="pager in rightPagers"
      :key="pager"
      class="flex w-[32px] h-[32px] items-center justify-center border border-l-0 border-[#ddd] bg-white text-[#778087] cursor-pointer text-[14px] text-center first:border-l first:border-l-[1px] first:rounded-l-[4px] last:rounded-r-[4px] hover:text-[#80bd01]"
      :class="{ 'border border-[#80bd01] bg-[#80bd01] text-white cursor-default': pager === currentPage }"
      @click="setCurrentPage(pager)"
    >
      {{ pager }}
    </li>
    <li
      class="flex w-[32px] h-[32px] items-center justify-center border border-l-0 border-[#ddd] bg-white text-[#778087] cursor-pointer text-[14px] text-center first:border-l first:border-l-[1px] first:rounded-l-[4px] last:rounded-r-[4px] hover:text-[#80bd01]"
      :class="{ 'cursor-not-allowed opacity-75': totalPage === currentPage }"
      @click="setCurrentPage('next')"
    >
      <slot name="next">
        <i class="iconfont icon-arrow_right" />
      </slot>
    </li>
  </ul>
</template>
