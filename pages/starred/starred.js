// pages/starred/starred.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    starred_url: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    console.log(app.globalData.islogin);
    console.log(app.globalData.login);
    if(app.globalData.islogin == true){
      wx.showLoading({
        title: '正在加载数据',
      })
      var that = this;
      var url = "https://api.github.com/users/" + app.globalData.login +'/starred';
      console.log(url);
      wx.request({
        url: url,
        method: "GET",
        success: function (e) {
          console.log("数据获取成功");
          console.log(e);
          that.setData({
            starred_url: e.data
          });
          wx.hideLoading({
            success: (res) => {},
          })
        },
        fail: function () {
          console.log("数据获取失败");
          wx.hideLoading({
            success: (res) => {
              console.log("loading关闭");
              var content = "网络波动, 请稍后重试";
              wx.showModal({
                showCancel: false,
                // cancelColor: 'cancelColor',
                title: "ERR",
                content: content,
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              })
            },
          })  
        }
      });
    }
    
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

  toRepoPage: function(e) {
    var full_name = e.currentTarget.dataset.full_name;
    var url = '../repoPage/repoPage?full_name=' + full_name;
    
    // var url = '../repoPage/repoPage?full_name=0polar-aurora0/fzh_cluster_daemon';

    console.log(url);
    wx.navigateTo({
      url: url
    })
  }
})