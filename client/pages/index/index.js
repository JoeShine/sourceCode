//index.js
var app = getApp()
Page({
  data: {
    pageType: 2,
    // index
    userInfo: {},
    //open: false,   //是否打开红包
    //page: true,   //红包是否显示 
    orderOrBusiness: 'order',
    
        
    menu: [
      { id: 0, name: "热销" },
      { id: 1, name: "新品" },
      { id: 2, name: "下午茶" },
      { id: 3, name: "滋味盖饭" },
      { id: 4, name: "日式小食" },
      { id: 5, name: "系列套餐" },
      { id: 6, name: "特色炖汤" },
      { id: 7, name: "下午茶" },
      { id: 8, name: "日式小食" },
      { id: 9, name: "滋味盖饭" },
      { id: 10, name: "系列套餐" },
    ],
    arr2: [
      { id: 0, value: "香辣味" },
      { id: 1, value: "盐焗味" },
      { id: 2, value: "蒜香味" },
      { id: 3, value: "姜葱味" },
    ],

    height: 0,
    orderType: 0,  //点菜类型
    restaurant: false,  //餐厅点菜
    map_address: '',
    buycar_num: 0,
    block: false,  //选规格
    foodtype: 0,  //选规格种类
    bindId: 0,

    // buycar
    totalMoney: 0,
    chooseAll: false,
    arr: [
      { id: 0, img: "../../img/food2.jpg", name: "五花肉石锅拌饭", num: "3", price: "51.21", selected: false },
      { id: 1, img: "../../img/food2.jpg", name: "五花肉石锅拌饭", num: "3", price: "61", selected: false },
      { id: 2, img: "../../img/food2.jpg", name: "五花肉石锅拌饭", num: "3", price: "71", selected: false },
      { id: 3, img: "../../img/food2.jpg", name: "五花肉石锅拌饭", num: "3", price: "81", selected: false },
      { id: 4, img: "../../img/food2.jpg", name: "五花肉石锅拌饭", num: "3", price: "81", selected: false }
    ],
    arr3: [
      { id: 0, img: "../../img/food2.jpg", name: "五花肉石锅拌饭", num: "0", price: "51", message: "配米饭一份哦", message2: "月售330｜好评率100%", message3: [{ id: 0, value: "香辣味" }, { id: 1, value: "盐焗味" }, { id: 2, value: "蒜香味" }, { id: 3, value: "姜葱味" },] },
      { id: 1, img: "../../img/food2.jpg", name: "牛肉石锅拌饭", num: "0", price: "51", message: "配米饭一份哦", message2: "月售330｜好评率100%", message3: '' },
      { id: 2, img: "../../img/food2.jpg", name: "鸡肉石锅拌饭", num: "0", price: "51", message: "配米饭一份哦", message2: "月售330｜好评率100%", message3: [{ id: 0, value: "香辣味2" }, { id: 1, value: "盐焗味2" }, { id: 2, value: "蒜香味2" }, { id: 3, value: "姜葱味2" },] },
      { id: 3, img: "../../img/food2.jpg", name: "羊肉石锅拌饭", num: "0", price: "51", message: "配米饭一份哦", message2: "月售330｜好评率100%", message3: [{ id: 0, value: "香辣味3" }, { id: 1, value: "盐焗味3" }, { id: 2, value: "蒜香味3" }, { id: 3, value: "姜葱味3" },] },
      { id: 4, img: "../../img/food2.jpg", name: "驴肉石锅拌饭", num: "0", price: "51", message: "配米饭一份哦", message2: "月售330｜好评率100%", message3: [{ id: 0, value: "香辣味4" }, { id: 1, value: "盐焗味4" }, { id: 2, value: "蒜香味4" }, { id: 3, value: "姜葱味4" },] },
    ],
    // order
    orderOk: false,
    // me
    img: '',

    //选择订餐基础信息
   date: "2018-04-25",
   arrayType: ['早餐','午餐','晚餐'],
   objectArray:[{
      id : 0,
      name : '早餐'
   },
   {
      id: 1,
      name : '午餐'
   },
   {
      id : 2,
      name : '晚餐'
   }],
   indexType: 1,
   arrayPeriod: ['12:00~12:15','12:15~12:30','12:30~13:00'],
   objectArray1:[{
     id: 0,
     name: '12:00~12:15'
   },
   {
     id: 1,
     name: '12:15~12:30'
   },
   {
     id: 2,
     name: '12:30~13:00'
   }],
   indexPeriod: 1
  },
  onLoad: function () {    
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2/?ak=LClVsCTaW2aH8MzuviP1YMymrHWOIVvg&coordtype=gcj02ll&location=' + latitude + ',' + longitude + '&output=json&pois=0',
          method: "get",
          success: function (res) {
            var address = res.data.result.formatted_address;
            address = address.split('省')[1].split('市')[1];
            that.setData({
              map_address: address
            }) 
            console.log(that.data.map_address)
          }
        })
      }
    })
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
        img: userInfo.avatarUrl
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ 
          height: (res.windowHeight*.57)+'px'
        })
      }
    });
  },
  //新增的事件
  bindDateChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTypeChange: function(e){
    console.log('picker发送选择改变，携带值为',e.detail.value)
    this.setDate({
        indexType: e.detail.value
    })
  },
  bindPeriodChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        indexPeriod: e.detail.value
    })
  },
  turnMenu: function(e) {
    var type = e.target.dataset.index;
    console.log(type)
    this.setData({
      orderType: type
    })
  },
  chooseType: function (e) {
    var type = e.currentTarget.dataset.id;
    if (type == 1 && this.data.restaurant == true) {
      wx.setNavigationBarTitle({ title: '点餐' })
    } else if (type == 1 && this.data.restaurant != true) {
      wx.setNavigationBarTitle({ title: '公司报餐系统' })
    } else if (type == 2) {
      wx.setNavigationBarTitle({ title: '点餐' })
    } else if (type == 3) {
      wx.setNavigationBarTitle({ title: '订单' })
    } else if (type == 4) {
      wx.setNavigationBarTitle({ title: '我的' })
    }
    this.setData({
      pageType: type
    })
  },
  // index
  toSetmenu: function() {
    wx.navigateTo({
      url: '../setmenu/setmenu'
    })
  },
  toFoodDetail: function() {
    wx.navigateTo({
      //url: '../detail/detail',
    })
  },
  reduce: function (e) {
    var i = e.currentTarget.dataset.id;
    var arr3 = this.data.arr3;
    if (arr3[i].num > 1) { 
      wx.showToast({
        title: '多规格商品只能去购物车删除哦',
        duration: 2000
      })
    }else{
      if (arr3[i].num > 0) {
        arr3[i].num = parseInt(arr3[i].num) - 1;
        this.setData({
          arr3: arr3
        })
      }      
    }
  },
  reduce2: function (e) {
    var i = e.currentTarget.dataset.id;
    var arr3 = this.data.arr3;
    if (arr3[i].num > 0) {      
      arr3[i].num = parseInt(arr3[i].num) - 1;
      this.setData({
        arr3: arr3
      })
    }
  },
  add: function (e) {
    var i = e.currentTarget.dataset.id;
    var arr3 = this.data.arr3;
    var arr = arr3[i].message3;    
    this.setData({
      block: true,
      arr2: arr,
      bindId: i
    })
  },
  add2: function (e) {
    var i = e.currentTarget.dataset.id;
    var arr3 = this.data.arr3;
    arr3[i].num = parseInt(arr3[i].num) + 1;
    this.setData({
      arr3: arr3
    })
  },
  close: function () {
    this.setData({
      block: false
    })
  },
  resetNum: function (e) {
    var type = e.currentTarget.dataset.id;
    this.setData({
      foodtype: type
    })
  },
  submit: function() {
    var i = this.data.bindId;
    var arr3 = this.data.arr3;
    arr3[i].num = parseInt(arr3[i].num)+1
    this.setData({
      block: false,
      arr3: arr3
    })
  },
    // buycar
  del: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success: function (res) {
        if (res.confirm) {
          var index = parseInt(e.currentTarget.dataset.id);
          var arr = that.data.arr;
          var totalMoney = that.data.totalMoney;
          var buycar_num = that.data.buycar_num;
          if (arr[index].selected) {
            totalMoney -= Number(arr[index].price * arr[index].num);
            buycar_num -= Number(arr[index].num);
          }
          arr.splice(index, 1);
          that.setData({
            arr: arr,
            totalMoney: totalMoney,
            buycar_num: buycar_num
          });
        }
      }
    })    
  },
  choose: function (e) {
    var index = parseInt(e.currentTarget.dataset.id);
    var selected = this.data.arr[index].selected;
    var arr = this.data.arr;
    var totalMoney = this.data.totalMoney;
    var buycar_num = this.data.buycar_num;
    arr[index].selected = !selected;
    if (arr[index].selected) {
      totalMoney += Number(arr[index].price * arr[index].num);
      buycar_num += Number(arr[index].num);
    } else {
      totalMoney -= Number(arr[index].price * arr[index].num);
      buycar_num -= Number(arr[index].num);
    }
    totalMoney = Number(totalMoney).toFixed(2);
    this.setData({
      arr: arr,
      totalMoney: Number(totalMoney),
      buycar_num: buycar_num
    });
  },
  toSubmit: function() {
    wx.navigateTo({
      url: '../submitOrder/submitOrder',
    })
  },
  numAdd: function(e) {
    var index = parseInt(e.currentTarget.dataset.id);
    var selected = this.data.arr[index].selected;
    var arr = this.data.arr;
    var totalMoney = this.data.totalMoney;
    var buycar_num = this.data.buycar_num;
    arr[index].num = Number(arr[index].num) + 1;
    if(selected==true){
      totalMoney += Number(arr[index].price);
      buycar_num += 1;
    }
    totalMoney = Number(totalMoney).toFixed(2);
    this.setData({
      arr: arr,
      totalMoney: Number(totalMoney),
      buycar_num: buycar_num
    });
  },
  numReduce: function (e) {
    var index = parseInt(e.currentTarget.dataset.id);    
    var arr = this.data.arr;
    if (arr[index].num > 1) {
      var selected = arr[index].selected;
      var totalMoney = this.data.totalMoney;
      var buycar_num = this.data.buycar_num;
      arr[index].num = Number(arr[index].num) - 1;
      if (selected == true) {
        totalMoney -= Number(arr[index].price);
        buycar_num -= 1;
      }
      totalMoney = Number(totalMoney).toFixed(2);
      this.setData({
        arr: arr,
        totalMoney: Number(totalMoney),
        buycar_num: buycar_num
      });
    }    
  },
  // order
  orderOk: function() {
    this.setData({
      orderOk: true
    })
  },
  okCancel: function() {
    this.setData({
      orderOk: false
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '18316588252',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  okOk: function () {
    this.setData({
      orderOk: false
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toMyAddress: function () {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  toDetail: function() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    })
  }
})
