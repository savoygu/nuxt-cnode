<template>
  <div class="flex min-h-full flex-col">
    <Navbar />
    <div class="grid grid-cols-[1fr_290px] gap-[15px] w-[90%] max-w-[1400px] min-w-[960px] my-[15px] mx-auto">
      <div class="content">
        <slot />
      </div>
      <div class="sidebar">
        <slot name="sidebar" />
      </div>
    </div>
    <TheFooter />
  </div>
</template>
