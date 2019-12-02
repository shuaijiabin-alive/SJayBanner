<template>
  <div class="count-roll-wrap">
    数字滚动
    <div id="count-view">
      <ul v-for="(i, index) in String(endNum).length" :key="index" class="count-item">
        <li v-for="(num, idx) in 10" :key="idx">{{ idx }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { clearInterval } from 'timers'
export default {
  name: 'countRoll',
  data() {
    return {
      starNum: 4247,
      endNum: 20000,
      coutHtml: ''
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    /**
     * 1.通过transform:translateY改变位置滚动
     * 2.通过递归进行滚动速度变化 由慢到快，由快到慢
     * 3.检测数字长度：数字末位数滚动时为 0 时，该位数前一位向上滚动一格
     */
    // 初始化
    init() {
      let countDom = document.getElementById('count-view')
      let countItemDom = countDom.getElementsByClassName('count-item')
      // 获取可视区的高度
      const viewH = countItemDom[0].childNodes[0].getBoundingClientRect().height // 获取精准高度
      countDom.style.height = viewH + 'px'
      let starNumStr = String(this.starNum)
      for (let index = starNumStr.length-1; index >= 0; index--) {
        let digitDom = countItemDom[countItemDom.length-starNumStr.length+index] // 根据初始数据在总位数上获取位数
        // 根据位数上的数字判断是否需要转格和顶部删除尾部添加
        digitDom.style.transform = 'translateY('+ -viewH*starNumStr[index] +'px)'
        // if(starNumStr[index] == 0) {
        //   digitDom.style.transform = 'translateY('+ 0 +'px)'
        // } else if(starNumStr[index] > 0 && starNumStr[index] < 2) {
        //   digitDom.style.transform = 'translateY('+ -viewH +'px)'
        // } else if(starNumStr[index] >= 2) {
        //   for (let i = 0; i < starNumStr[index]-1; i++) {
        //     digitDom.style.transform = 'translateY('+ -viewH +'px)'
        //     // let topItem = digitDom.childNodes[0].cloneNode(true)
        //     // digitDom.removeChild(digitDom.childNodes[0])
        //     // digitDom.appendChild(topItem)
        //   }
        // }
      }
      this.countRoll()
    },
    countRoll() {
      var Timer = ''
      let addNum = 0
      let countDom = document.getElementById('count-view')
      let countItemDom = countDom.getElementsByClassName('count-item')
      const viewH = countItemDom[0].childNodes[0].getBoundingClientRect().height // 获取精准高度
      var idx = 1
      // Timer = setInterval(() => {
        addNum += 1
        countItemDom[countItemDom.length-1].style.transform = 'translateY('+ -addNum*viewH +'px)'
        if(addNum == 10) {
          addNum = 0
          idx ++
          countItemDom[countItemDom.length-idx].style.transform = 'translateY('+ -addNum*viewH +'px)'
          // let topItem = countItemDom[countItemDom.length-1].childNodes[0].cloneNode(true)
          // countItemDom[countItemDom.length-1].removeChild(countItemDom[countItemDom.length-1]
          // .childNodes[0])
          // countItemDom[countItemDom.length-1].appendChild(topItem)
        }
      // },100)
    }
  },
}
</script>

<style lang="scss" scoped>
  .count-roll-wrap {
    #count-view {
      overflow: hidden;
      ul {
        display: inline-block;
        list-style: none;
        padding: 0;
        margin: 0;
        transition: all 0.1s ease-in-out;
        li {
          font-size: 20px;
        }
      }
    }
  }
</style>