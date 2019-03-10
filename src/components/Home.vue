<template>
<div :style="MapDivStyle">
  <div id="map" :style="MapStyle"></div>
  
<!-- 地图控件 -->
  <div class="map-control">
    <!-- 截图按钮 -->
    <div id="screenshot-btn">
      <el-checkbox-group v-model="funcCheckList">
        <el-checkbox style="background-color: white;" border label="截图" @change="handleScreenShot"></el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- 绘图工具列表 -->
    <div id="drawer-selector">
      <el-select v-if="isDrawerSelectedShown" filterable v-model="selectedDrawer"
        @change="onSelectDrawerChange" placeholder="绘图工具">
        
        <el-option v-for="oneDrawer in drawerList" :key="oneDrawer"
        :value="oneDrawer" :label="oneDrawer"></el-option>
        
        <el-option value="" label="">
          <el-button type="text" @click="onExitDraw">退出绘图 <i class="el-icon-circle-close-outline"></i></el-button>
        </el-option>

      </el-select>
      <el-button v-else type="plain" @click="olClickDraw">绘图</el-button>
    </div>
    <!-- WMTS Layer 选择下拉列表 -->
    <div id="wmts-layer-selector">
      <el-select filterable v-model="selectedWMTSLayer" @change="onSelectWMTSLayerChange">
        <el-option v-for="oneLayer in WMTSLayerChoises" :key="oneLayer.Identifier"
        :value="oneLayer.Identifier" :label="oneLayer.Title"></el-option>
      </el-select>
    </div>
  </div>
</div>
</template>

<script>
// 基础模块
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// 导入加载地图服务资源的模块
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

// 控件
import Control from 'ol/control/Control';
import {defaults as defaultControls, Attribution} from 'ol/control.js';

// 绘图工具整合
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import {Style, Fill, Stroke, Icon, Text} from 'ol/style';
import {createRegularPolygon} from 'ol/interaction/Draw';
import Polygon from 'ol/geom/Polygon';
import Draw from 'ol/interaction/Draw';

// 地理要素集合
import Feature from 'ol/Feature';
import {Point,LineString} from 'ol/geom';
import {RegularShape} from 'ol/style';
import Shadow from 'ol-ext/style/Shadow';

// 工具库
import $ from 'jquery';
import echarts from 'echarts';
import {fromLonLat} from 'ol/proj';
// import EChartsLayer from 'ol-echarts';

// 动画
import Path from 'ol-ext/featureanimation/Path';
import {linear, easeOut, easeIn, inAndOut, upAndDown} from 'ol/easing';

import bus from './bus';

export default {
  data() {
    return {
      map: {},
      view: {},
      layers: [],
      baseLayer: null,
      WMTSLayer: null,
      events: [
        {
          eventName: '十五岁的李清照到溪亭游玩',
          time: 1098,
          reignTitle: '元符元年',
          placeString: '溪亭（章丘附近）',
          placeCoordinate: [117.53, 36.72], // EPSG:4326(WGS84)，规定东经为正，北纬为正
        },{
          eventName: '十六岁的李清照随父亲李格非由原籍赴汴京，结识文学上的忘年交晁补之',
          time: 1099,
          reignTitle: '元符二年',
          placeString: '汴京（今河南省开封市）',
          placeCoordinate: [114.35, 34.79],
        }
      ],
      myChart: {},
      MapStyle: {
        width: '100%',
        height: '100%'
      },
      MapDivStyle: {
        position: 'absolute',
        height: '100%',
        width: '100%'
      },
      WMTSResults: {},
      WMTSLayerChoises: [{
        Title: '',
        Identifier: ''
      }],
      selectedWMTSLayer: '加载中...',

      // 功能列表
      funcCheckList: [],

      // 绘图模块
      screenshotLayer: null,
      drawLayer: null,
      Drawer: null,
      isScreenShotCheck: true,

      // 绘图工具表
      selectedDrawer: '',
      isDrawerSelectedShown: false,
      drawerList: ['Point', 'LineString', 'Polygon', 'Circle', 'Square', 'Box'],

      // 历史人物相关数据
      eventsData: []
    }
  }, // data
  methods: {
    preDefine() {
      // view
      this.view = new View({
        center: [13138378.980025196,3947934.292415211],
        zoom: 6.5,
        projection: 'EPSG:3857',
      });

      // layers
      this.WMTSLayer = new TileLayer({
        opacity: 0.9
      });
      this.baseLayer = new TileLayer({
        source: new OSM(),
        opacity: 0.7
      });
      this.layers = [this.baseLayer, this.WMTSLayer];
    },
    createMap() {
      // 创建地图 Canvas
      this.map = new Map({
        target: 'map',
        view: this.view,
        layers: this.layers,
        controls: defaultControls({
          attribution: false,
          zoom: false,
        })
      });

      // 监听鼠标点击事件
      this.map.on('click', event => {
        console.log('点击坐标：(' + event.coordinate.toString() + ')');
        console.log('地图缩放：' + event.map.getView().getZoom());
      });
    },
    addWMTSMap() {
      // 创建解析器
      let parser = new WMTSCapabilities();

      // 获取WMTS数据
      fetch('http://gis.sinica.edu.tw/ccts/wmts/1.0.0/WMTSCapabilities.xml')
      .then( response => {
        return response.text();
      }).then( text => {
        // 解析WMTS数据
        let result = parser.read(text); // 对结果进行解析
        this.WMTSResults = result;

        let options = optionsFromCapabilities(result, {
          layer: 'ad1111',
          matrixSet: 'GoogleMapsCompatible'
        });

        // 添加到map图层中
        this.WMTSLayer.setSource(
          new WMTS(options)
        );

        // 进一步利用数据
        let layers = result.Contents.Layer; // 获取图层（Title：图层名称；Identifier：图层标识码）
        this.WMTSLayerChoises = layers;

        this.selectedWMTSLayer = 'ad1208';

        // let layerNames = layers.map( layer => {
        //   return layer.Title
        // });
        // console.log(layerNames);
      });
    },
    onSelectWMTSLayerChange(Identifier) {

      console.log(Identifier);
      const result = this.WMTSResults;

      let options = optionsFromCapabilities(result, {
        layer: Identifier,
        matrixSet: 'GoogleMapsCompatible'
      });

      this.WMTSLayer.setSource(
        new WMTS(options)
      );
    },
    addControl() {
      this.map.addControl(new Control({
        element: $('.map-control')[0]
      }));
    },
    handleScreenShot(isChecked) {
      const self = this;
      console.log('当前图层数[' + self.map.getLayers().array_.length + ']');
      self.$message('截图功能还没完善哦！');
      if (isChecked) { // 添加 Box 绘图工具
        // 1. 删除原有绘图工具
        if (self.Drawer) {
          self.map.removeInteraction(self.Drawer);
        }
        // 2. 设置截图图层
        if (self.screenshotLayer != null) {
          self.map.removeLayer(self.screenshotLayer);
        }
        self.screenshotLayer = self.getDrawLayer();

        // 3. 更新绘图工具
        let source = self.screenshotLayer.getSource();
        self.Drawer = self.getDrawer('Box', source); // 这个 source 必须和画图所在的 source 一致

        // 4. 添加到地图
        self.map.addLayer(self.screenshotLayer);
        
        self.map.addInteraction(self.Drawer);

      } else {
        // self.map.removeLayer(self.screenshotLayer);
        // 移除地图上的绘图工具
        self.map.removeInteraction(self.Drawer);

        // 删除多选框数组中的元素
        const list = self.funcCheckList;
        let idx = list.indexOf('截图');
        idx != -1 && list.splice(idx, 1);

        // 删除图层
        if (self.screenshotLayer != null) {
          self.map.removeLayer(self.screenshotLayer);
        }

        // self.screenshotLayer.setSource(null);
      }
    },
    onSelectDrawerChange(drawType) {
      const self = this;
      
      let isDrawLayerExist = self.drawLayer == null ? false : true;
      console.log(isDrawLayerExist);

      // 删除原有绘图工具
      if (self.Drawer != null) {
        self.map.removeInteraction(self.Drawer);
      }

      // 如果绘图图层存在
      if (isDrawLayerExist) {
        // 1. 先保存已有绘图内容：source
        let source = self.drawLayer.getSource();

        // 2. 获得新的绘图工具
        self.Drawer = self.getDrawer(drawType, source);
      } 
      // 如果绘图图层不存在
      else {
        // 1. 创建绘图图层
        self.drawLayer = self.getDrawLayer();

        // 2. 添加图层到地图
        self.map.addLayer(self.drawLayer);

        // 2. 更新绘图工具
        let source = self.drawLayer.getSource();
        self.Drawer = self.getDrawer(drawType, source);
      }
      
      // 添加绘图工具到地图
      self.map.addInteraction(self.Drawer);

    },
    getDrawer(drawType, drawSource) {
      if (drawType !== '') {
        
        if (this.drawerList.indexOf(drawType) == -1) {
          return console.error('绘图类型 [' + drawType + '] 不支持');
        }

        let geometryFunction, maxPoints;

        if (drawType === 'Square') {     // 1. 正方形
          drawType = 'Circle';
          geometryFunction = createRegularPolygon(4);
        } else if (drawType === 'Box') { // 2. 长方形
          drawType = 'LineString';
          maxPoints = 2;

          geometryFunction = (coordinates, geometry) => {
            if (!geometry) {
              geometry = new Polygon(coordinates); // 多边形
            }
            let start = coordinates[0];
            let end = coordinates[1];
            geometry.setCoordinates([
              [start, [start[0], end[1]], end, [end[0], start[1]], start]
            ]);

            return geometry;
          }
        }

        return new Draw({
          source: drawSource,
          type: drawType,
          geometryFunction: geometryFunction,
          maxPoints: maxPoints
        });

      } else {
        return null;
      }
    },
    getDrawLayer() {
      let source = new VectorSource({ wrapX: false });
      return new VectorLayer({
        source: source,
        style: new Style({
          fill: new Fill({                  // 填充样式
            color: [255, 255, 255, 0.2]
          }),
          stroke: new Stroke({              // 边界样式
            color: '#ffcc33',
            width: 2
          }),
          image: new CircleStyle({          // 点要素样式
            radius: 7,
            fill: new Fill({
              color: '#ffcc33'
            })
          })
        }), // style
      });
    },
    onExitDraw() {
      const self = this;

      // 清空图层
      if (self.drawLayer != null) {
        self.map.removeLayer(self.drawLayer);
        self.drawLayer.setSource(null);
      }
      if (self.Drawer != null) {
        self.map.removeInteraction(self.Drawer);
        self.Drawer = null;
      }

      self.handleScreenShot(false);

      // 恢复按钮
      self.isDrawerSelectedShown = false;
      self.selectedDrawer = '';
    },
    olClickDraw() {
      const self = this;
      
      self.isDrawerSelectedShown = true;
      self.isScreenShotCheck = false;

      self.handleScreenShot(false);
    },
    addRoute() {
      const self = this;
      // console.log(self.eventsData);

      let coordinates = self.eventsData.map( e => {
        return [parseFloat(e.Lon), parseFloat(e.Lat)];
      });

      // console.log(coordinates);

      // 拟合曲线
      let pointNumber = coordinates.length;
      let newCoordinates = [];
      for (let i=0; i<pointNumber-1; i++) {
        // 两点距离
        let distance = Math.sqrt(Math.pow(coordinates[i+1][0]-coordinates[i][0], 2) + Math.pow(coordinates[i+1][1]-coordinates[i][1], 2));
        
        if (distance == 0) continue;

        newCoordinates.push(coordinates[i]);

        // 数学模型参数
        let offsetX = coordinates[i][0],
            offsetY = coordinates[i][1];
        let A = 0.2 * distance;
        let a = 2*Math.PI / (2 * distance);
        let theta = Math.atan((coordinates[i+1][1] - coordinates[i][1])/(coordinates[i+1][0] - coordinates[i][0]));

        // console.log(offsetX, offsetY, A, a, theta);

        // 插值
        let loopNum = distance / 0.01;
        for (let j=1; j<=loopNum/2; j++) {
          // 计算
          let deltaX = j * distance / loopNum;
          let deltaY = A * Math.sin(a * deltaX);

          // 坐标系变换
          let newX = deltaX * Math.cos(theta) - deltaY * Math.sin(theta) + offsetX;
          let newY = deltaX * Math.sin(theta) + deltaY * Math.cos(theta) + offsetY;

          newCoordinates.push([newX, newY]);
        }
      }

      // console.log(newCoordinates);

      // 创建特征集
      // let featureArr = newCoordinates.map( c => {
      //   return new Feature({
      //     geometry: new Point(fromLonLat(c, 'EPSG:3857'))
      //   });
      // });

      // 点特征
      let PointFeature = coordinates.map( c => {
        return new Feature({
          geometry: new Point(fromLonLat(c, 'EPSG:3857'))
        });
      });
      let featureArr = PointFeature;

      // 线特征
      let lineString = new LineString(coordinates);
      lineString.transform('EPSG:4326', 'EPSG:3857'); 
      let LineFeature = new Feature({
        geometry: lineString
      });

      
      featureArr.push(LineFeature);

      // 设计样式
      let s = [

        // 1
        new Style({
          image: new Shadow({
            radius: 15
          }),
          stroke: new Stroke({
            color: [0,0,0,0.5],
            width: 2
          }),
          fill: new Fill({
            color: [0,0,0,0.5]
          }),
          zIndex: -1
        }),
        
        // 2
        new Style({
          image: new RegularShape({
            radius: 10,
            radius2: 5,
            points: 5,
            fill: new Fill({ color: '#e44f1e' })
          }),
          stroke: new Stroke({
            color: '#a59c5a',
            width: 2
          }),
          fill: new Fill({
            color: '#a59c5a'
          })
        }),

      ]; // style
      // style[1].getImage().getAnchor()[1] += 10;

      // 创建数据源
      let source = new VectorSource({
        features: featureArr
      });

      // 创建图层
      let layer = new VectorLayer({
        source: source,
        style: s
      });

      // 创建动画
      let animateFeature = () => {
        // console.log(path);
        if (LineFeature) {
          let f = new Feature({
            geometry: new Point([0,0]),
            name: '李清照'
          });

          let anim = new Path({
            path: LineFeature,
            rotate: true,
            easing: inAndOut, // linear, easeOut, easeIn, inAndOut
            speed: Number(300), // min="0" max="3" step="0.1"
            revers: false
          });

          layer.animateFeature(f, anim);
        }
      }

      for (var i=0; i<1; i++) {
        setTimeout( animateFeature, i*500 );
      }

      // 添加到地图
      self.map.addLayer(layer);
    },
    createLabelStyle(feature) {
      return new Style({
        image: new Icon({
          anchor: [0.5, 60],
          anchorOrigin: 'top-right',
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          offsetOrigin: 'top-right',
          opacity: 0.75,
          scale: 0.2,
          src: '/img/李清照.jpg'
        }),
        text: new Text({
          textAlign: 'center',
          textBaseline: 'middle',
          font: 'normal 14px 微软雅黑',
          text: feature.get('name'),
          // 文字颜色
          fill: new Fill({color: '#a30'}),
          stroke: new Stroke({color: '#fc3', width: 2})
        })
      });
    },
  }, // methods
  created() {
    const self = this;

    // 预设地图高度
    // const HeaderHeight = 50;
    // self.MapStyle.height = window.innerHeight - HeaderHeight + 'px';

    // 创建地图高度随窗口变化的事件
    // bus.$off('mapResize');
    // bus.$on('mapResize', win => {
    //   let screenHeight = win.innerHeight;
    //   self.MapStyle.height = screenHeight - HeaderHeight + 'px';
    // });

    self.$axios.post('/api/data/events', {
      name: '李清照'
    }).then( response => {
      const data = response.data;
      if (data) {
        self.eventsData = data;
        console.log('查询成功');

        // 添加轨迹
        self.addRoute();
        
      } else {
        self.$message({
          message: '数据为空',
          type: 'info'
        });
      }
    }).catch( err => {
      if (err) {
        self.$message({
          message: '[错误]' + err,
          type: 'error'
        });
      }
    });
  },
  mounted() {
    const self = this;
    // 创建地图
    self.preDefine();
    self.createMap();

    // 添加图层
    self.addWMTSMap();

    // 添加控件
    self.addControl();

  }, // mounted
}
</script>

<style scoped>
#wmts-layer-selector {
  display: inline-block;
  position: relative;
  margin: 0 5px;
}
#drawer-selector {
  display: inline-block;
  position: relative;
  margin: 0 5px;
  max-width: 105px;
}
#screenshot-btn {
  display: inline-block;
  position: relative;
  margin: 0 5px;
}
.map-control {
  position: absolute;
  right: 10px;
  top: 8px;
  width: 100%;
  text-align: right;
}
</style>