<template>
  <div class="main">
    <div class="main__sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="main__content">
      <slot />
    </div>
  </div>
</template>
