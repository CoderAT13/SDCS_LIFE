//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      
      items: [
        { name: '1', value: "吴坎" },
        { name: '1', value: "唐峻南" },
        { name: '1', value: "张涵健" },
        { name: '0', value: "王诗游" },
        { name: '0', value: "杨玲" },
        { name: '1', value: "陈安德" },
        { name: '0', value: "徐雪影" },
        { name: '1', value: "郑浩腾" },
        { name: '1', value: "湛梓伟" },
        { name: '0', value: "缪贝琪" },
        { name: '1', value: "邓智平" },
        { name: '0', value: "王宇欣" },
        { name: '1', value: "周伟伦" },
        { name: '1', value: "张尉卓" },
        { name: '0', value: "孙静雯" },
        { name: '0', value: "李怡臻" },
        { name: '1', value: "徐浩添" },
        { name: '1', value: "王泽昊" },
        { name: '0', value: "翁钰婷" },
        { name: '1', value: "陈志昱" }
      ],
    }
  }
})
