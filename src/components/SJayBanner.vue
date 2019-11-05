<template>
  <div class="SJay-banner" ref="SJayBanner">
    <div class="banner-view">
      <div class="banner-list">
        <slot></slot>
      </div>
    </div>
    <!-- 轮播左右切换 -->
    <div class="prev" @click="activeControl(false)"> &lt; </div>
    <div class="next" @click="activeControl(true)"> &gt; </div>
  </div>
</template>

<script>
export default {
  name: 'SJayBanner',
  props: {
    type: String,
    shownumber: Number,
    automove: Boolean,
    dotnav: Boolean,
  },
  data() {
    return {
      /* 轮播属性 S */
      bannerType: '', // 轮播图类型 2D / 3D
      showNumber: '', // 可视区显示个数
      rowNumber: '', // 轮播个数
      spacing: 5, // 每张间距
      activeNum: 1, // 轮播主视索引
      offsetData: [], // item的偏移位置
      autoMove: false, //自动轮播
      moveTimer: '', //定时器
      time: 5000,
      transTime: 0.8, //缓动时间
      dotNav: false, // 轮播导航
      scale: 1,
      /* 轮播属性 E */
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.SJayBanner()
    this.SJayBannerDom.onmouseenter = () => {
      clearInterval(this.moveTimer)
    }
    if(this.autoMove) {
      this.autoPlay()
       this.SJayBannerDom.onmouseleave = () => {
        this.autoPlay()
      }
    }
    // item 点击轮播 
    this.handleItem()
  },
  methods: {
    // 初始化
    init() {
      this.bannerType = !this.type ? '2D' : this.type // 默认2D 可设置3D
      this.showNumber = !this.shownumber ? '1' : this.shownumber // 默认可视区为
      this.autoMove = !this.automove ? false : this.automove // 默认不可自动轮播
      this.dotNav = !this.dotnav ? false : this.dotnav // 默认没有轮播导航
      if(this.showNumber == 1) {
        this.spacing = 0
      }
      if(this.bannerType == '3D') {
        this.scale = 1.2
      }
    },
    // 轮播图
    SJayBanner() {
      this.SJayBannerDom = this.$refs.SJayBanner
      const SJayBannerWidth = this.SJayBannerDom.offsetWidth * .8
      const
        BannerViewDom = this.SJayBannerDom.getElementsByClassName('banner-view')[0],
        BannerListDom = this.SJayBannerDom.getElementsByClassName('banner-list')[0]
      this.rowNumber = BannerListDom.childNodes.length // item 的数量
      this.itemList = BannerListDom.childNodes
      BannerViewDom.style.width = SJayBannerWidth + 'px' // 设置可视区宽度
      let 
        itemHeight = this.itemList[0].childNodes[0].offsetHeight // item高度
      // 设置item的宽度
      let
        itemWidth = this.bannerType == '2D' ? (SJayBannerWidth - (this.showNumber - 1) * this.spacing) / this.showNumber : SJayBannerWidth * 1/2 //  item宽度 (2D:可视区宽度减去可视间距数 除以可视列表数)
      for(let i = 0;i < this.rowNumber; i++) {
        this.itemList[i].style.width = itemWidth - 5 + 'px'
      }
      BannerListDom.style.width = itemWidth * this.rowNumber + 'px' // 设置item容器的宽度
      BannerListDom.style.height = itemHeight + 40 + 'px'  // 设置item容器的高度
      // 计算偏移量
      let offsetArr = []
      if(this.bannerType === '2D') {
        for(let i = 0;i < this.showNumber + 2;i++) {
          let zIdx
          if(i == 0 || i == this.showNumber + 1) {
            zIdx = 0
          } else {
            zIdx = 1
          }
          let itemOffset = [(itemWidth + this.spacing) * (i - 1), zIdx]
          offsetArr.push(itemOffset)
        }
        if(this.rowNumber <= this.showNumber) {
          this.offsetData = offsetArr.slice(1, this.rowNumber+1)
        } else if(this.rowNumber > this.showNumber) {
          this.offsetData = offsetArr.slice(1, this.showNumber + 2)
          for (let i = 0; i < this.rowNumber - (this.showNumber + 2); i++) {
            this.offsetData.push(offsetArr[0])
          }
        }
      } else if(this.bannerType === '3D') {
        offsetArr = [
          [0, 1], //左边位置
          [(SJayBannerWidth - itemWidth) / 2, 2], // 中间位置
          [SJayBannerWidth - (itemWidth * 2) + itemWidth, 1], //右边位置
          [SJayBannerWidth, 0],
          [-itemWidth, 0],
        ]
        if (this.rowNumber <= 1) {
          this.offsetData = offsetArr[1]
        } else if (this.rowNumber < 5) {
          this.offsetData = offsetArr.slice(0, this.rowNumber)
        } else {
          this.offsetData = offsetArr.slice(0, this.rowNumber)
          for (let i = 0; i < this.rowNumber - 5; i++) {
            this.offsetData.push(offsetArr[4])
          }
        }
      }
      this.itemList.forEach((item, index) => {
        item.classList.add('SJay-item')
        BannerListDom.getElementsByClassName('SJay-item')[index].style.transition = 'all ' + this.transTime + 's ease';
      })
      if (this.dotNav) {
        this.renderNavDot()
      }
      this.activeControl(false)
    },
    // 轮播位置渲染
    move() {
      if (this.activeNum > this.itemList.length - 1) {
        this.activeNum = 0
      }
      if (this.activeNum < 0) {
        this.activeNum = this.itemList.length - 1
      }
      this.itemList.forEach((item, index) => {
        item.style.zIndex = this.offsetData[index][1]
        if (index === this.activeNum) {
          item.style.transform = 'translateX(' + this.offsetData[index][0] + 'px) scale('+ this.scale +')'
        } else {
          item.style.transform = 'translateX(' + this.offsetData[index][0] + 'px) scale(1)'
        }
      })
    },
    // 自动轮播
    autoPlay() {
      if(this.automove) {
        clearInterval(this.moveTimer)
        this.moveTimer = setInterval(() => {
          this.activeControl(true)
        }, this.time)
        // 清除定时器
        this.$once('hook:beforeDestroy', () => {            
            clearInterval(this.moveTimer);                                    
        })
      }
    },
    // 手动轮播
    activeControl(bool) {
        if (bool) {
          this.activeNum ++
          this.offsetData.unshift(this.offsetData.pop());
        } else {
          this.activeNum --
          this.offsetData.push(this.offsetData.shift());
        }
        this.move()
        if (this.dotNav) {
          this.navSdatus()
        }
    },
    // 轮播导航渲染
    renderNavDot() {
      const navWrap = document.createElement('div')
      navWrap.classList.add('benner-nav')
      this.SJayBannerDom.appendChild(navWrap)
      for (let i = 0;i < this.itemList.length; i++) {
        const navDotDom = document.createElement('span')
        navWrap.appendChild(navDotDom)
        if (this.activeNum == i) {
          navWrap.childNodes[i].classList.add('active')
        }
        navWrap.childNodes[i].onclick = () => {
          this.idxControl(i)
        }
      }
    },
    // 跟踪索引状态
    navSdatus() {
      const bannerNav = this.SJayBannerDom.getElementsByClassName('benner-nav')[0]
      for (let i = 0; i < this.itemList.length; i++) {
        bannerNav.childNodes[i].classList.remove('active')
      }
      bannerNav.childNodes[this.activeNum].classList.add('active')
    },
    // 通过索引轮播
    idxControl(idx) {
      const x = this.activeNum - idx
      if (x == 0) {
        return
      }
      if (x > 0) {
        for (let i = 0; i < Math.abs(x); i++) {
          this.activeControl(false)
        }
        return
      }
      if (x < 0) {
        for (let i = 0; i < Math.abs(x); i++) {
          this.activeControl(true)
        }
        return
      }
    },
    handleItem() {
      const itemLists = this.$refs.SJayBanner.getElementsByClassName('banner-list')[0].childNodes
      itemLists.forEach((item, idx) => {
        item.onclick = () => {
          this.idxControl(idx)
        }
      })
    }
  },
}
</script>

<style lang="scss">
  // 自定义轮播样式
  .SJay-banner {
    position: relative;
    width: 100%;
    overflow: hidden;
    .banner-view{
      position: relative;
      padding: 10px 0;
      margin: 0 auto;
      overflow: hidden;
      .banner-list {
        .SJay-item {
          position: absolute;
          top: 24px;
          left: 2px;
          z-index: 0;
          display: inline-block;
          background-color: #FFFFFF;
          overflow: hidden;
          border-radius: 4px;
          outline: 1px solid #ddd;
          cursor: pointer;
        }
      }
    }
    .prev, .next {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 10;
      width: 22px;
      height: 42px;
      margin: auto 0;
      text-align: center;
      line-height: 42px;
      background-color: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
    .prev {
      left: 0;
    }
    .next {
      right: 0;
    }
    .benner-nav {
      text-align: center;
      span {
        position: relative;
        display: inline-block;
        width: 70px;
        height: 4px;
        margin: 10px 6px;
        background-color: #BFBFBF;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
        &:after {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 20px;
          margin: auto;
        }
        &.active {
          background-color: #3D3D3D;
        }
      }
    }
  }
</style>