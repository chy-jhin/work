<template>
  <div :style="{width:width,height:height}" ref="txMap"></div>
</template>

<script>
export default {
  name: "txMap",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "240px"
    }
  },
  data() {
    return {
      map: null,
      geocoder: null,
      marker: null
    };
  },
  computed: {
    LatLng() {
      return (this.value || "39.90871, 116.397499").split(",");
    }
  },
  watch: {
    value(v) {
      if (!v) return;
      //   this.map.setCenter(res.detail.location);
      this.map.setCenter(new qq.maps.LatLng(this.LatLng[0], this.LatLng[1]));
      //   this.map.panTo(new qq.maps.LatLng(this.LatLng[0], this.LatLng[1]));
      this.marker.setPosition(
        new qq.maps.LatLng(this.LatLng[0], this.LatLng[1])
      );
    }
  },
  created() {
    this.createMap();
  },
  methods: {
    init() {
      return new Promise((resolve, reject) => {
        window.mapJsInit = () => {
          resolve(qq);
        };
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://map.qq.com/api/js?v=2.exp&callback=mapJsInit&key=KZOBZ-MHMWG-IVJQG-IICXA-E3FFS-TKBZR";
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    createMap() {
      this.init().then(qq => {
        this.map = new qq.maps.Map(this.$refs.txMap, {
          //这里经纬度代理表进入地图显示的中心区域
          center: new qq.maps.LatLng(this.LatLng[0], this.LatLng[1]),
          zoom: 13
        });
        this.marker = new qq.maps.Marker({
          map: this.map,
          position: new qq.maps.LatLng(this.LatLng[0], this.LatLng[1])
        });
        //绑定单击事件添加参数
        qq.maps.event.addListener(this.map, "click", event => {
          this.$emit(
            "change",
            event.latLng.getLat().toFixed(5) +
              "," +
              event.latLng.getLng().toFixed(5)
          );
        });
        //地址查询
        this.geocoder = new qq.maps.Geocoder({
          complete: res => {
            this.$emit(
              "change",
              res.detail.location.lat.toFixed(5) +
                "," +
                res.detail.location.lng.toFixed(5)
            );
          }
        });
      });
    },
    search(keyWord) {
      if (!keyWord) return;
      this.geocoder.getLocation(keyWord);
    }
  }
};
</script>

<style lang='less' scoped>
</style>