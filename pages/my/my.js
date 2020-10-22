// pages/my/my.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: app.globalData.islogin,
    userInfo: {},
    donateModalHidden: true,
  },

  /** 
   */
  onLoad: function (options) {
    
    this.setData({
      islogin: app.globalData.islogin
    });

    var that = this;

    wx.getStorage({
      key: 'loginLog',
      success: function ( e ) {
        console.log(e.data);
        console.log(e.data.login);
        that.setData({
          userInfo: e.data
        });
        console.log(that.data.userInfo);
        console.log(that.data.userInfo);
      },
      fail: function ( e ) {
        console.log("尚未获取用户信息");
      }
    });
    console.log("userInfo: ");
    console.log(this.userInfo);
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
    this.setData({
      islogin: app.globalData.islogin
    });

    var that = this;

    wx.getStorage({
      key: 'loginLog',
      success: function ( e ) {
        console.log(e.data);
        console.log(e.data.login);
        that.setData({
          userInfo: e.data
        });
        console.log("that.data.userInfo");
        console.log(that.data.userInfo);
      },
      fail: function ( e ) {
        console.log("尚未获取用户信息");
      }
    });
    console.log("userInfo: ");
    console.log(this.userInfo);
    
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

  // login登录绑定事件跳转
  NavigateToLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  //logout帐号登出
  logout: function() {
    console.log("账号登出");

    var that = this;
    this.data.userInfo = {};
    app.globalData.islogin = false;
    this.data.islogin = app.globalData.islogin
    wx.removeStorage({
      key: 'loginLog',
      success: function() {
        app.globalData.islogin = false;
        that.setData({
          islogin: app.globalData.islogin,
          userInfo: {}
        });
      }
    });
  },

  //blog model显示按钮
  blogTap: function() {
    console.log("blogTap");
    if (this.data.userInfo.blog == '') {
      var content = "您的github未绑定blog";
    } else {
      var content = this.data.userInfo.blog;
    };
    console.log("content:" + content);
    wx.showModal({
      showCancel: false,
      // cancelColor: 'cancelColor',
      title: "Blog",
      content: content
    })
  },

  //email model显示按钮
  emailTap: function() {
    console.log("emailTap");
    if (this.data.userInfo.blog == '') {
      var content = "您的github未绑定email";
    } else {
      var content = this.data.userInfo.email;
    };
    console.log("content:" + content);
    wx.showModal({
      showCancel: false,
      // cancelColor: 'cancelColor',
      title: "Blog",
      content: content
    })
  },

  //support model显示按钮
  supportTap: function() {
    console.log("supportTap");
  },
  //donate model显示按钮
  donateTap: function(e) {
    console.log("donatetTap");
    // wx.requestPayment({
    //   nonceStr: 'nonceStr', //随机字符串
    //   package: 'package', //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
    //   paySign: 'paySign', //签名
    //   signType: 'MD5', //签名算法
    //   timeStamp: 'timeStamp', //时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间
    //   success: function(){

    //   },
    //   fail: function() {

    //   }
    // })


    this.setData({
      donateModalHidden:false  
    });

  },

  donateModalCancel: function(e) {
    this.setData({
      donateModalHidden: true
    });
    console.log("donateModalCancel");
  },

  donateModalConfirm: function(e) {
    this.setData({
      donateModalHidden: true
    });
    console.log("donateModalConfirm");  
  },

  

  ToOtherUserPage: function(options) {

    var user = this.data.userInfo.login;
    var type = options.currentTarget.dataset.type;

    console.log(user);
    console.log(type);
    wx.navigateTo({
      url: '../OtherUserListPage/OtherUserListPage?user=' + user + '&type=' + type
    });
  },

  ToRepo: function () {
    console.log("ToRepo");
    wx.navigateTo({
      url: '../repoListPage/repoListPage?repos_url=' + this.data.userInfo.repos_url,
    })
  }

})
