<template>
  <div id="antg2-map" style="width:1000px;">
  </div>
</template>

<script>
import G2 from '@antv/g2';
import { DataSet } from '@antv/data-set';
export default {
  name: 'antg2',
  data() {
    return {
      chinaMap: ''
    }
  },
  created() {
    this.init()
  },
  mounted() {
    
  },
  methods: {
    init() {
      this.$axios.get('https://geo.datav.aliyun.com/areas/bound/100000_full.json').then(res => {
        this.chinaMap = res.data
        this.randenMap()
      })
    },
    randenMap() {
      var chart = new G2.Chart({
        container: 'antg2-map',
        forceFit: true,
        height: window.innerHeight,
        padding: [55, 20]
      });
      chart.tooltip({
        showTitle: false
      });
      // 同步度量
      chart.scale({
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      });
      chart.axis(false);
      chart.legend('trend', {
        position: 'left'
      });
      
      // 绘制世界地图背景
      var ds = new DataSet();
      var chinaMap = ds.createView('back').source(this.chinaMap, {
        type: 'GeoJSON'
      });
      var chinaMapView = chart.view();
      chinaMapView.source(chinaMap);
      chinaMapView.tooltip(false);
      chinaMapView.polygon().position('longitude*latitude').style({
        fill: '#fff',
        stroke: '#ccc',
        lineWidth: 1
      });
      // var userData = [{
      //   name: '上海市',
      //   value: 86.8
      // }, {
      //   name: '云南省',
      //   value: 106.3
      // }, {
      //   name: '湖北省',
      //   value: 94.7
      // }]


      var userData = [{
        "name": "云南省",
        "lat": "25.7",
        "lng": "100.2",
        "deaths": "2000",
        "magnitude": "7.5",
      },{
        "name": "湖北省",
        "lat": "40.7",
        "lng": "60.2",
        "deaths": "1000",
        "magnitude": "7.5",
      }]
      // var userData = [{
      //     "name":"湖北省",
      //     "value":'123',
      //     'coordinate': [121.15, 31.89],
      // }]
      const dv = ds.createView().source(userData);
      dv.transform({
        geoDataView: chinaMap,
        field: 'name',
        type: 'geo.region',
        as: ['longitude', 'latitude']
      }).transform({
        type: 'map',
        callback: function callback(obj) {
          var projectedCoord = dv.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator');
          obj.x = projectedCoord[0];
          obj.y = projectedCoord[1];
          obj.deaths = obj.deaths * 1;
          obj.magnitude = obj.magnitude * 1;
          console.log(obj)
          return obj;
        }
      })
      chart.legend(false);
      var userView = chart.view();
      userView.source(dv, {
        'trend': {
          alias: ''
        }
      });
      userView.point().position('200*140')
      .color('trend', ['red', '#fff'])
      .tooltip('deaths')
      .shape('circle')


      // var userDv = ds.createView().source(userData).transform({
      //   geoDataView: chinaMap,
      //   field: 'name',
      //   type: 'geo.region',
      //   as: ['longitude', 'latitude']
      // }).transform({
      //   type: 'map',
      //   callback: function callback(obj) {
      //     obj.trend = obj.value;
      //     return obj;
      //   }
      // });
      // var userView = chart.view();
      // userView.source(userDv, {
      //   'trend': {
      //     alias: ''
      //   }
      // });
      // userView.polygon().position('longitude*latitude').color('trend', ['#F51D27', '#0A61D7']).opacity('value').tooltip('name*trend').animate({
      //   leave: {
      //     animation: 'fadeOut'
      //   }
      // });
      chart.render();
    }
  },
}
</script>

<style lang="" scoped>
  
</style>