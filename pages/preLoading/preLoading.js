// pages/preLoading/preLoading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //向数据库请求加载资源图片
   

    wx.request({
      url: 'http://301t35260f.qicp.vip/preload', 
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("已获取服务器数据");
        console.log(res.data);
        
        setTimeout(() => {
          wx.reLaunch({
            url: '../index/index',
          });
        }, 3000);

       
      },
      fail: function(err) {
        console.log(err);
      }
    });
    // wx.reLaunch({
    //   url: '../index/index',
    // })
    
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

})