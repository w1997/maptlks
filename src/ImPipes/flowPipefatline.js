// let selectMesh = [];

import * as maptalks from "maptalks";
import * as THREE from 'three';
import { ThreeLayer } from 'maptalks.three/dist/maptalks.three.js';
import { BaseObject } from "maptalks.three";
import { lm_CoordTransferd } from "../gcoordTools/lmCoordTransfer";
import *  as geoutil from "geoutil";

let threeLayer = new ThreeLayer('threejsLayer', {
  'forceRenderOnMoving': true,
  'forceRenderOnRotating': true,
  'forceRenderOnZooming': true,
  'animation': true
});

export class FlowPipeFatlineLyer {
  constructor() {
    this.first_url = '../MapVisual/data/pipe/flowpipe_M300.json';
    this.second_url = '../MapVisual/data/pipe/flowpipe_M100_L300.json';
    this.third_url = '../MapVisual/data/pipe/flowpipe_M60_L100.json';
    this.fourth_url = '../MapVisual/data/pipe/flowpipe_M30_L60.json';
    this.fifth_url = '../MapVisual/data/pipe/flowpipe_L30_M0.json';

    this.fatlines_first = [];
    this.fatlines_second = [];
    this.fatlines_third = [];
    this.fatlines_fourth = [];
    this.fatlines_fifth = [];

    this.loadPipe_First();
    this.loadPipe_Second();
    this.loadPipe_Third();
    this.loadPipe_Fourth();
    this.loadPipe_Fifth();
  }

  loadPipe_First() {
    fetch(this.first_url).then(res => res.json()).then(geoJSON => {
      //坐标转换
      geoJSON.features = geoJSON.features.filter(feature => {
        return feature.geometry != null && feature.geometry.coordinates != null;
      });
      geoJSON.features.forEach(feature => {
        let startCood = [feature.geometry.coordinates[0][0], feature.geometry.coordinates[0][1]];
        let endCood = [feature.geometry.coordinates[1][0], feature.geometry.coordinates[1][1]];
        startCood = lm_CoordTransferd.lmProjectCommonCoordTransf(startCood, false, "longshan");
        endCood = lm_CoordTransferd.lmProjectCommonCoordTransf(endCood, false, "longshan");

        feature.geometry.coordinates = [startCood, endCood];
      });
      // let material = this.getMaterial('rgb(43,255,207)', 2.5);
      let material = this.getMaterial('rgb(143,255,206)', 2.5);
      let highlightmaterial = this.getHighlightmaterial('yellow', 4);

      var lineStrings = maptalks.GeoJSON.toGeometry(geoJSON);
      var list = [];
      lineStrings.forEach(function (lineString) {
        list.push({
          lineString,
          //geoutil.js lineLength
          len: geoutil.lineLength(lineString)
        });
      });
      list = list.sort(function (a, b) {
        return b.len - a.len
      });
      this.fatlines_first = list.map(function (d) {
        var line = new FatLine(d.lineString, {
          altitude: 0,
          minZoom: 9,
          maxZoom: 25
        }, material, threeLayer);
        //tooltip test
        line.setToolTip(line.getId(), {
          showTimeout: 0,
          eventsPropagation: true,
          dx: 10
        });

        //event test
        ['click', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
          line.on(eventType, function (e) {
            if (e.type === 'mouseout') {
              this.setSymbol(material);
            }
            if (e.type === 'mouseover') {
              this.setSymbol(highlightmaterial);
              const tooltip = line.getToolTip();
              tooltip._content = '<div>' + '供水管线' + '</div>';
            }
          });
        });
        return line;
      });
      threeLayer.addMesh(this.fatlines_first);
      threeLayer.config('animation', true);
    });
  };
  loadPipe_Second() {
    fetch(this.second_url).then(res => res.json()).then(geoJSON => {
      //坐标转换
      geoJSON.features = geoJSON.features.filter(feature => {
        return feature.geometry != null && feature.geometry.coordinates != null;
      });
      geoJSON.features.forEach(feature => {
        let startCood = [feature.geometry.coordinates[0][0], feature.geometry.coordinates[0][1]];
        let endCood = [feature.geometry.coordinates[1][0], feature.geometry.coordinates[1][1]];
        startCood = lm_CoordTransferd.lmProjectCommonCoordTransf(startCood, false, "longshan");
        endCood = lm_CoordTransferd.lmProjectCommonCoordTransf(endCood, false, "longshan");

        feature.geometry.coordinates = [startCood, endCood];
      });
      let material = new THREE.LineBasicMaterial({
        linewidth: 1,
        color: 0x00ffff,
        // opacity: 0.8,
        transparent: true
      });
      let highlightmaterial = new THREE.LineDashedMaterial({
        linewidth: 1,
        color: 'yellow',
        // opacity: 0.8,
        transparent: true,
        // dashSize: 0.05,
        // gapSize: 0.05
      });
      let lineStrings = maptalks.GeoJSON.toGeometry(geoJSON);
      const mesh = threeLayer.toLines(lineStrings, { interactive: true, minZoom: 16, maxZoom: 25 }, material);
      this.fatlines_second.push(mesh);
      mesh.setToolTip('hello', {
        showTimeout: 0,
        eventsPropagation: true,
        dx: 10
      });

      //event test
      ['click', 'mousemove', 'empty', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
        mesh.on(eventType, function (e) {
          // console.log(e.type);
          const select = e.selectMesh;
          if (e.type === 'empty' && e.selectMesh.length) {
            threeLayer.removeMesh(e.selectMesh);
            e.selectMesh = [];
          }

          let data, baseObject;
          if (select) {
            data = select.data;
            baseObject = select.baseObject;
            if (baseObject && !baseObject.isAdd) {
              baseObject.setSymbol(highlightmaterial);
              threeLayer.addMesh(baseObject);
              e.selectMesh.push(baseObject);
            }
          }


          if (e.selectMesh.length > 20) {
            threeLayer.removeMesh(e.selectMesh);
            e.selectMesh = [];
          }


          // override tooltip
          if (e.type === 'mousemove' && data) {
            const height = JSON.stringify(data.getProperties());
            const tooltip = this.getToolTip();
            tooltip._content = '供水管线' //`property:${height}`;
          }
          //override infowindow
          if (e.type === 'click' && data) {
            const height = JSON.stringify(data.getProperties());

          }
        });
      });
      threeLayer.addMesh(this.fatlines_second);
    });
  };
  loadPipe_Third() {
    fetch(this.third_url).then(res => res.json()).then(geoJSON => {

      //坐标转换
      geoJSON.features = geoJSON.features.filter(feature => {
        return feature.geometry != null && feature.geometry.coordinates != null;
      });
      geoJSON.features.forEach(feature => {
        let startCood = [feature.geometry.coordinates[0][0], feature.geometry.coordinates[0][1]];
        let endCood = [feature.geometry.coordinates[1][0], feature.geometry.coordinates[1][1]];
        startCood = lm_CoordTransferd.lmProjectCommonCoordTransf(startCood, false, "longshan");
        endCood = lm_CoordTransferd.lmProjectCommonCoordTransf(endCood, false, "longshan");

        feature.geometry.coordinates = [startCood, endCood];
      });
      let material = new THREE.LineBasicMaterial({
        linewidth: 1,
        color: 0x00ffff,
        // opacity: 0.8,
        transparent: true
      });
      let highlightmaterial = new THREE.LineDashedMaterial({
        linewidth: 1,
        color: 'yellow',
        transparent: true,
      });
      let lineStrings = maptalks.GeoJSON.toGeometry(geoJSON);
      const mesh = threeLayer.toLines(lineStrings, { interactive: true, minZoom: 17, maxZoom: 25 }, material);
      this.fatlines_third.push(mesh);
      mesh.setToolTip('hello', {
        showTimeout: 0,
        eventsPropagation: true,
        dx: 10
      });

      //event test
      ['click', 'mousemove', 'empty', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
        mesh.on(eventType, function (e) {
          // console.log(e.type);
          const select = e.selectMesh;
          if (e.type === 'empty' && e.selectMesh.length) {
            threeLayer.removeMesh(e.selectMesh);
            e.selectMesh = [];
          }

          let data, baseObject;
          if (select) {
            data = select.data;
            baseObject = select.baseObject;
            if (baseObject && !baseObject.isAdd) {
              baseObject.setSymbol(highlightmaterial);
              threeLayer.addMesh(baseObject);
              e.selectMesh.push(baseObject);
            }
          }


          if (e.selectMesh.length > 20) {
            threeLayer.removeMesh(e.selectMesh);
            e.selectMesh = [];
          }


          // override tooltip
          if (e.type === 'mousemove' && data) {
            const height = JSON.stringify(data.getProperties());
            const tooltip = this.getToolTip();
            tooltip._content = '供水管线' //`property:${height}`;
          }
          //override infowindow
          if (e.type === 'click' && data) {
            const height = JSON.stringify(data.getProperties());

          }
        });
      });
      threeLayer.addMesh(this.fatlines_third);
    });
  };
  loadPipe_Fourth() {
    fetch(this.fourth_url).then(res => res.json()).then(geoJSON => {

      //坐标转换
      geoJSON.features = geoJSON.features.filter(feature => {
        return feature.geometry != null && feature.geometry.coordinates != null;
      });
      geoJSON.features.forEach(feature => {
        let startCood = [feature.geometry.coordinates[0][0], feature.geometry.coordinates[0][1]];
        let endCood = [feature.geometry.coordinates[1][0], feature.geometry.coordinates[1][1]];
        startCood = lm_CoordTransferd.lmProjectCommonCoordTransf(startCood, false, "longshan");
        endCood = lm_CoordTransferd.lmProjectCommonCoordTransf(endCood, false, "longshan");

        feature.geometry.coordinates = [startCood, endCood];
      });
      let material = new THREE.LineBasicMaterial({
        linewidth: 1,
        color: 0x00ffff,
        // opacity: 0.8,
        transparent: true
      });
      let highlightmaterial = new THREE.LineDashedMaterial({
        linewidth: 1,
        color: 'yellow',
        // opacity: 0.8,
        transparent: true,
      });
      let lineStrings = maptalks.GeoJSON.toGeometry(geoJSON);
      const mesh = threeLayer.toLines(lineStrings, { interactive: true, minZoom: 17, maxZoom: 25 }, material);
      this.fatlines_fourth.push(mesh);
      mesh.setToolTip('hello', {
        showTimeout: 0,
        eventsPropagation: true,
        dx: 10
      });



      //event test
      ['click', 'mousemove', 'empty', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
        mesh.on(eventType, function (e) {
          // console.log(e.type);
          const select = e.selectMesh;
          if (e.type === 'empty' && e.selectMesh.length) {
            threeLayer.removeMesh(e.selectMesh);
            e.selectMesh = [];
          }

          let data, baseObject;
          if (select) {
            data = select.data;
            baseObject = select.baseObject;
            if (baseObject && !baseObject.isAdd) {
              baseObject.setSymbol(highlightmaterial);
              threeLayer.addMesh(baseObject);
              e.selectMesh.push(baseObject);
            }
          }


          if (e.selectMesh.length > 20) {
            threeLayer.removeMesh(e.selectMesh);
            e.selectMesh = [];
          }


          // override tooltip
          if (e.type === 'mousemove' && data) {
            const height = JSON.stringify(data.getProperties());
            const tooltip = this.getToolTip();
            tooltip._content = '供水管线' //`property:${height}`;
          }
          //override infowindow
          if (e.type === 'click' && data) {
            const height = JSON.stringify(data.getProperties());

          }
        });
      });
      threeLayer.addMesh(this.fatlines_fourth);
    });
  };
  loadPipe_Fifth() {
    fetch(this.fifth_url).then(res => res.json()).then(geoJSON => {

      //坐标转换
      geoJSON.features = geoJSON.features.filter(feature => {
        return feature.geometry != null && feature.geometry.coordinates != null;
      });
      geoJSON.features.forEach(feature => {
        let startCood = [feature.geometry.coordinates[0][0], feature.geometry.coordinates[0][1]];
        let endCood = [feature.geometry.coordinates[1][0], feature.geometry.coordinates[1][1]];
        startCood = lm_CoordTransferd.lmProjectCommonCoordTransf(startCood, false, "longshan");
        endCood = lm_CoordTransferd.lmProjectCommonCoordTransf(endCood, false, "longshan");

        feature.geometry.coordinates = [startCood, endCood];
      });
      let material = new THREE.LineBasicMaterial({
        linewidth: 1,
        color: 0x00ffff,
        // opacity: 0.8,
        transparent: true
      });
      let highlightmaterial = new THREE.LineDashedMaterial({
        linewidth: 1,
        color: 'yellow',
        // opacity: 0.8,
        transparent: true,
      });
      let lineStrings = maptalks.GeoJSON.toGeometry(geoJSON);
      const mesh = threeLayer.toLines(lineStrings, { interactive: true, minZoom: 18, maxZoom: 25 }, material);
      this.fatlines_fifth.push(mesh);
      mesh.setToolTip('hello', {
        showTimeout: 0,
        eventsPropagation: true,
        dx: 10
      });

      //event test
      ['click', 'mousemove', 'empty', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
        mesh.on(eventType, function (e) {
          // console.log(e.type);
          const select = e.selectMesh;
          if (e.type === 'empty' && e.selectMesh.length) {
            threeLayer.removeMesh(e.selectMesh);
            e.selectMesh = [];
          }

          let data, baseObject;
          if (select) {
            data = select.data;
            baseObject = select.baseObject;
            if (baseObject && !baseObject.isAdd) {
              baseObject.setSymbol(highlightmaterial);
              threeLayer.addMesh(baseObject);
              e.selectMesh.push(baseObject);
            }
          }


          if (e.selectMesh.length > 20) {
            threeLayer.removeMesh(e.selectMesh);
            e.selectMesh = [];
          }


          // override tooltip
          if (e.type === 'mousemove' && data) {
            const height = JSON.stringify(data.getProperties());
            const tooltip = this.getToolTip();
            tooltip._content = '供水管线' //`property:${height}`;
          }
          //override infowindow
          if (e.type === 'click' && data) {
            const height = JSON.stringify(data.getProperties());

          }
        });
      });
      threeLayer.addMesh(this.fatlines_fifth);
    });
  };
  getMaterial(color = 0x00ffff, linewidth = 1) {
    let lineMaterial = new THREE.LineMaterial({
      color: color,
      transparent: true,
      linewidth: linewidth,

    });
    return lineMaterial;
  }
  getHighlightmaterial(color = 'yellow', linewidth = 1) {
    let highlightmaterial = new THREE.LineMaterial({
      transparent: true,
      linewidth: linewidth,
      color: color,
    });
    this.highlightmaterial = highlightmaterial;
    return highlightmaterial;
  }

  show() {
    this.fatlines_first.forEach(mesh => {
      mesh.show();
    });
    this.fatlines_second.forEach(mesh => {
      mesh.show();
    });
    this.fatlines_third.forEach(mesh => {
      mesh.show();
    });
    this.fatlines_fourth.forEach(mesh => {
      mesh.show();
    });
    this.fatlines_fifth.forEach(mesh => {
      mesh.show();
    });
    return true;
  }
  hide() {
    this.fatlines_first.forEach(mesh => {
      mesh.hide();
    });
    this.fatlines_second.forEach(mesh => {
      mesh.hide();
    });
    this.fatlines_third.forEach(mesh => {
      mesh.hide();
    });
    this.fatlines_fourth.forEach(mesh => {
      mesh.hide();
    });
    this.fatlines_fifth.forEach(mesh => {
      mesh.hide();
    });
    return true;
  }
  isShow() {
    let curVisible = false;
    this.fatlines_first.forEach(mesh => {
      curVisible = mesh._visible;
    });
    return curVisible;
  }
}


var OPTIONS = {
  altitude: 0
};

class FatLine extends BaseObject {
  constructor(lineString, options, material, layer) {
    super();
    //geoutil.js getLinePosition
    const { positions } = geoutil.getLinePosition(lineString, layer);
    const positions1 = geoutil._getLinePosition(lineString, layer).positions;

    options = maptalks.Util.extend({}, OPTIONS, options, { layer, lineString, positions: positions1 });
    this._initOptions(options);

    const geometry = new THREE.LineGeometry();
    geometry.setPositions(positions);
    const map = layer.getMap();
    const size = map.getSize();
    const width = size.width,
      height = size.height;
    material.resolution.set(width, height);
    const line = new THREE.Line2(geometry, material);
    line.computeLineDistances();
    this._createGroup();
    this.getObject3d().add(line);
    const { altitude } = options;
    const z = layer.distanceToVector3(altitude, altitude).x;
    const center = lineString.getCenter();
    const v = layer.coordinateToVector3(center, z);
    this.getObject3d().position.copy(v);
  }


  setSymbol(material) {
    if (material && material instanceof THREE.Material) {
      material.needsUpdate = true;
      const size = this.getMap().getSize();
      const width = size.width,
        height = size.height;
      material.resolution.set(width, height);
      this.getObject3d().children[0].material = material;
    }
    return this;
  }

  //test Baseobject customize its identity
  identify(coordinate) {
    const layer = this.getLayer(),
      size = this.getMap().getSize(),
      camera = this.getLayer().getCamera(),
      positions = this.getOptions().positions,
      altitude = this.getOptions().altitude;
    let canvas = layer._testCanvas;
    if (!canvas) {
      canvas = layer._testCanvas = document.createElement('canvas');
    }
    canvas.width = size.width;
    canvas.height = size.height;
    const context = canvas.getContext('2d');

    const pixels = simplepath.vectors2Pixel(positions, size, camera, altitude, layer);
    const lineWidth = this.getObject3d().children[0].material.linewidth + 3;
    simplepath.draw(context, pixels, 'LineString', { lineWidth: lineWidth });
    const pixel = this.getMap().coordToContainerPoint(coordinate);
    if (context.isPointInStroke(pixel.x, pixel.y)) {
      return true;
    }
  }
}




var simplepath = {

  positionsConvert: function (worldPoints, altitude = 0, layer) {
    const vectors = [];
    for (let i = 0, len = worldPoints.length; i < len; i += 3) {
      let x = worldPoints[i],
        y = worldPoints[i + 1],
        z = worldPoints[i + 2];
      if (altitude > 0) {
        z += layer.distanceToVector3(altitude, altitude).x;
      }
      vectors.push(new THREE.Vector3(x, y, z));
    }
    return vectors;
  },

  vectors2Pixel: function (worldPoints, size, camera, altitude = 0, layer) {
    if (!(worldPoints[0] instanceof THREE.Vector3)) {
      worldPoints = simplepath.positionsConvert(worldPoints, altitude, layer);
    }
    const pixels = worldPoints.map(worldPoint => {
      return simplepath.vector2Pixel(worldPoint, size, camera);
    })
    return pixels;

  },

  vector2Pixel: function (world_vector, size, camera) {
    const vector = world_vector.project(camera);
    const halfWidth = size.width / 2;
    const halfHeight = size.height / 2;
    const result = {
      x: Math.round(vector.x * halfWidth + halfWidth),
      y: Math.round(-vector.y * halfHeight + halfHeight)
    };
    return result;
  },


  draw: function (context, data, type, options) {
    options = options || {};
    for (var key in options) {
      context[key] = options[key];
    }

    switch (type) {
      case 'Circle':
        {
          // var size = options._size || options.size || 20;
          // let x = data.x || data[0],
          //     y = data.y || data[1];
          // context.beginPath();
          // context.moveTo(x, y);
          // context.arc(x, y, size, 0, Math.PI * 2);
          // context.fill();
          // context.restore();
          break;
        }
      case 'LineString':
        {
          context.beginPath();
          for (var j = 0; j < data.length; j++) {
            var _xy = data[j];
            let x = _xy.x || _xy[0],
              y = _xy.y || _xy[1];
            if (j == 0) {
              context.moveTo(x, y);
            } else {
              context.lineTo(x, y);
            }
            // if(j===data.length-1){
            //     context.lineTo(data[0].x,data[0].y);
            // }
          }
          // context.closePath();
          context.stroke();
          context.restore();
          break;
        }
      default:
        {
          console.error('type' + type + 'is not support now!');
        }
    }
  }
};