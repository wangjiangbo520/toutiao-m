<template>
<div class="home-container">
  <van-nav-bar fixed>
    <van-button
    class="search"
    slot="title"
    size="small"
    type="info"
    round
    icon="search"
    to="/search"
    >搜索</van-button>
  </van-nav-bar>
  <van-tabs v-model="active" animated swipeable>
    <van-tab
    :title="item.name"
    v-for="item in channelsList"
    :key="item.id">
    <!-- 文章内容区域，不包括导航 -->
      <articleList :DqChannel="item"></articleList>

    </van-tab>
    <div slot="nav-right" class="slot"></div>
    <div slot="nav-right" class="hamburder-btn"
    @click="popupShow=true">
      <van-icon name="wap-nav" />
    </div>
  </van-tabs>

  <!-- 频道弹出层 -->
  <van-popup
    v-model="popupShow"
    closeable
    position="bottom"
     close-icon-position="top-left"
    :style="{ height: '100%' }"
  >
  <!-- @up-active监听子组件channel-edit -->
    <channelEdit
    :active="active"
    @up-active = "onUpActive"
    :myChannels="channelsList"></channelEdit>
  </van-popup>
</div>
</template>

<script>
import { getUserChanenls } from '@/api/user.js'
import articleList from './articleList/article-list.vue'
import channelEdit from './channel-edit.vue'
import { getItem } from '@/store/storage'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      channelsList: [],
      popupShow: false
    }
  },
  components: {
    articleList,
    channelEdit
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        // const { data: res } = await getUserChanenls()
        // this.channelsList = res.data.channels
        // console.log(res.data.channels, '频道列表')
        if (this.user) {
          // 已登录
          const { data: res } = await getUserChanenls()
          this.channelsList = res.data.channels
        } else {
          // 未登录
          const local = getItem('CHANNELS')
          if (local) {
            this.channelsList = local
          } else {
            const { data: res } = await getUserChanenls()
            this.channelsList = res.data.channelss
          }
        }
      } catch (e) {
        // TODO handle the exception
        this.$toast('获取频道列表失败')
      }
    },
    onUpActive (index, check) {
      console.log(index)
      this.active = index
      this.popupShow = check
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  padding-top: 192px;
}
.van-nav-bar {
  height: 110px;
  background-color: blue;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.search {
  width: 555px;
  height: 64px;
}
.van-icon-search {
  color: #fff;
}
/deep/ .van-tabs {
  .van-tabs__wrap{
    position: fixed;
    top: 110px;
    z-index: 1;
    height: 82px;
    left: 0;
    right: 0;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777;
  }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
  .slot {
    flex-shrink: 0;  //不参与flex剩余空间
    width: 66px;
    height: 82px;
  }
  .hamburder-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.902;
    .van-icon {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background:-webkit-linear-gradient(top, #989898, #353535, #989898);
    }
  }
}
</style>
