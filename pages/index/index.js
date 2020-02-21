// import request from '../../service/network.js'
import { getMultiData, getGoodsData } from '../../service/home.js'
const types=['pop','new','sell']
const distance = 1000;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    goods: {
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] },

    },
    currentType:'pop',
    showBackTop:false,
    isTabFixed:false,
    tabScrollTop:0
  },
  tabClick(e) {
    console.log(e)
    const index = e.detail.index
    this.setData({
      currentType:types[index]
    })
      console.log(this.data.currentType)
  },

  // 网络请求函数

  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })

  },
  _getGoodsData(type) {
    var page = this.data.goods[type].page+1;
    getGoodsData(type, page).then(res => {
     const list = res.data.data.list
     const oldList = this.data.goods[type].list;
     oldList.push(...list)
    const typeKey= `goods.${type}.list`;
    const pageKey=`goods.${type}.page`;
    this.setData({
      [typeKey]:oldList,
      [pageKey]:page
    })
console.log(this.data.goods)
    })
  },
  





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this._getMultiData()
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
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
    setTimeout(()=>{
      wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
        console.log(rect)
        this.data.tabScrollTop=rect.top
      }).exec()

    },1000)
  
    
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
    this._getGoodsData(this.data.currentType)
    
  },
  onPageScroll(options){
    const scrollTop = options.scrollTop;
    const flag = scrollTop >= distance
    if (flag != this.data.showBackTop){
      this.setData({
        showBackTop:flag
      })
    }

    const flag2 = scrollTop>=this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }

  }
  ,

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }



})
