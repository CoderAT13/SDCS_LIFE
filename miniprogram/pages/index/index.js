//index.js
const db = wx.cloud.database()
const app = getApp()
var isnamelist = false;
var isExist = false;
var usr_id = "";
function manager() {
  
}


Page({
  data: {
    avatarUrl: 'https://6865-helloworld-b112e5-1257864571.tcb.qcloud.la/life_logo.png?sign=3cfde787c79fac233fa0398fba0bf01b&t=1540971210',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    isDisable: false,
    msg1: "授权",
    msg2: "",
    manager: ''
  },

  onLoad: function() {
    console.log(this.data.msg1);
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    var tmp = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 传给云函数的参数
      success: function (res) {
        console.log(res.result) // 3
        usr_id = res.result.openid;
        console.log(usr_id);
        if (usr_id == "oZCMZ4wKfmE1ddGbMB62_wdS0fYU") {
          tmp.setData({
            manager: "sudo"
          })
        }
        wx.setStorage({
          key: "_id",
          data: usr_id
        })
        db.collection('Users').doc(res.result.openid).get({
          success: function (res) {
      
          },
          fail: function () {
            db.collection("Users").add({
              data :{
                _id : res.result.openid,
              },
              success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res);
                
              }
            })
          }
        })
      },
      fail: console.error
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                isDisable: true,
                msg1: "",
                msg2: "Hello!   "+res.userInfo.nickName
              })
              if (usr_id == "oZCMZ4wKfmE1ddGbMB62_wdS0fYU"){
                this.setData({
                  manager: "sudo"
                })
              }
              //console.log(this.data.avatarUrl);
              console.log(res)
              db.collection("Users").doc(usr_id).update({
                data:{
                  NickName : res.userInfo.nickName,
                  UserInfo : res.userInfo
                },
                success: function (res) {
                  //console.log(res.data)
                }
              })
            },
            fail: res => {
              console.log("failed")
            }
          })
        }
        else console.log("failed")
      },
      fail: res => {
        console.log("failed")
      }
    })
  },
  
  jump:function(){
    wx:wx.navigateTo({
      url: '../random/random',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  jump1: function () {
    wx: wx.navigateTo({
      url: '../match/match',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  jump2: function () {
    wx: wx.navigateTo({
      url: '../problem/problem',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  jump_m: function () {
    wx: wx.navigateTo({
      url: '../AAG/AAG',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  manager: function () {
    wx: wx.navigateTo({
      url: '../manager/manager',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  log: function() {
    wx.getUserInfo({
      success: res => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          isDisable: true,
          msg1: "",
          msg2: "Hello! " + res.userInfo.nickName
        })
        console.log(this.data.avatarUrl);
        console.log(res)
        wx.setStorage({
          key: "_id",
          data: this.data._id
        })
        db.collection("Users").doc(usr_id).update({
          data: {
            NickName: res.userInfo.nickName,
            UserInfo: res.userInfo
          },
          success: function (res) {
            console.log(res.data);
            wx.setStorage({
              key: "_id",
              data: res
            })
          }
        })
      },
      fail: res => {
        console.log("failed")
      }
    })
  }

  
  
})