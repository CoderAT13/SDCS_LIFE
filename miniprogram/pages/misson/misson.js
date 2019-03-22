const db = wx.cloud.database()

var tmp_data = {};
Page ({
  data:{
    name: ""
  },
  onLoad: function(){
    db.collection('mission_info').doc('mission_1').get({
      success: function (res) {
        // res.data 包含该记录的数据
        tmp_data = res.data;
        console.log(res.data)
        console.log(tmp_data);
      },
      fail: function(){
        console.log("fuck")
      }
      
    })
    
  }






})