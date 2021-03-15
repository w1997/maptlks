import { threeLayerCustom}

class BigValuePointLayer {
  constructor(datas = [], visible = true) {
    this.visible = visible; //默认是否显示
    this.datas = datas;
    this.bigValues = [];
    this.addShowInfos(this.datas);
  }

  addShowInfos(datas) {
    if (datas.length <= 0) {
      return;
    }
    const point = threeLayerCustom.toPoints(
      datas,
      {},
      new THREE.PointsMaterial({
        sizeAttenuation: false,
        size: 12,
        transparent: true, //使材质透明
        blending: THREE.AdditiveBlending,
        depthTest: true, //深度测试关闭，不消去场景的不可见面
        depthWrite: false,
        map: this.createLightMateria(), //刚刚创建的粒子贴图就在这里用上
      })
    );
    this.bigValues.push(point);

    point.setToolTip("<div class=\"bigValueTip\"></div>", {
      showTimeout: 0,
      eventsPropagation: true,
      dx: 10,
    });
    threeLayerCustom.addMesh(this.bigValues);
    if (!this.visible) {
      this.hide();
    }

    ["click", "empty", "mousemove"].forEach((eventType) => {
      point.on(eventType, (e) => {
        const select = e.selectMesh;
        // override tooltip
        if (e.type === "mousemove" && select.data) {
          const value = select.data.value;
          const tooltip = point.getToolTip();
          tooltip._content =
            '<div class="bigValueTip">' + `${value}` + "</div>";
        }
      });
    });
  }

  //初始加载
  onLoad(datas) {
    this.update(datas);
  }
  //数据更新
  update(datas) {
    this.clearMap();
    this.addShowInfos(datas);
  }
  show() {
    this.bigValues.forEach((mesh) => {
      mesh.show();
    });
  }
  hide() {
    this.bigValues.forEach((mesh) => {
      mesh.hide();
    });
  }
  isShow() {
    let curVisible = false;
    this.bigValues.forEach((mesh) => {
      curVisible = mesh._visible;
    });
    return curVisible;
  }
  //清空图层
  clearMap() {
    threeLayerCustom.removeMesh(this.bigValues);
  }

  createLightMateria() {
    const canvasDom = document.createElement("canvas");
    const size = 32;
    canvasDom.width = size;
    canvasDom.height = size;
    const ctx = canvasDom.getContext("2d");
    const gradient = ctx.createRadialGradient(
      canvasDom.width / 2,
      canvasDom.height / 2,
      0,
      canvasDom.width / 2,
      canvasDom.height / 2,
      canvasDom.width / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.005, "rgba(255,255,0,1)");
    gradient.addColorStop(0.4, "rgba(255,255,0,1)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = gradient;
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.Texture(canvasDom);
    texture.needsUpdate = true; //使用贴图时进行更新
    return texture;
  }
}
