<template>
  <div id="fullMap"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.bfinit();
  },

  props: ["obj"],
  methods: {
    //全屏百度地图初始化
    bfinit() {
      this.$nextTick(() => {
        let timer = setInterval(() => {
          if (document.getElementById("fullMap")) {
            let map = new BMap.Map("fullMap");
            let myCity = new BMap.LocalCity();
            myCity.get(result => {
              let cityName = result.name;
              map.setCenter(cityName);
            });
            let point = null;
            if (this.obj.lnglat) {
              //小地图的值赋给大地图
              point = new BMap.Point(
                this.obj.lnglat.split(",")[0],
                this.obj.lnglat.split(",")[1]
              );
              let marker = new BMap.Marker(point);
              map.addOverlay(marker);
            } else point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom(true); //鼠标滚动放大缩小

            //城市控件
            map.enableInertialDragging();
            map.enableContinuousZoom();
            let size = new BMap.Size(10, 20);
            map.addControl(
              new BMap.CityListControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                offset: size
              })
            );
            map.addEventListener("click", e => {
              //大地图重新选择
              map.clearOverlays();
              let marker = new BMap.Marker(e.point);
              let geoc = new BMap.Geocoder(); //地址解析对象
              let pt = e.point;

              geoc.getLocation(pt, rs => {
                let addComp = rs.addressComponents;
                let address =
                  addComp.province +
                  addComp.city +
                  addComp.district +
                  addComp.street +
                  addComp.streetNumber;
                this.obj.address = address;
              });
              map.addOverlay(marker);
              this.obj.lnglat = `${pt.lng},${pt.lat}`;
            });
            clearInterval(timer);
          }
        }, 50);
      });
    }
  }
};
</script>
<style lang="less" >
#fullMap {
  width: 100%;
  height: 350px;
}
</style>