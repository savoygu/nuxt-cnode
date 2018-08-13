<template>
  <div class="main">
    <div class="main__content">
      <lazy-wrapper :loading="item.loading">
        <div class="main__panel">
          <div class="topic topic-article">
            <div class="topic-article__header">
              <h3 class="topic-article__title"><span>{{item.top ? '置顶' : item.good ? '精品' : item.tab && tabs[item.tab].name}}</span>
                {{item.title}}
              </h3>
              <div class="topic-article__changes">
                <div>
                  <span>
                    发布于 {{ item.create_at | timeAgo }}
                  </span>
                  <span v-if="item.author">
                    作者 {{item.author.loginname}}
                  </span>
                  <span>
                    {{item.visit_count}} 次预览
                  </span>
                  <span>
                    最后一次回复是 {{item.last_reply_at | timeAgo}}
                  </span>
                  <span>
                    来自 {{tabs[item.tab] && tabs[item.tab].name}}
                  </span>
                </div>
                <div style="display: flex;">
                  <div class="topic-article__lazy-wrapper"><lazy-wrapper :loading="loading"></lazy-wrapper></div>
                  <button class="topic-article__collection" :class="item.is_collect ? 'button--white' : 'button--green'" @click="collectTopic">{{ item.is_collect ? '取消收藏': '收藏' }}</button>
                </div>
              </div>
              <div class="topic-article__manage" v-if="currentUser.loginname === user.loginname">
                <a :href="`/topic/${item.id}/edit`"><i class="cn-icon-edit"></i></a>
              </div>
            </div>
            <div class="topic-article__content">
              <div class="topic-article__markdown" v-html="item.content"></div>
            </div>
          </div>
        </div>
        <div class="main__panel">
          <comment :reply-count="item.reply_count" :id="item.id" :replies="item.replies"></comment>
        </div>
      </lazy-wrapper>
      <div class="main__panel">
        <div class="main__header">
          添加回复
        </div>
        <div class="topic topic-reply">
          <div class="topic-reply__inner">
            <textarea rows="8" style="display: none;"></textarea>
          </div>
          <button class="button--blue" @click="replyTopic">回复</button>
          <alert type="error" v-model="visible" :text="errorText"></alert>
        </div>
      </div>
    </div>
    <div class="main__sidebar sidebar">
      <personal header="作者" :user="user"></personal>
      <noreply-topic header="作者其它话题"></noreply-topic>
      <noreply-topic></noreply-topic>
    </div>
  </div>
</template>

<script>
import LazyWrapper from '~/components/lazy-wrapper'
import Comment from '~/components/comment'
import Personal from '~/components/sidebar/personal'
import NoreplyTopic from '~/components/sidebar/noreply-topic'
import { tabs } from '~/common/constants'
import Alert from '~/components/alert'

export default {
  name: 'Topic',

  components: {
    LazyWrapper,
    Comment,
    Personal,
    NoreplyTopic,
    Alert
  },

  head() {
    return {
      title: this.item.title,
      // script: [
      //   { innerHTML: 'window.onload = function () { prettyPrint() }', type: 'text/javascript', body: true }
      // ]
      link: [
        { rel: 'stylesheet', href: '//cdn.jsdelivr.net/editor/0.1.0/editor.css' }
      ],
      script: [
        { src: '//cdn.jsdelivr.net/editor/0.1.0/editor.js' },
        { src: '//cdn.jsdelivr.net/editor/0.1.0/marked.js' }
      ]
    }
  },

  fetch ({ store, params: { id } }) {
    return store.dispatch('FETCH_ITEM', { id })
  },

  data () {
    return {
      tabs,
      visible: false,
      errorText: ''
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
    item () {
      return this.$store.state.items[this.id]
    },
    user () {
      const { loginname, avatar_url } = this.item.author || {}
      return this.$store.state.users[loginname] || {
        loginname,
        avatar_url
      }
    },
    currentUser () {
      return this.$store.state.user || {}
    },
    loading () {
      return this.$store.state.loading
    }
  },

  methods: {
    collectTopic () {
      this.$store.dispatch('COLLECT_TOPIC', { id: this.id, cancel: this.item.is_collect })
    },

    replyTopic () {
      const content = this.editor.codemirror.getValue()
      if (!content) {
        this.visible = true
        this.errorText = '请输入回复的内容。'
        return
      }
      this.$store.dispatch('REPLY_TOPIC', { id: this.id, content })
    }
  },

  updated () {
    var toolbar = document.querySelector('.editor-toolbar')
    this.$nextTick(_ => {
      if (!toolbar) {
        this.editor = new Editor({
          status: false
        })
        this.editor.render()
      }
    })
  },

  mounted () {
    prettyPrint()
    this.$nextTick(_ => {
      this.editor = new Editor({
        status: false
      })
      this.editor.render()
    })
  }
}
</script>

<style lang="scss">
@include b(topic-article) {

  @include e(header) {
    padding: 10px;
    border-radius: 3px 3px 0 0;
  }

  @include e(title) {
    width: 75%;
    margin: 8px 0;
    font-size: 22px;
    font-weight: 700;
    line-height: 130%;

    span {
      font-size: 12px;
      padding: 2px 4px;
      color: #fff;
      background: #80bd01;
      border-radius: 3px;
    }
  }

  @include e(changes) {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #838383;

    span {
      &::before {
        content: "•";
      }
    }
  }

  @include e(manage) {
    i {
      color: #000;
      opacity: .4;
    }

    &:hover {
      i {
        opacity: 1;
      }
    }
  }

  @include e(content) {
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    border-radius: 0 0 3px 3px;
  }

  @include e(markdown) {
    margin: 0 10px;
  }

  @include e(lazy-wrapper) {
    display: inline-block;
    height: 34px;
    margin-top: -5px;
  }

}

@include b(topic-reply) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;

  textarea {
    width: 98%;
    height: 200px;
    padding: .5em;
    font-size: 15px;
    line-height: 2em;
    resize: vertical;
  }

  .CodeMirror {
    height: 160px;
  }

  button {
    margin: 10px 0;
  }
}

</style>
