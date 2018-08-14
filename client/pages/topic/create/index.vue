<template>
  <div class="main">
    <div class="main__content">
      <div class="main__panel">
        <div class="main__header">
          <breadcrumb>
            <breadcrumb-item to="/">主页</breadcrumb-item>
            <breadcrumb-item>发布话题</breadcrumb-item>
          </breadcrumb>
        </div>
        <div class="topic-create">
          <div class="topic-create__alert" v-if="visible"><alert type="error" v-model="visible" :text="errorText"></alert></div>
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
          <div class="topic-create__content">
            <div id="editormd">
              <textarea ref="content" style="display:none;" v-model="content">### Hello Editor.md !</textarea>
            </div>
          </div>
          <div class="topic-create__statusbar">
            <div class="topic-create__lines"></div>
            <div class="topic-create__words"></div>
            <div class="topic-create__cursor"></div>
          </div>
          <div class="topic-create__submit">
            <button class="button--blue" @click="createTopic">提交</button>
            <span class="topic-create__lazy-wrapper"><lazy-wrapper :loading="loading"></lazy-wrapper></span>
          </div>
        </div>
      </div>
    </div>
    <div class="main__sidebar sidebar"></div>
  </div>
</template>

<script>
import LazyWrapper from '~/components/lazy-wrapper'
import Breadcrumb from '~/components/breadcrumb'
import BreadcrumbItem from '~/components/breadcrumb/item'
import Alert from '~/components/alert'

export default {
  name: 'TopicCreate',

  middleware: 'auth',

  components: {
    LazyWrapper,
    Breadcrumb,
    BreadcrumbItem,
    Alert
  },

  head () {
    return {
      link: [
        { rel: 'stylesheet', href: '//cdn.jsdelivr.net/editor/0.1.0/editor.css' }
      ],
      script: [
        { src: '//cdn.jsdelivr.net/editor/0.1.0/editor.js' },
        { src: '//cdn.jsdelivr.net/editor/0.1.0/marked.js' }
      ]
    }
  },

  data () {
    return {
      tab: '',
      title: '',
      content: '',
      visible: false,
      errorText: ''
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    }
  },

  methods: {
    setErrorText (errorText) {
      this.visible = true
      this.errorText = errorText
      return
    },

    validateTopicField () {
      const { tab, title, editor, setErrorText } = this
      if (!tab) {
        return setErrorText('请选择要发布到的板块。')
      } else if (title.length < 10) {
        return setErrorText('标题字数要在 10 个字以上。')
      } else if (!editor.codemirror.getValue()) {
        return setErrorText('请输入要发布的内容。')
      }
      return true
    },

    createTopic () {
      const { tab, title, editor } = this
      if (!this.validateTopicField()) {
        return
      }
      this.$store.dispatch('CREATE_TOPIC', { tab, title, content: editor.codemirror.getValue() })
    }
  },

  mounted () {
    this.editor = new Editor()
    this.editor.render()
  }
}
</script>

<style lang="scss">
@include b(topic-create) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;

  .CodeMirror, .editormd-preview {
    height: 450px;
  }

  @include e(alert) {
    margin-bottom: 20px;
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

  @include e(submit) {
    display: flex;
  }

  @include e(lazy-wrapper) {
    height: 34px;
    margin-top: -5px;
  }

}
</style>
