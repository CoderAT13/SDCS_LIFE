var fore = false;
var change = 0;
Page ({
  onLoad: function(){
    fore = false;
    change = 0;
  },
  data: {
    items: [
      { name: '1', value: "吴坎"}, 
      { name: '1', value:"唐峻南"}, 
      { name: '1', value:"张涵健"}, 
      { name: '0', value:"王诗游"}, 
      { name: '0', value:"杨玲"},
      { name: '1', value:"陈安德"}, 
      { name: '0', value:"徐雪影"}, 
      { name: '1', value:"郑浩腾"}, 
      { name: '1', value:"湛梓伟"}, 
      { name: '0', value:"缪贝琪"},
      { name: '1', value:"邓智平"}, 
      { name: '0', value:"王宇欣"}, 
      { name: '1', value:"周伟伦"}, 
      { name: '1', value:"张尉卓"}, 
      { name: '0', value:"孙静雯"},
      { name: '0', value:"李怡臻"},
      { name: '1', value:"徐浩添"},
      { name: '1', value:"王泽昊"},
      { name: '0', value:"翁钰婷"},
      { name: '1', value:"陈志昱"},
    ],

    results:[],
    all_checked: false
  },

  checkboxChange: function (e) {
    change ++;
    var temp1 = e.detail.value;
    var this_all = false;
    //var app = getApp();
    /*        All Unselect      */
    for (var i = 0; i < temp1.length; i++) {
      if (temp1[i] == "all"){
        this_all = true;
      }
    }
    if (this_all == false && fore == true){
      fore = false;
      this.setData({
        all_checked: false,
        results: []
      })
      wx.setStorage({
        key: 'nameList',
        data: [],
      })
      return;
    }
    /*      All Select      */
    if (temp1[temp1.length-1] == "all" && fore == false){
      fore = true;
      var result = [];
      for (var i = 0; i < this.data.items.length; i++ ){
        result.push(this.data.items[i].value);
      }
      this.setData({
        all_checked: true,
        results: result
      })
      
      wx.setStorage({
        key: 'nameList',
        data: result,
      })
      return;
    }
    var result = [];
  
    for(var i = 0; i < temp1.length; i++){
      if(temp1[i] != "all")
        result.push(temp1[i]);
    }
    wx.setStorage({
      key: 'nameList',
      data: result,
    })
    //app.globalData.result = result;
    //console.log(app.globalData.result)
    this.setData({
      results: result
    })
    //console.log(result)
    
    
    
    
  },

  jump: function(){
    wx:wx.navigateBack({
      
    })
  },

  onUnload: function(){
    if (change == 0){
      this.setData({
        all_checked: false,
        results: []
      })
      wx.setStorage({
        key: 'nameList',
        data: [],
      })
    }
  }
  


})