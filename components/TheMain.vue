<template>
  <div class="flex">
    <div class="mr-[20px] w-[290px]">
      <slot name="sidebar" />
    </div>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
