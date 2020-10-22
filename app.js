//app.js

App({
  globalData: {
    login: null,
    islogin: false,
    searchTop: null,
    searchHeight: null,
  },

  //小程序初始化完成时
  onLaunch: function () {

    //自定义导航栏的位置自适应

    //获取胶囊按钮位置
    var menuButtonObject = wx.getMenuButtonBoundingClientRect();
    console.log(menuButtonObject);

    // var that = this;

    //获取距离顶部高度
    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
        var statusBarHeight = result.statusBarHeight;
        var searchTop = menuButtonObject.top; //search搜索框顶部距离
        var searchHeight = menuButtonObject.height;
        // navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
        // navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度

        this.globalData.searchTop = searchTop;
        this.globalData.searchHeight = searchHeight;

        // that.setData({
        //   searchTop: searchTop,
        //   searchHeight: searchHeight
        // });
      },
      fail: function (err) {
        console.log(err);
      }
    })

    //获取缓存,读取缓存并存入全局变量
    wx.getStorage({
      key: 'loginLog',
      success: function(e) {
        console.log("缓存数据展示: ");
        // console.log(e);
        console.log(e.data.serverStatus);
        console.log(e.data.serverNumber);
        console.log(e.data.serverInformation);
        getApp().globalData.islogin = e.data.serverStatus;
      },
      fail: function( e ) {
        console.log("暂无缓存");
      }
    });

    
  },


  

})