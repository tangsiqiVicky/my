<template>
    <div>
         <hdTitle go="true" title="定位"></hdTitle>
         <div class="se">
            <!-- <label>地址</label> -->
            <input placeholder="手动输入地址" id="ipo" type="text" v-model.trim="address" @focus="address =''">
        </div>
         <div id="container">
             <!-- <input placeholder="搜索" type="text" v-model.trim="address"> -->
        </div>
        
        <div class="isok" @click="save">
            确认地址
        </div>
    </div>
</template>

<script>
import hdTitle from "@/components/component/hdTitle";
export default {
  components: {
    hdTitle
  },
  data() {
    return {
      address: null,
      type: null
    };
  },
  mounted() {
    this.init();
  },
  created() {
    this.$toast.loading({
      message:"定位中"
    })
    if (this.$route.params.type) {
      this.type = this.$route.params.type;
      localStorage.setItem("addressType", this.$route.params.type);
    } else {
      this.type = localStorage["addressType"];
    }
  },
  methods: {
    save() {
      if (parseInt(this.type) == 1) {
        let info = JSON.parse(localStorage["pushInfo2"]);
        if (this.address) {
          info.address = this.address;
        } else {
          info.address = "定位失败";
        }
        let info2 = JSON.stringify(info);
        localStorage.setItem("pushInfo2", info2);
        this.$router.push({ name: "publish" });
      }else if (parseInt(this.type) == 2) {
        let info = JSON.parse(localStorage["pushInfo1"])
        if(this.address){
           info.address = this.address
        }else {
          info.address = "定位失败"
        }
        let info2 = JSON.stringify(info)
        localStorage.setItem("pushInfo1",info2)
        this.$router.push({ name: "publish2" });
      }
    },
    init() {
      let map = new AMap.Map("container", {
        zoom: 15
      });
      map.plugin("AMap.Geolocation", () => {
        //异步加载插件
        let geolocat = new AMap.Geolocation({
          timeout: 5000
        });
        map.addControl(geolocat);
        geolocat.getCurrentPosition();
        AMap.event.addListener(geolocat, "complete", data => {
          this.$toast.clear()
          data.position.getLng(); //定位成功返回的经度
          data.position.getLat(); //定位成功返回的纬度
          this.address =
            data.addressComponent.city + data.addressComponent.township;
          data.formattedAddress;
          this.address = data.formattedAddress;
        }); //返回定位信息
        AMap.event.addListener(geolocat, "error", data => {
          this.$toast.clear()
          if (data.info == "FAILED") {
            this.$toast({
              message: "获取您当前位置失败！请重试",
              duration: 1000
            });
          }
        });
      });
      //   map.plugin("AMap.Autocomplete",() =>{
      //       let auto = new AMap.Autocomplete({
      //           input:"ipo"
      //       });
      //   })
      map.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () =>{
        var autoOptions = {
          // 使用联想输入的input的id
          input: "ipo"
        };
        var autocomplete = new AMap.Autocomplete(autoOptions);

        var placeSearch = new AMap.PlaceSearch({
          map: map
        });
        AMap.event.addListener(autocomplete, "select", (e) =>{
          //TODO 针对选中的poi实现自己的功能
          this.address = e.poi.name
          placeSearch.search(e.poi.name);
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.isok {
  width: 3rem;
  font-size: 14px;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  background-color: #eee;
  color: black;
  margin: 0.8rem auto;
}
.se {
  display: flex;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 14px;
  margin: 0;
  // text-indent: 1em;
  outline: none;
  border: 1px solid #eee;
  label {
    height: 1rem;
    padding: 0 5px;
    background-color: #eee;
  }
  input {
    flex: 1;
    outline: none;
    border: none;
    text-indent: 1em;
    border-left: 1px solid #eee;
  }
}
#container {
  position: relative;
  width: 100%;
  height: 300px;
  //   #ipo {
  //     position: absolute;
  //     top: 0.2rem;
  //     right: 0.2rem;
  //     width: 4rem;
  //     //   height: rem;
  //     border: 1px solid #eee;
  //     outline: none;

  //     font-size: 12px;
  //     height: 24px;
  //     line-height: 24px;
  //     z-index: 999999;
  //   }
}
</style>