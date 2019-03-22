var usr_id = ""
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wk: "oZCMZ48C_f4S4T_HnB6PlGhM6ftM",
    zhj: "oZCMZ4wKfmE1ddGbMB62_wdS0fYU",
    tjn: "oZCMZ4796XeKPKPIpcKmeHtEyOsk",
    week: "",
    month: "",
    half_year: "",
    wk_c: "",
    mh_c: "",
    hy_c: "",
    disa: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tmp = this;
    wx.getStorage({
      key: '_id',
      success: function(res) {
        usr_id = res.data;
        if (usr_id == tmp.data.wk || 
            usr_id == tmp.data.zhj ||
            usr_id == tmp.data.tjn)
        {
              tmp.setData({
                disa: false,
                week: "提交",
                month: "提交",
                half_year: "提交",
              })
        }
        db.collection('problems').doc('weeks').get({
          success: function(res){
            //_newest = res.data.newest;
            tmp.setData({
              wk_c: res.data.p
            })
          },
          fail: console.error
        }),
        db.collection('problems').doc('months').get({
          success: function (res) {
             //_newest = res.data.newest;
            tmp.setData({
              mh_c: res.data.p
            })
          }
        }),
        db.collection('problems').doc('half_years').get({
          success: function (res) {
            //_newest = res.data.newest;
            tmp.setData({
              hy_c: res.data.p
            })
          }
        })
      },
    })
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
    //console.log(e.target.id);
    //console.log("ANGEL_ID",angel_id);
    var id = e.target.id;
    wx.cloud.callFunction({
      name:"upload_sync",
      data: {
        a: id,
        b: e.detail.value.textarea,
      },
      success: function (res) {
        console.log(res.result) // 3
      },
      fail: console.error
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000 //持续的时间
    })
    console.log(e.detail.value.textarea)
  },
})