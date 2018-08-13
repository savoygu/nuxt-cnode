<template>
  <div class="topic topic-comment">
    <div class="topic-comment__header">
      <span>{{replyCount}} 回复</span>
    </div>
    <div class="topic-comment__list">
      <div class="topic-comment__item" v-for="reply in replies" :key="reply.id">
        <div class="topic-comment__author">
          <div class="topic-comment__user">
            <a class="topic-comment__avatar" :href="`/user/${reply.author.loginname}`">
              <img :src="reply.author.avatar_url" :alt="reply.author.loginname">
            </a>
            <a class="topic-comment__name">{{reply.author.loginname}}</a>
            <a class="topic-comment__time" :href="`#${reply.id}`">1楼•{{reply.create_at | timeAgo}}</a>
          </div>
          <div class="topic-comment__action">
            <span :class="{ 'is-uped': reply.is_uped }" @click="starTopic(reply)">
              <i class="cn-icon-star"></i>
              <span class="topic-comment__count">
                {{reply.ups.length}}
              </span>
            </span>
            <a href="#reply-topic" @click="$emit('comment', reply)"><i class="cn-icon-share"></i></a>
          </div>
        </div>
        <div class="topic-comment__content" v-html="reply.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinAuth } from '~/common/utils'

export default {
  name: 'Comment',

  props: {
    replyCount: Number,
    replies: {
      type: Array,
      default () {
        return []
      }
    },
    id: String
  },

  mixins: [mixinAuth],

  data () {
    return {
      repling: {}
    }
  },

  methods: {
    starTopic (reply) {
      if (this.checkAuth()) return

      this.$store.dispatch('STAR_TOPIC', { id: this.id, reply_id: reply.id })
    }
  }
}
</script>

<style lang="scss">
@include b(topic-comment) {
  @include e(header) {
    padding: 10px;
    color: #444;
    border-radius: 3px 3px 0 0;
    background-color: #f6f6f6;
  }

  @include e(item) {
    padding: 10px;
    border-top: 1px solid #f0f0f0;
  }

  @include e(author) {
    display: flex;
    justify-content: space-between;
  }

  @include e(user) {
    display: flex;
  }

  @include e(avatar) {
    img {
      width: 30px;
      height: 30px;
      border-radius: 3px;
    }
  }

  @include e(name) {
    margin-left: 10px;
    font-weight: 700;
    line-height: 20px;
    color: #666;
  }

  @include e(time) {
    margin-left: 4px;
    font-size: 11px;
    line-height: 20px;
    color: #08c;

    @include hover {
      color: #005580;
      text-decoration: underline;
    }
  }

  @include e(action) {
    i {
      opacity: 0.4;
      cursor: pointer;
    }
    span {
      @include is(uped) {
        i {
          opacity: 1;
        }
      }
    }
  }

  @include e(count) {
    color: gray;
  }

  @include e(content) {
    padding-top: 5px;
  }
}

</style>
