// pages/repoPage/repoPage.js

var base64 = require("../../utils/base64");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRepoData: false,
    repoData: null,
    readme_data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    //请求主题数据
    wx.showLoading({
      title: '正在加载数据',
    })
    console.log(options);
    var that = this;
    var url = "https://api.github.com/repos/" + options.full_name;
    wx.request({
      url: url,
      method: "GET",
      success: function (e) {
        console.log("数据获取成功");
        console.log(e);
        that.setData({
          isRepoData: true,
          repoData: e.data
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

    //请求readme数据 
    var readme_url = url + "/readme";
    wx.request({
      url: readme_url,
      method: "GET",
      success: function (e) {
        console.log("数据获取成功");
        console.log(e);
        that.setData({
         readme_data: base64.decode(e.data.content)
        });
      },
      fail: function () {
        console.log("数据获取失败");
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

  toUserPage: function(params) {
    // wx.redirectTo({
    //   url: '../OtherUserPage/',
    // })
  },

  toWatchsPage: function(e) {
    wx.navigateTo({
      url: '../OtherUserListPage/OtherUserListPage?user=' + e.currentTarget.dataset.user + '&type=' + e.currentTarget.dataset
    })
  },

  goToFile: function(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.fullname);
    wx.navigateTo({
      url: '../repoDirectory/repoDirectory?full_name=' + e.currentTarget.dataset.fullname,
    })
  },

  goToOtherUserPage: function(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.user);
    wx.navigateTo({
      url: '../OtherUserPage/OtherUserPage?user=' + e.currentTarget.dataset.user,
    })
  },
  
})