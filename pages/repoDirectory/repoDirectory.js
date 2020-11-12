// pages/repoDirectory/repoDirectory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repoDirectoryData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载数据',
    })
    console.log(options);
    var that = this;
    if (options.full_name) {
      var url = "https://api.github.com/repos/" + options.full_name +"/git/trees/master";
    } else {
      var url = options.url
    }
    console.log(url);
    wx.request({
      url: url,
      method: "GET",
      success: function (e) {
        console.log("数据获取成功");
        console.log(e);
        console.log(e.data.tree);
        that.setData({
          repoDirectoryData: e.data.tree
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

  openFolder: function(e) {
    if (e.currentTarget.dataset.type == "tree") {
      wx.navigateTo({
        url: '../repoDirectory/repoDirectory?url=' + e.currentTarget.dataset.url,
      })
    } else {
       wx.navigateTo({
      url: '../repoDocument/repoDocument?url=' + e.currentTarget.dataset.url,
    })
    }
   
  }

})