<template>
<div class="history-container">
    <van-cell
    v-if="searchHistory.length > 0"
     title="搜索历史">
      <div v-if="isShow">
        <span @click="$emit('update-searchHistory')">全部删除</span>
        &ensp; &ensp;
        <span @click="isShow = false">完成</span>
      </div>
      <van-icon
       v-else
       @click="isShow = true"
       name='delete'
       ></van-icon>
    </van-cell>
    <van-cell v-for="(item, index) in searchHistory"
     :title="item"
     :key="index"
     @click="SHistory(item)"
     >
      <van-icon
      v-show="isShow"
      name='close'
      @click="deleteHistory(index)"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  components: {},
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    deleteHistory (index) {
      if (this.isShow) {
        this.searchHistory.splice(index, 1)
      }
    },
    SHistory (item) {
      if (!this.isShow) {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
