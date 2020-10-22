// pages/login/login.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0
  },

  dataRequest: function (e) {
  
    var that = this;

    wx.request({
      url: 'http://301t35260f.qicp.vip/', 
      // timeout: 10,
      method:"POST",
      data: {
        form_data: e.detail.value
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        // 加载完毕
        wx.hideLoading();
        console.log("res.data: " + res.data);
        console.log("JSON.stringify(res.data): " + JSON.stringify(res.data));
        console.log("res.data.serverStatus: " + res.data.serverStatus);
        console.log("res.data.serverNumber: " + res.data.serverNumber);
        console.log("res.data.serverInformation: " + res.data.serverInformation);
        console.log(res.data.login);
        console.log("正在修改islogin全局参数");
        console.log("app.globalData.islogin befor: " + app.globalData.islogin);
        app.globalData.islogin = res.data.serverStatus;
        console.log("app.globalData.islogin after: " + app.globalData.islogin);
        if ( res.data.serverStatus == true && res.data.serverNumber == 0) {
          wx.switchTab({
            url: '../my/my',
          });
          wx.setStorage({
            data: res.data,
            key: 'loginLog',
          });
          app.globalData.islogin = res.data.serverStatus;
        } else if ( res.data.serverStatus == false && res.data.serverNumber == 1) {
            wx.showToast({
              title: res.data.serverInformation,
              image: "../../images/失败.png",
              icon: null
            })
        } else if ( res.data.serverStatus == false && res.data.serverNumber == 2) {
            wx.showToast({
              title: res.data.serverInformation,
              image: "../../images/失败.png",
              icon: null
            });
            that.dataRequest(e);
        }; 
      } 
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo( {

        success: function( res ) {
            that.setData( {
                winWidth: res.windowWidth,
                winHeight: res.windowHeight
            });
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


  // tab切换逻辑
  swichNav: function( e ) {

    var that = this;

    if( this.data.currentTab === e.target.dataset.current ) {
        return false;
    } else {
        that.setData( {
            currentTab: e.target.dataset.current
        })
    }
  },

  // swiper区域滑动时切换标题
  swiperChange: function( e ) {
    var that = this;
    that.setData({ 
        currentTab: e.detail.current
    });
  },

  btnlogin: function(e) {
    // const client_id = 
    console.log("按下去了")
  },

  credentials_formSubmit: function(e) {
   
    var that = this;

    wx.showLoading({
      title: '服务器正在请求github',
    });
    console.log("credentials表单提交");
    console.log(e.detail.value);
    if (e.detail.value.credentials_username !== '' && e.detail.value.credentials_password !== '') {
      that.dataRequest(e);
    } else {
      console.log("表单输入不完整");
      wx.showToast({
        title: '请补全信息',
        icon: "none",
        success: "成功弹出提示",
      })
    }
  },
  access_token_formSubmit: (e)=>{
    console.log("access_token表单提交");
    console.log(e.detail.value);
    if (e.detail.value.access_token !== '' ) {
      wx.request({
        url: 'http://301t35260f.qicp.vip/login', 
        method:"POST",
        data: {
          form_data: e.detail.value
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log("成功");
          console.log(res.data);
          console.log(JSON.stringify(res.data));
        }
      })
    } else {
      console.log("表单输入不完整");
      wx.showToast({
        title: '请补全信息',
        icon: "none",
        success: "成功弹出提示",
      })
    }
  },
  client_formSubmit: (e)=>{
    console.log("client表单提交");
    console.log(e.detail.value);
    if (e.detail.value.client_id !== '' && e.detail.value.client_secret !== '') {
      wx.request({
        url: 'http://301t35260f.qicp.vip/', 
        method:"POST",
        data: {
          form_data: e.detail.value
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data);
          wx.setStorage({
            data: res.data,
            key: 'key',
          })
        }
      })
    } else {
      console.log("表单输入不完整");
      wx.showToast({
        title: '请补全信息',
        icon: "none",
        success: "成功弹出提示",
      })
    }
    
  },

  formReset: (e)=>{
    console.log("表单重置");
    console.log(e.detail.client_id);
    let btnDom = documn
  },

  


  // href_skip: (e)=> {
  //   wx.navigateTo({
  //     url: '../web_view/web_view',
  //   })
  // }

})