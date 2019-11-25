<template>
  <div class="count-roll">
    数字滚动
    <div class="count">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <ul>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'countRoll',
  data() {
    return {
      starNum: '1000',
      endNum: '20000',
      coutHtml: ''
    }
  },
  created() {
    // this.init()
  },
  methods: {
    /**
     * 1.通过transform:translateY改变位置滚动
     * 2.通过递归进行滚动速度变化 由慢到快，由快到慢
     * 3.检测数字长度：（方法一）每滚动完一次就检测数字位数变化 （方法二）数字末位数滚动时为9，检测
     */
    // 初始化
    init() {
      for(let i = 0; i < this.starNum.length; i++) {
        this.coutHtml += '<span>'+ this.starNum[i] +'</span>'
      }
    },
    countRoll() {

    }
  },
}
</script>

<style lang="scss" scoped>
  .count-roll {
    .count {
      height: 20px;
      overflow: hidden;
      ul {
        display: inline-block;
        list-style: none;
        padding: 0;
        margin: 0;
        transform: translateY(-20px);
        li {
          
        }
      }
    }
  }
</style>