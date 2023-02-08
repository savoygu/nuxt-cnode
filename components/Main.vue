<template>
  <div class="main">
    <div class="main__content">
      <slot />
    </div>
    <div class="main__sidebar sidebar">
      <slot name="sidebar"></slot>
    </div>
  </div>
</template>
