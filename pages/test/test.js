// pages/test/test.js
var app = getApp();
  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_list: 
      [
        [
          {
            "id": "1",
            "name": "菜鸟教程",
            "url": "www.runoob.com"
          },
          {
            "id": "2",
            "name": "菜鸟工具",
            "url": "c.runoob.com"
          },
          {
            "id": "3",
            "name": "Google",
            "url": "www.google.com"
          }
        ],
        [
          {
            "id": "1",
            "name": "菜鸟教程",
            "url": "www.runoob.com"
          },
          {
            "id": "2",
            "name": "菜鸟工具",
            "url": "c.runoob.com"
          },
          {
            "id": "3",
            "name": "Google",
            "url": "www.google.com"
          }
        ]
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  bbb(e) {
    // console.log("app.globalData.islogin: ");
    // console.log(app.globalData.islogin);
    console.log("app.globalData.userInfo.followers_url");
    console.log(app.globalData.login);
    // wx.request({
    //   url: app.globalData.userInfo.followers_url,
    //   success: function(e){
    //     console.log(e);
    //   },
    //   fail: function(e) {
    //     console.log(e);
    //   }
    // })
  }
})