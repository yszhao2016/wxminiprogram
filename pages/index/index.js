//index.js
//获取应用实例

import api from '../../config/config.js'

const app = getApp()

Page({


  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  gotoDetail:function(event){
   
    const id = event.currentTarget.dataset.id;
    const url = "/pages/detail/detail?id="+id;//得到页面url 
    wx.navigateTo({
      url: url, 
    }) 
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getTableData();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  getTableData: function () {//自定义函数名称
    var that = this; 
    // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
          //请求接口的地址
          url: api.heroes, 
          data: {
      
          },
          header: {
            "Content-Type": "applciation/json" //默认值
          },
          success: function (res) {
          //res相当于ajax里面的返回的数据
          //如果在sucess直接写this就变成了wx.request()的this了
          //必须为getTableData函数的this,不然无法重置调用函数
                that.setData({
                  datas: res.data.data //datas传值给页面的，可以自定义命名
                })
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
  })}
})
