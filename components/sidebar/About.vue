<template>
  <Panel header="关于">
    <p class="about__community">CNode：Node.js专业中文社区</p>
    <p class="about__here">在这里你可以：</p>
    <ul class="about__can-do">
      <li>向别人提出你遇到的问题</li>
      <li>帮助遇到问题的人</li>
      <li>分享自己的知识</li>
      <li>和其它人一起进步</li>
    </ul>
  </Panel>
</template>

<style lang="scss">
@include b(about) {
  @include p('e:community', 'e:here') {
    margin-bottom: 10px;
    font-size: 14px;
  }

  @include e(can-do) {
    margin: 0 0 10px 25px;
    list-style-type: disc;
  }
}
</style>
