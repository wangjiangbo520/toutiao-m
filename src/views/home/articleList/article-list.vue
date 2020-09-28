<template>
  <div class="article-list-container">
    <van-pull-refresh v-model="refreshing"
     @refresh="onRefresh"
     :success-text="successText"
     success-duration="500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >

      <!-- 组件渲染 -->
      <articleListItem
        v-for="item in list"
        :key="item.id"
        :artileData="item"
      ></articleListItem>
<!--        <van-cell v-for="item in list" :key="item.id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import articleListItem from '../articleListItem/artcle-list-item.vue'
export default {
  data () {
    return {
      list: [],
      loading: false, // 控制加载中的状态
      finished: false, // 控制数据加载结束的状态
      error: false, // 控制失败的提示
      refreshing: false, // 控制下拉刷新
      successText: '刷新成功',
      timestamp: null //  请求获取下一页的时间戳
    }
  },
  props: {
    DqChannel: {
      type: Object,
      required: true
    }
  },
  components: {
    articleListItem
  },
  created () {
  },
  methods: {
    // 初始化或者滚到底部的时候会触发调用onload
    async onLoad () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.DqChannel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = res.data
        this.list.push(...results)
        console.log(res)
        this.loading = false

        // 判断数据是否加载完成
        if (results.length) {
          // 如果还有数据更新获取下一页的数据时间戳
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // TODO handle the exception
        // this.$toast('请求超时'.err)
        this.error = true
        this.loading = false
      }
    },

    // 下拉刷新
    async onRefresh () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.DqChannel.id,
          timestamp: Date.now(), //  刷新都是最新的时间戳
          with_top: 1
        })

        // 测试代码
        if (Math.random() > 0.5) {
          JSON.parse('qwrrqss')
        }
        // 把数据追加到最顶部
        this.list.unshift(...res.data.results)

        // 刷新数据提示
        const resfreshData = res.data.results
        this.successText = `刷新成功，更新了${resfreshData.length}条数据`
        // 关闭下拉刷新状态
        this.refreshing = false
      } catch (err) {
        // TODO handle the exception
        this.successText = '刷新失败'
        this.refreshing = false
      }
    }
  }
}
</script>

<style>
  .article-list-container {
    overflow-y: auto;
    height: 79vh;
  }
</style>
