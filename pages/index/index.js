//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasProjectInfo: false,
    projectData: null,
    searchTop: app.globalData.searchTop,
    searchHeight: app.globalData.searchHeight
  },
  //logs日志
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    // this.setData({
    //   searchHeight: app.globalData.searchHeight,
    //   searchTop: app.globalData.searchTop
    // });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };

    //github请求
    wx.showLoading({
      title: '正在加载数据',
    });
    var that = this;
    var url = "https://api.github.com/search/repositories?q=tetris:sort=stars";
    wx.request({
      url: url,
      method: "GET",
      success: function (e) {
        console.log("数据获取成功");
        console.log(e);
        console.log(e.data.items);
        that.setData({
          hasProjectInfo: true,
          projectData: e.data.items
        });
        console.log(that.data.projectData);
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
              content: content
            })
          },
        })  
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //自定义函数
  toOtherUserPage: function(e) {
    var user = e.currentTarget.dataset.login;
    wx.navigateTo({
      url: '../OtherUserPage/OtherUserPage?user=' + user
    })
  },

  toRepoPage: function(e) {
    var full_name = e.currentTarget.dataset.full_name;
    wx.navigateTo({
      url: '../repoPage/repoPage?full_name=' + full_name
    })
  }

})
