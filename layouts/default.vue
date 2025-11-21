<template>
  <div class="flex min-h-full flex-col">
    <Navbar />
    <div class="flex">
      <div class="w-[290px] mr-[20px]">
        <slot name="sidebar" />
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </div>
    <TheFooter />
  </div>
</template>
