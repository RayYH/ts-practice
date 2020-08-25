let googleMap = {
  show: function () {
    console.log('start rendering google map');
  }
}

let baiduMap = {
  show: function () {
    console.log('start rendering baidu map');
  }
}

let renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
}

renderMap(googleMap);
renderMap(baiduMap);
