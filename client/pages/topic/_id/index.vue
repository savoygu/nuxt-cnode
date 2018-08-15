<template>
  <div class="main">
    <div class="main__content">
      <lazy-wrapper :loading="item.loading">
        <div class="main__panel">
          <div class="topic topic-article">
            <div class="topic-article__header">
              <span class="topic-article__title"><span>{{item.top ? '置顶' : item.good ? '精品' : item.tab && tabs[item.tab].name}}</span>
                {{item.title}}
              </span>
              <div class="topic-article__changes">
                <div>
                  <span>
                    发布于 {{ item.create_at | timeAgo }}
                  </span>
                  <span v-show="item.author">
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
              <div class="topic-article__manage" v-show="currentUser.loginname === user.loginname">
                <a :href="`/topic/${item.id}/edit`"><i class="cn-icon-edit"></i></a>
              </div>
            </div>
            <div class="topic-article__content">
              <div class="topic-article__markdown" v-html="item.content"></div>
            </div>
          </div>
        </div>
        <div class="main__panel">
          <comment :reply-count="item.reply_count"
            :id="item.id"
            :replies="item.replies"
            @comment="commentTopic"></comment>
        </div>
      </lazy-wrapper>
      <div class="main__panel" id="reply-topic">
        <div class="main__header">
          添加回复
        </div>
        <div class="topic topic-reply">
          <no-ssr>
            <div class="topic-reply__inner">
              <textarea rows="8" style="display: none;" class="reply-0"></textarea>
            </div>
          </no-ssr>
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
import { mixinAuth } from '~/common/utils'

export default {
  name: 'Topic',

  components: {
    LazyWrapper,
    Comment,
    Personal,
    NoreplyTopic,
    Alert
  },

  head () {
    return {
      title: this.item.title,
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

  mixins: [mixinAuth],

  data () {
    return {
      tabs,
      visible: false,
      errorText: '',
      reply: {}
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
      if (this.checkAuth()) return

      this.$store.dispatch('COLLECT_TOPIC', { id: this.id, cancel: this.item.is_collect })
    },

    replyTopic () {
      if (this.checkAuth()) return

      const content = this.editor.codemirror.getValue()
      if (!content) {
        this.visible = true
        this.errorText = '请输入回复的内容。'
        return
      }
      let data = { id: this.id, content }
      if (this.reply.id) {
        data.reply_id = this.reply.id
      }
      this.$store.dispatch('REPLY_TOPIC', data)
    },

    commentTopic (reply) {
      if (this.checkAuth()) return

      this.editor.codemirror.getDoc().setValue(`@${reply.author.loginname} `)
      this.reply = reply
    }
  },

  updated () {
    this.$nextTick(_ => {
      var toolbar = document.querySelector('.editor-toolbar')
      if (!toolbar) {
        this.editor = new Editor({
          element: document.querySelector('.reply-0'),
          status: false
        })
        this.editor.render()
      }
    })
  },

  mounted () {
    this.$nextTick(_ => {
      prettyPrint()
      this.editor = new Editor({
        element: document.querySelector('.reply-0'),
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
    display: inline-block;
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

@media screen and (max-width: $--break-middle) {
  .topic-article__changes {
    flex-direction: column;
  }
  .topic-article__collection {
    margin-top: 10px;
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
