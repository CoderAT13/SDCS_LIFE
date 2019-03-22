// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('problems').doc(event.a).update({
      data: {
        p: event.b,
        //history: history
      },
      success: function (res) {
        console.log(res.data);
      }
    });
  }catch(e){
    console.error(e);
  }
  
  
}