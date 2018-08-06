<template>
  <div class="main topic-create">
    <div class="main__content">
      <div class="main__panel">
        <div class="main__header">
          <breadcrumb>
            <breadcrumb-item to="/">主页</breadcrumb-item>
            <breadcrumb-item>发布话题</breadcrumb-item>
          </breadcrumb>
        </div>
        <div class="topic-create__content">
          <div class="topic-create__plate">
            <select name="plate" id="plate" v-model="plate">
              <option value="请选择"></option>
              <option value="分享"></option>
              <option value="问答"></option>
              <option value="招聘"></option>
              <option value="客户端测试"></option>
            </select>
          </div>
          <div class="topic-create__title">
            <input type="text" v-model="title">
          </div>
          <div class="topic-create__text">
            <div id="editormd">
                <textarea style="display:none;">### Hello Editor.md !</textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main__sidebar sidebar"></div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'

export default {
  name: 'TopicCreate',

  components: {
    Breadcrumb,
    BreadcrumbItem
  },

  data() {
    return {
      plate: '',
      title: ''
    }
  }
}
</script>

<style lang="scss">
@include b(topic-create) {
  .CodeMirror, .editormd-preview {
    height: 450px;
  }
}
</style>
