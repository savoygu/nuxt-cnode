<script setup lang="ts"></script>

<template>
  <TheMain>
    <Panel>
      <template #header>
        <BaseBreadcrumb>
          <BaseBreadcrumbItem to="/">主页</BaseBreadcrumbItem>
          <BaseBreadcrumbItem>编辑话题</BaseBreadcrumbItem>
        </BaseBreadcrumb>
      </template>
      <div class="topic-create"></div>
    </Panel>
    <template #sidebar>
      <SidebarMarkdownGrammar />
      <SidebarTopicPublishGuide />
    </template>
  </TheMain>
</template>

<style lang="scss">
@include b(topic-create) {
  // TODO
}
</style>
