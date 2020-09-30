<template>
  <div class="search-container">
    <form action="/">
      <van-search
        class="search-form"
        v-model="searchTxt"
        show-action
        background="#55aaff"
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResult = false"
      />
    </form>

    <!-- 搜索结果 -->
    <Results
    v-if="isResult"
    :searchKey = "searchTxt"
    ></Results>

    <!-- 联想建议 -->
    <Recommend v-else-if="searchTxt"
    :searchKey = "searchTxt"
    @search="onSearch"
    ></Recommend>

    <!-- 搜索历史记录 -->
    <History
    v-else
    @update-searchHistory = "searchHistory = []"
    @search="onSearch"
    :searchHistory="searchHistory"
    ></History>

  </div>
</template>

<script>
import History from './searchHistory.vue'
import Results from './searchResults.vue'
import Recommend from './searchRecommend.vue'
import { setItem, getItem } from '@/store/storage'
export default {
  data () {
    return {
      searchTxt: '',
      isResult: false, // 搜索结果组件
      searchHistory: getItem('searchHistory') || [] // 存储搜索历史记录
    }
  },
  components: {
    History,
    Results,
    Recommend
  },
  props: {},
  created () {},
  mounted () {},
  computed: {},
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchTxt = val

      // 存储历史记录
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)

      // 渲染搜索结果
      this.isResult = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    // 监视数组searchHistory
    searchHistory (value) {
      setItem('searchHistory', value)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-container {
    padding-top: 108px;
    .van-search__action {
      color: #fff;
    }
    .search-form {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
</style>
