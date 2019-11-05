<template>
  <div id='map' style='width:100%; height:600px;'></div>
</template>

<script>
    const districts= [
        { 'value': '99', 'name': '北京市', 'center': '116.407394,39.904211' },
        { 'value': '10', 'name': '天津市', 'center': '117.200983,39.084158' },
        { 'value': '99', 'name': '河北省', 'center': '114.530235,38.037433' },
        { 'value': '77', 'name': '山西省', 'center': '112.562678,37.873499' },
        { 'value': '10', 'name': '内蒙古自治区', 'center': '111.76629,40.81739' },
        { 'value': '99', 'name': '辽宁省', 'center': '123.431382,41.836175' },
        { 'value': '77', 'name': '吉林省', 'center': '125.32568,43.897016' },
        { 'value': '42', 'name': '黑龙江省', 'center': '126.661665,45.742366' },
        { 'value': '99', 'name': '上海市', 'center': '121.473662,31.230372' },
        { 'value': '99', 'name': '江苏省', 'center': '118.762765,32.060875' },
        { 'value': '77', 'name': '浙江省', 'center': '120.152585,30.266597' },
        { 'value': '99', 'name': '安徽省', 'center': '117.329949,31.733806' },
        { 'value': '63', 'name': '福建省', 'center': '119.295143,26.100779' },
        { 'value': '99', 'name': '江西省', 'center': '115.81635,28.63666' },
        { 'value': '10', 'name': '山东省', 'center': '117.019915,36.671156' },
        { 'value': '99', 'name': '河南省', 'center': '113.753394,34.765869' },
        { 'value': '99', 'name': '湖北省', 'center': '114.341745,30.546557' },
        { 'value': '77', 'name': '湖南省', 'center': '112.9836,28.112743' },
        { 'value': '99', 'name': '广东省', 'center': '113.26641,23.132324' },
        { 'value': '63', 'name': '广西壮族自治区', 'center': '108.327546,22.815478' },
        { 'value': '99', 'name': '海南省', 'center': '110.349228,20.017377' },
        { 'value': '42', 'name': '重庆市', 'center': '106.551643,29.562849' },
        { 'value': '99', 'name': '四川省', 'center': '104.075809,30.651239' },
        { 'value': '77', 'name': '贵州省', 'center': '106.70546,26.600055' },
        { 'value': '99', 'name': '云南省', 'center': '102.710002,25.045806' },
        { 'value': '10', 'name': '西藏自治区', 'center': '91.117525,29.647535' },
        { 'value': '99', 'name': '陕西省', 'center': '108.954347,34.265502' },
        { 'value': '77', 'name': '甘肃省', 'center': '103.826447,36.05956' },
        { 'value': '42', 'name': '青海省', 'center': '101.780268,36.620939' },
        { 'value': '99', 'name': '宁夏回族自治区', 'center': '106.259126,38.472641' },
        { 'value': '77', 'name': '新疆维吾尔自治区', 'center': '87.627704,43.793026' },
        { 'value': '63', 'name': '台湾省', 'center': '121.509062,25.044332' },
        { 'value': '99', 'name': '香港特别行政区', 'center': '114.171203,22.277468' },
        { 'value': '10', 'name': '澳门特别行政区', 'center': '113.543028,22.186835' }
      ]
export default {
  name: '',
  data() {
    return {
      
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // 通过值的大小改变颜色
        function rgbaToHex(color) {
	        var values = color
	          .replace(/rgba?\(/, '')
	          .replace(/\)/, '')
	          .replace(/[\s+]/g, '')
	          .split(',');
	        var a = parseFloat(values[3] || 1),
	          r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
	          g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
	          b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);

	        return "#" +
	          ("0" + r.toString(16)).slice(-2) +
	          ("0" + g.toString(16)).slice(-2) +
	          ("0" + b.toString(16)).slice(-2);
        }
        function getColorByNumber(n,max) {
          let halfMax = max / 2  //最大数值的二分之一
          //var 百分之一 = (单色值范围) / halfMax;  单颜色的变化范围只在50%之内
          var one = 255 / halfMax; 
          console.log('one= ' + one)
          var r = 0;
          var g = 0;
          var b = 0;

          if (n < halfMax) {
            // 比例小于halfMax的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
            r = one * n;  
            g = 255;
          }

          if (n >= halfMax) {
            // 比例大于halfMax的时候绿色是越来越少的,直到0 变为纯红
            g = (255 - ((n - halfMax) * one)) < 0 ? 0 : (255 - ((n - halfMax) * one))
            r = 255;

          }
          r = parseInt(r);// 取整
          g = parseInt(g);// 取整
          b = parseInt(b);// 取整

          // console.log(r,g,b)
          return rgbaToHex("rgb(" + r + "," + g + "," + b + ")");
        }

      let newdistricts = districts.sort((a,b) => {
        return a.value - b.value
      })
      // var max = Math.max.apply(null, newdistricts);

      function getColor2(name) {
        newdistricts.map(item => {
          if(name === item.name) {
            // console.log(item.value, 63)
             console.log(getColorByNumber(item.value, 63))
          }
        })
        
      }

      // var map = new AMap.Map('map', {
      //     // mapStyle: 'amap://styles/macaron',
      //     resizeEnable: true,
          
      //     center: [107.4976, 32.1697],
      //     zoom: 4,
      //     features: ['bg', 'road'],
      //     // layers:[
      //     //   disCountry,
      //     //   new AMap.TileLayer()
      //     // ],
      // });
      // const valueArr = []
      // var disCountry = new AMap.DistrictLayer.Country({
      //   map: map,
      //   zIndex:10,
      //   // SOC:'CHN',
      //   depth:1,
      //   styles:{
      //       'nation-stroke':'#ddd',
      //       'coastline-stroke':'#ddd', // 海岸线颜色
      //       'province-stroke':'#ddd',
      //       'fill': (props) => {
      //         return getColor2(props.NAME_CHN)
      //       },
            
      //   }
      // })


      // var layer = new Loca.PointLayer({
      //     eventSupport: true,
      //     map: map
      // });

      // layer.on('mousemove', function (ev) {
      //     // 事件类型
      //     var type = ev.type;
      //     // 当前元素的原始数据
      //     var rawData = ev.rawData;
      //     // 原始鼠标事件
      //     var originalEvent = ev.originalEvent;

      //     openInfoWin(map, originalEvent, {
      //         '名称': rawData.name,
      //         '位置': rawData.center
      //     });
      // });

      // layer.on('mouseleave', function (ev) {
      //     closeInfoWin();
      // });

      // layer.setData(districts, {
      //     lnglat: 'center'
      // });

      // layer.setOptions({
      //   style: {
      //       radius: 6,
      //       color: '#ddd',
      //       borderColor: '#ffffff',
      //       borderWidth: 1.5,
      //   },
      //   selectStyle: {
      //       radius: 10,
      //       color: '#ffe30a'
      //   }
      // });

      // layer.render();
    },
  },
}
</script>

<style lang="scss" scoped>
  /deep/ .info {
    background: #363F49;
    color: #A0A7B4;
    padding: 10px;
    max-width: 300px;
    min-width: 200px;
    font-size: 12px;
  }
  /deep/ .info tr .content {
    text-align: right;
    color: #D3D8E0;
    max-width: 200px;
  }
</style>