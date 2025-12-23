<template>
  <div class="flex min-h-full flex-col">
    <Navbar />
    <div class="main mx-auto my-4 grid w-[90%] min-w-[960px] max-w-[1400px] grid-cols-[1fr_290px] gap-4">
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

<style>
@media screen and (max-width: 992px) {
  .main {
    display: block;
    width: 100%;
    min-width: 0;
    margin: 20px auto;
  }
  .content {
    margin-right: 0;
  }
  .panel {
    margin: 0 5px;
  }
  .sidebar {
    display: none;
  }
}
</style>
