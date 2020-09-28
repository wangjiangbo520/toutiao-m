import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn' // 全局使用

import relativeTime from 'dayjs/plugin/relativeTime'

// var relativeTime = require('dayjs/plugin/relativeTime')

// 配置插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
// dayjs().format('YYYY - MM - DD')

// 定义全局过滤器，仅可在模板中使用
// 使用方式：{{ 表达式 | 过滤器名称 }}
// value为原本的时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
