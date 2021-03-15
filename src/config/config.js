//地图初始化参数配置
const InitMapConfig = {
  AppSetting: {
    LanIP: "192.168.1.130", //内外IP
    WanIp: "192.168.1.130", //外网IP
    Port: "777", //端口
  },
  Map: {
    //Map 初始化参数
    center: [109.43681680276745, 29.443832291204473], //地图中心点
    zoom: 11, //zoom, //初始化缩放级别
    maxZoom: 20, //最大缩放比例
    minZoom: 4, //最小缩放比例
    pitch: 60, //俯仰角
    bearing: 0, //方位
    fog: true, //是否开启雾化
    spatialReference: "EPSG:3857", //空间参考(EPSG) 默认为'EPSG:3857'， 投影坐标系配置为：identity
    BasicLayerConfig: {
      //底图配置 仅支持“切片方式”加载
      DxtConfig: {
        index: 0, //控件排列顺序 非叠加顺序 标注不显示控件  随相应图层进行联动
        Name: "地形图", //名称
        visible: true, //默认是否显示
        SourceType: "", //数据来源   Arcgis_Server/Tian_Di_Tu/MapBox/OpenStreetMap/......
        urlTemplate: "", //数据源
        subdomains: [], //子域替换urlTemplate中的“ {s}”   //数据源为Arcgis_Server可不填
        cssFilter: "sepia(0%) invert(0%)", // css filter  风格滤镜  sepia(100%) invert(90%)
      },
      DxtBzConfig: {
        index: 0, //控件排列顺序 非叠加顺序 标注不显示控件  随相应图层进行联动
        Name: "地形图标注", //名称
        visible: true, //默认是否显示
        SourceType: "", //数据来源   Arcgis_Server/Tian_Di_Tu/MapBox/OpenStreetMap/...
        urlTemplate: "", //数据源
        subdomains: [], //子域替换urlTemplate中的“ {s}”   //数据源为Arcgis_Server可不填
        cssFilter: "sepia(0%) invert(0%)", // css filter  风格滤镜  sepia(100%) invert(90%)
      },
      YxtConfig: {
        index: 1, //控件排列顺序 非叠加顺序 标注不显示控件  随相应图层进行联动
        Name: "影像图", //名称
        visible: false, //默认是否显示
        SourceType: "", //数据来源   Arcgis_Server/Tian_Di_Tu/MapBox/OpenStreetMap/......
        urlTemplate: "", //数据源
        subdomains: [], //子域替换urlTemplate中的“ {s}”   //数据源为Arcgis_Server可不填
        cssFilter: "sepia(0%) invert(0%)", // css filter  风格滤镜  sepia(100%) invert(90%)
      },
      YxtBzConfig: {
        index: 1, //控件排列顺序 非叠加顺序 标注不显示控件  随相应图层进行联动
        Name: "影像图标注", //名称
        visible: false, //默认是否显示
        SourceType: "", //数据来源   Arcgis_Server/Tian_Di_Tu/MapBox/OpenStreetMap/...
        urlTemplate: "", //数据源
        subdomains: [], //子域替换urlTemplate中的“ {s}”   //数据源为Arcgis_Server可不填
        cssFilter: "sepia(0%) invert(0%)", // css filter  风格滤镜  sepia(100%) invert(90%)
      },
      DistrictConfig: {
        //分区图层
        index: 2, //控件排列顺序 非叠加顺序 标注不显示控件  随相应图层进行联动
        Name: "分区", //名称
        visible: true, //默认是否显示
        SourceType: "", //数据来源   Arcgis_Server/Tian_Di_Tu/MapBox/OpenStreetMap/...
        urlTemplate: "", //数据源
        subdomains: [], //子域替换urlTemplate中的“ {s}”   //数据源为Arcgis_Server可不填
        cssFilter: "sepia(0%) invert(0%)", // css filter  风格滤镜  sepia(100%) invert(90%)
      },
      CADConfig: {
        //CAD图层
        index: 3, //控件排列顺序 非叠加顺序 标注不显示控件  随相应图层进行联动
        Name: "CAD", //名称
        visible: false, //默认是否显示
        SourceType: "", //数据来源   Arcgis_Server/Tian_Di_Tu/MapBox/OpenStreetMap/...
        urlTemplate: "", //数据源
        subdomains: [], //子域替换urlTemplate中的“ {s}”   //数据源为Arcgis_Server可不填
        cssFilter: "sepia(0%) invert(0%)", // css filter  风格滤镜  sepia(100%) invert(90%)
      },
      CustomOneConfig: {
        //预留 自定义图层1
        index: 4, //控件排列顺序 非叠加顺序 标注不显示控件  随相应图层进行联动
        Name: "自定义图层1", //名称
        visible: false, //默认是否显示
        SourceType: "", //数据来源   Arcgis_Server/Tian_Di_Tu/MapBox/OpenStreetMap/...
        urlTemplate: "", //数据源
        subdomains: [], //子域替换urlTemplate中的“ {s}”   //数据源为Arcgis_Server可不填
        cssFilter: "sepia(0%) invert(0%)", // css filter  风格滤镜  sepia(100%) invert(90%)
      },
      CustomTwoConfig: {
        //预留 自定义图层2
        index: 5, //控件排列顺序 非叠加顺序 标注不显示控件  随相应图层进行联动
        Name: "自定义图层2", //名称
        visible: false, //默认是否显示
        SourceType: "", //数据来源   Arcgis_Server/Tian_Di_Tu/MapBox/OpenStreetMap/...
        urlTemplate: "", //数据源
        subdomains: [], //子域替换urlTemplate中的“ {s}”   //数据源为Arcgis_Server可不填
        cssFilter: "sepia(0%) invert(0%)", // css filter  风格滤镜  sepia(100%) invert(90%)
      },
    },
  },
};
export default InitMapConfig;
