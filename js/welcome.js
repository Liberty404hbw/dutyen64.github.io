function updateWelcomeInfo() {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ip = data.ip;
      return fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json())
        .then(locationData => {
          const city = locationData.city || '未知城市';
          const region = locationData.region || '未知地区';
          const country = locationData.country_name || '未知国家';
          const latitude = locationData.latitude;
          const longitude = locationData.longitude;

          // 计算距离（你可能想实现一个更准确的计算方法）
          const distance = Math.round(Math.random() * 2000);

          const now = new Date();
          const hour = now.getHours();
          let greeting;
          if (hour < 5) greeting = "凌晨好";
          else if (hour < 9) greeting = "早上好";
          else if (hour < 12) greeting = "上午好";
          else if (hour < 14) greeting = "中午好";
          else if (hour < 18) greeting = "下午好";
          else if (hour < 22) greeting = "晚上好";
          else greeting = "夜里好";

          const welcomeInfo = `
            <b><center>🎉 Wecome 🎉</center>
            欢迎来自 <span style="color:var(--blue-custom)">${country} ${region} ${city}</span> 的小伙伴，
            <span>${greeting}</span>，相遇即缘！
            您现在距离站长约 <span style="color:var(--blue-custom)">${distance}</span> 公里，
            当前的IP地址为： <span style="color:var(--blue-custom)">${ip}</span></b>
          `;

          document.getElementById('welcome-info').innerHTML = welcomeInfo;
        });
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('welcome-info').innerHTML = '<b>欢迎来访！</b>';
    });
}

document.addEventListener('DOMContentLoaded', updateWelcomeInfo);