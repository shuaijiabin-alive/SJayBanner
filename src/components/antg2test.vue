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
        padding: [0, 20, 40]
      });
      // force sync scales
      chart.scale({
        x: {
          sync: true,
          nice: false
        },
        y: {
          sync: true,
          nice: false
        }
      });
      chart.coord().reflect();
      chart.legend(false);
      chart.axis(false);

      // style the tooltip
      chart.tooltip({
        showTitle: false,
      });
      // data set
      var ds = new DataSet();

      // draw the map
      var dv = ds.createView('back').source(this.chinaMap, {
        type: 'GeoJSON'
      }).transform({
        type: 'geo.projection',
        projection: 'geoMercator',
        as: ['x', 'y', 'centroidX', 'centroidY']
      });
      var bgView = chart.view();
      bgView.source(dv);
      bgView.tooltip(false);
      bgView.polygon().position('x*y').style({
        fill: '#DDDDDD',
        stroke: '#b1b1b1',
        lineWidth: 0.5,
        fillOpacity: 0.85
      });
      var data = [
        {
            "location": "北京市",
            "lat": "39.0",
            "lng": "116.0",
            "deaths": "180",
        }, {
            "location": "Nan'ao, Guangdong (Kwangtung), China",
            "lat": "23.5",
            "lng": "117.2",
            "deaths": "1000",
        }, {
            "location": "Haiyuan, Ningxia (Ning-hsia), China",
            "lat": "36.5",
            "lng": "105.7",
            "deaths": "200",
        }, {
            "location": "Near Luhuo, Sichuan (Szechwan), China",
            "lat": "31.3",
            "lng": "100.8",
            "deaths": "3500",
        }
      ]
      // draw the bubble plot
      var userData = ds.createView().source(data);
      userData.transform({
        type: 'map',
        callback: function callback(obj) {
          var projectedCoord = dv.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator');
          console.log(obj, projectedCoord)
          obj.x = projectedCoord[0];
          obj.y = projectedCoord[1];
          obj.deaths = obj.deaths * 1;
          obj.magnitude = obj.magnitude * 1;
          return obj;
        }
      });
      var pointView = chart.view();
      pointView.source(userData);
      pointView.point().position('x*y').size('deaths', [2, 30]).shape('circle').opacity(0.45).color('#FF2F29').tooltip('deaths');

      chart.render();
    }
  },
}
</script>

<style lang="" scoped>
  
</style>