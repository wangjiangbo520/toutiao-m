<template>
  <div class="recommend-container">
    <van-cell
    :key = "index"
    v-for="(item, index) in suggestList"
    :title="item"
    @click="$emit('search', item)"
    icon="search">
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggest } from '@/api/user.js'
// 按需加载
import { debounce } from 'lodash'
export default {
  data () {
    return {
      suggestList: []
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
    // 匹配高亮
    highlight (item) {
      const htmlStr = `<span style="color:red">${this.searchKey}</span>`
      const reg = new RegExp(this.searchKey, 'gi')
      // 把item里的reg换成htmlStr
      return item.replace(reg, htmlStr)
    }
  },
  watch: {
    searchKey: {
      // async handler (value){}
      // 防抖 debounce
      handler: debounce(async function (value) {
        // console.log(value)
        try {
          const { data: res } = await getSuggest(value)
          this.suggestList = res.data.options
          console.log(res.data.options)
        } catch (err) {
          // TODO handle the exception
          console.log(err)
        }
      }, 500),
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
