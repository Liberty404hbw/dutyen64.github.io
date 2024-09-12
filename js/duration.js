(function() {
  function update() {
      var now = new Date();
      var grt = new Date("2024-09-10 00:00:00");  // 设置为您的网站开始时间
      var timeDifference = now - grt;  // 计算时间差，单位是毫秒

      var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));  // 计算天数
      var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);  // 计算剩余小时
      var minutes = Math.floor((timeDifference / (1000 * 60)) % 60);  // 计算剩余分钟
      var seconds = Math.floor((timeDifference / 1000) % 60);  // 计算剩余秒数

      // 拼接显示的结果
      var result = "本站已运行: ";
      result += days + " 天 ";
      result += hours + " 小时 ";
      result += minutes + " 分 ";
      result += seconds + " 秒";

      // 更新页面内容
      document.querySelector('.duration').textContent = result;
  }

  update();
  setInterval(update, 1000);  // 每秒更新一次
})();
