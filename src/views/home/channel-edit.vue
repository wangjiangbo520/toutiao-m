<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title">我的频道</div>
      <van-button
        type="danger"
        size="mini"
        plain
        round
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my">
      <van-grid-item
       v-for="(item, index) in this.myChannels"
       :key="index"
       @click="go(item, index)"
       >

        <van-icon
        v-show="isEdit && !fixChannels.includes(item.id)"
        slot="icon"
        name="clear"></van-icon>

        <span slot="text" class="txt"
        :class= "{ channelActive : active === index}"
        >{{ item.name }}</span>
       </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend">
      <van-grid-item
      v-for="(item, index) in remmendChannels"
      :key="index"
      icon="plus"
      :text="item.name"
      @click="addChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannels, deleteChannels } from '@/api/user.js'
import { mapState } from 'vuex'
import { setItem } from '@/store/storage'
export default {
  data () {
    return {
      allChannelsList: [],
      isEdit: false,
      fixChannels: [0] // 固定频道，不能删除
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      try {
        const { data: res } = await getAllChannels()
        this.allChannelsList = res.data.channels
        console.log(res, '所有频道')
      } catch (err) {
        // TODO handle the exception
        console.log(err)
      }
    },

    async addChannel (item) {
      // console.log(item)
      this.myChannels.push(item)

      // 数据持久化处理
      if (this.user) {
        // 登录状态
        try {
          const { data: res } = await addChannels({
            id: item.id,
            seq: this.myChannels.length
          })
          console.log(res, 11)
        } catch (err) {
          // TODO handle the exception
          console.log(err)
        }
      } else {
        // 未登录
        setItem('CHANNELS', this.myChannels)
      }
    },

    async go (item, index) {
      if (this.fixChannels.includes(item.id)) {
        return
      }
      if (this.isEdit) {
        // 删除编辑状态
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('up-active', this.active - 1, true)
        }

        // 处理数据持久化
        if (this.user) {
          // 已登录
          try {
            const { data: res } = await deleteChannels(item.id)
            console.log(res, '删除')
          } catch (err) {
            // TODO handle the exception
            console.log(err)
          }
        } else {
          // 未登录
          setItem('CHANNELS', this.myChannels)
        }
      } else {
        // 执行切换频道
        // 子组件向父组件传有关的值 去修改active，up-active事件名
        this.$emit('up-active', index, false)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    remmendChannels () {
      const channels = []
      this.allChannelsList.forEach(channel => {
        // find 遍历数组,找到满足条件的元素
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }
    // remmendChannels () {
    //   return this.allChannelsList.filter(channel =>{
    //     return !this.myChannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //   })
    // }
  }
}
</script>

<style lang="less">
 .channel-edit {
    padding: 85px 0;
  }
  .van-cell__value {
    height: unset;
  }
  .my {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color:  #bfbfbf;
      z-index: 2;
    }
    .van-grid-item__text{
      margin-top: 0 !important;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .txt {
      margin-top: 0 !important;
      font-size: 28px;
      color: #222;
    }
  }
  .channelActive {
    color: red !important;
  }
  .my, .recommend {
    .van-grid-item__content {
      background-color: #f4f5f6;
      flex-direction: row;
      white-space: nowrap;
    }
    .van-icon-plus {
      font-size: 28px;
      margin-right: 6px;
    }
    .van-grid-item__text {
      margin-top: 0 !important;
      font-size: 28px;
      color: #222;
    }
  }
</style>
