<template>
  <div class="articleListItemContainer">
    <van-cell>
      <div slot="title" class="title">{{ artileData.title }}</div>
      <div slot="label">
        <div v-if="artileData.cover.type === 3">
          <van-image
            class="left-cover"
            v-for="(item, index) in artileData.cover.images"
            :key="index"
            src="item"
          />
        </div>
        <span>{{ artileData.aut_name }}</span>
        <span>{{ artileData.comm_count }}</span>
        <span>{{ artileData.pubdate | relativeTime }}</span>
      </div>
      <van-image
        class="right-cover"
        v-if="artileData.cover.type === 1"
        slot="default"
        fit="cover"
        src="artileData.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    artileData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .articleListItemContainer span {
    margin-right: 30px;
  }

.articleListItemContainer {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
     width: 232px;
     height: 146px;
  }
  .left-cover {
     width: 210px;
     height: 120px;
     margin-right: 10px;
  }
}
</style>
