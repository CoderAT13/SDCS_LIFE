var app = getApp();
var isSpread = false;

Page({

  data: {
    max: 0,
    total_num: 0,
    num: 1,
    t_nameList:[],
    tmp_list: [],
    resList: [],
    out_list: []
  },

  onLoad: function(){
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

  onShow: function () {
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

  sliderChange(e){
    var t_nameList = this.data.t_nameList;
    this.setData({
      num: e.detail.value
    })
    
    console.log(t_nameList)
    console.log('slider' + '发生 change 事件，携带值为', e.detail.value)
  },

  comfirm: function(){
    this.setData({
      tmp_list: this.data.t_nameList
    })
    var temp = this.data.tmp_list;
    
    var res = [];
    for (var i = 0; i < this.data.num; i++){
      var pos = Math.floor(Math.random()*temp.length);
      //console.log(pos);
      //console.log(temp[pos]);
      res.push(temp[pos]);
      temp.splice(pos,1);
    }
    console.log(res);
    this.setData({
      resList: res
    })
  },

  list: function(){
    
    isSpread = !isSpread;
    if (isSpread){
      this.setData({
        out_list: this.data.t_nameList
      })
    }
    else{
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
  }
})