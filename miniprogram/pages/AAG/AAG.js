const db = wx.cloud.database()
const app = getApp()
var usr_id = "abc"
var god_id = "abcde"
var first = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {
      name: "God's name",
      content: "content"
    },
    req: "",
    subm: "提交",
    u_req: "你的需求：",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tmp = this;
    console.log(tmp);
    //console.log(usr_id);
    wx.getStorage({
      key: '_id',
      success: function (res) {
        //console.log(res.data);
        usr_id = res.data;
        console.log(usr_id);
        db.collection('AngelAndGod').doc(usr_id).get({
          success: function (res) {
            console.log("test",res);
            god_id = res.data.God_id;
            //console.log(god_id);
            //console.log(usr_id);
            ;
            db.collection('AngelAndGod').doc(god_id).get({
              success: function (re) {
                console.log(re);
                tmp.setData({
                  items: {
                    name: re.data.name,
                    content: re.data.request,
                  },
                  req: res.data.request
                })
              },
              fail: console.error
            })
            //console.log(date.toDateString());
            
          },
          fail: function () {
            first = true;
            db.collection('AngelAndGod').add({
              data: {
                _id: usr_id,
                God_id: "New_god",
              },
              success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res);
              }
            })
            tmp.setData({
              u_req: "第一次，请输入你的真名："
            })
          }
        })
      },
      fail: function(){
        usr_id = "NULL";
      }
    })
    //console.log(this.data.items);
    
    //console.log(this.data._id);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  bindFormSubmit: function (e) {
    var tmp = this;
    if (first){
      db.collection("AngelAndGod").doc(usr_id).update({
        data: {
          name: e.detail.value.textarea
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
        }
      })
    }
    else{
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      db.collection("AngelAndGod").doc(usr_id).update({
        data: {
          //name: e.detail.value.textarea,
          request: e.detail.value.textarea,
          //date: date
        },
        success: function (res) {
          tmp.setData({
          subm: "提交成功"
          })
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000 //持续的时间
          })
        }
      })
    }
    
    //console.log("ANGEL_ID",angel_id);
    db.collection('AngelAndGod').where({
      God_id: "New_god"
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          var _collections = new Array()

          for (var i = 0; i < res.data.length; i++) {

            console("God_id",res.data[i])

          }

          

        }
      })
    console.log(e.detail.value.textarea)
  },

  jump: function () {
    
    wx: wx.navigateTo({
      url: "../index/index",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})