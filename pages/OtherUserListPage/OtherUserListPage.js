// pages/OtherUserListPage/OtherUserListPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    OtherUserList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = "https://api.github.com/users/" + options.user + "/" + options.type;
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
          OtherUserList: e.data
        });

        console.log(that.data.OtherUserList);

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

  toOtherUserPage: function (e) {
    var user = e.currentTarget.dataset.login;
    console.log("user:" + user);
    wx.navigateTo({
      url: '../OtherUserPage/OtherUserPage?user=' + user,
    })
  }

})