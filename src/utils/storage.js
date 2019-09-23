
/**
 *  封装localstorage相关功能,用于缓存socket相关数据
 */
var storage = {
  getItem: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setItem: function (key,data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  removeItem: function (key) {
    localStorage.removeItem(key)
  },
  clear: function () {
    localStorage.clear()
  }
};

export default storage