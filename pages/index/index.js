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
    arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
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

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    
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
          url: 'https://www.webstudy.cc/api/v1/heroes/heroinfo', 
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
