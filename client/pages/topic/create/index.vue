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
            <span>选择板块：</span>
            <select name="plate" id="plate" v-model="tab">
              <option disabled value="">请选择</option>
              <option value="share">分享</option>
              <option value="ask">问答</option>
              <option value="job">招聘</option>
              <option value="dev">客户端测试</option>
            </select>
          </div>
          <div class="topic-create__title">
            <input type="text" v-model="title" placeholder="标题字数 10 字以上">
          </div>
          <div class="topic-create__text">
            <div id="editormd">
              <textarea style="display:none;" v-model="content">### Hello Editor.md !</textarea>
            </div>
          </div>
          <div class="topic-create__statusbar">
            <div class="topic-create__lines"></div>
            <div class="topic-create__words"></div>
            <div class="topic-create__cursor"></div>
          </div>
          <div class="topic-create__submit">
            <button class="button--blue">提交</button>
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

  head () {
    return {
      script: [
        { innerHTML: 'window.onload = function () { editormd("editormd", { path: "/editormd/lib/" }) }', type: 'text/javascript', body: true },
      ],
      __dangerouslyDisableSanitizers: ['script']
    }
  },

  watch: {
    '$route.path' (to, from) {
      console.log(to, from)
    }
  },

  data () {
    return {
      tab: '',
      title: '',
      content: ''
    }
  },

  methods: {
    submitTopic () {

      this.$store.dispatch('CREATE_TOPIC')
    }
  }
}
</script>

<style lang="scss">
@include b(topic-create) {
  .CodeMirror, .editormd-preview {
    height: 450px;
  }

  @include e(content) {
    padding: 10px;
    border-top: 1px solid #e5e5e5;
  }

  @include e(plate) {
    height: 30px;
    line-height: 30px;

    select {
      width: 220px;
      height: 30px;
      font-size: 14px;
      color: #555;
    }
  }

  @include e(title) {
    margin: 10px 0 14px;

    input {
      width: 98%;
      height: 28px;
      padding: 4px 6px;
      color: #555;
      border: none;
      border-radius: 4px;
      box-shadow: 0 0 2px rgba(60,60,60,.5);
      outline: none;
    }
  }

}
</style>
