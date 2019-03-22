var app = getApp();
var isSpread = false;
var boy_girl = true;
Page ({
  data: {
    max: 0,
    total_num: 0,
    num: 1,
    t_nameList: [],
    tmp_list: [], //寄存器
    l_resList: [],  //结果名单
    r_resList: [],
    out_list: []  //确认名单
  },

  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'nameList',
      success: function (res) {
        that.setData({
          t_nameList: res.data,
          max: res.data.length,
        })
      },
    })
  },

  onShow: function(){
    var that = this;
    wx.getStorage({
      key: 'nameList',
      success: function (res) {
        that.setData({
          t_nameList: res.data,
          max: res.data.length,
        })
      },
    })
  },

  list: function () {
    
    isSpread = !isSpread;
    if (isSpread) {
      this.setData({
        out_list: this.data.t_nameList
      })
    }
    else {
      this.setData({
        out_list: []
      })
    }
  },

  jump: function () {
    wx: wx.navigateTo({
      url: "../index/index",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  switchChange: function(e){
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    boy_girl = e.detail.value;
  },

  comfirm: function(){
    this.setData({
      tmp_list: this.data.t_nameList
    })
    var temp = this.data.tmp_list;
    var res = [];              //暂存随机结果
    for (var i = 0; i < this.data.t_nameList.length; i++) {
      var pos = Math.floor(Math.random() * temp.length);
      //console.log(pos);
      //console.log(temp[pos]);
      res.push(temp[pos]);
      temp.splice(pos, 1);
    }

    if (boy_girl){
      var sexIndex = app.globalData.items;
      var b_list = [];
      var g_list = [];
      /*分男女生队列*/ 
      for (var i = 0; i < res.length; i ++) {
        for (var j =0; j < sexIndex.length; j++){
          if (res[i] == sexIndex[j].value){
            if (sexIndex[j].name == '1'){
              b_list.push(res[i]);
            }
            else{
              g_list.push(res[i]);
            }
          }
        }
      }

      while(b_list.length < g_list.length-1){
        b_list.push(g_list.pop());
      }
      while(g_list.length < b_list.length-1){
        g_list.push(b_list.pop())
      }

      this.setData({
        l_resList: b_list,
        r_resList: g_list
      })
    } 
    else{
      var l_list = [];
      for(var i = 0; i < res.length; i+=2){
        l_list.push(res[i]);
        res.splice(i, 1);
      }
      while (res.length < l_list.length - 1) {
        res.push(l_list.pop());
      }
      while (l_list.length < res.length - 1) {
        l_list.push(res.pop())
      }
      this.setData({
        l_resList: l_list,
        r_resList: res
      })
    
    }
  },

})