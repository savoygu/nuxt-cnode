<template>
  <div class="w-full bg-white">
    <div class="mb-5 border-b border-b-[#f3f3f3] pb-5 last:mb-0 last:border-b-0 last:pb-0">
      <div class="overflow-hidden p-5">
        <div
          class="skeleton-shimmer mb-4 h-3.5 w-full bg-gradient-to-r from-[#e4e6eb] via-[rgba(228,230,235,0.5)] to-[#e4e6eb]
          bg-[length:480px_480px] first:mt-2 first:w-2/5 last:mb-0 last:w-3/5 [&:nth-child(3)]:w-4/5"
        />
        <div
          class="skeleton-shimmer mb-4 h-3.5 w-full bg-gradient-to-r from-[#e4e6eb] via-[rgba(228,230,235,0.5)] to-[#e4e6eb]
          bg-[length:480px_480px] first:mt-2 first:w-2/5 last:mb-0 last:w-3/5 [&:nth-child(3)]:w-4/5"
        />
        <div
          class="skeleton-shimmer mb-4 h-3.5 w-full bg-gradient-to-r from-[#e4e6eb] via-[rgba(228,230,235,0.5)] to-[#e4e6eb]
          bg-[length:480px_480px] first:mt-2 first:w-2/5 last:mb-0 last:w-3/5 [&:nth-child(3)]:w-4/5"
        />
        <div
          class="skeleton-shimmer mb-4 h-3.5 w-full bg-gradient-to-r from-[#e4e6eb] via-[rgba(228,230,235,0.5)] to-[#e4e6eb]
          bg-[length:480px_480px] first:mt-2 first:w-2/5 last:mb-0 last:w-3/5 [&:nth-child(3)]:w-4/5"
        />
      </div>
    </div>
  </div>
</template>

<style>
@keyframes skeleton-keyframes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 480px 0;
  }
}

.skeleton-shimmer {
  animation: skeleton-keyframes 0.6s linear infinite;
}
</style>
