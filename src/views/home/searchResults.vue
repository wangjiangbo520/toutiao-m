<template>
<div class="results-container">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
>
  <van-cell v-for="(item, index) in searchList" :key="index" :title="item.title" />
</van-list>
</div>
</template>

<script>
import { getSearhResults } from '@/api/user.js'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      searchList: [],
      error: false // 控制失败的提示
    }
  },
  components: {},
  props: {
    searchKey: {
      type: String,
      required: true
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getSearhResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchKey
        })
        console.log(res.data.results, '搜索结果')
        const { results } = res.data
        this.searchList.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        // TODO handle the exception
        // this.$toast('数据获取失败，请稍后再试')
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
