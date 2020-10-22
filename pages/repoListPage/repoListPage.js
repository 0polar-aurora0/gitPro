// pages/repoListPage/repoListPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repoList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var url = "https://api.github.com/users/" + options.user + "/";
    var url = options.repos_url;
    var that = this;
    console.log(url);
    wx.showLoading({
      title: 'Loading',
    }); 
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      // timeout: 5000,
      success: function(e) {
        wx.hideLoading({
          success: (res) => {
            // console.log(res);
          },
        });
        console.log(e);
        console.log(e.data);
       
        that.setData({
          repoList: e.data
        });
      },
      fail: function(err) {
        console.log(err);
        wx.hideLoading({
          success: (res) => {
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