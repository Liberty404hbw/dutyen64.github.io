(function() {
    function createPasswordForm() {
      const form = document.createElement('div');
      form.innerHTML = `
        <div id="custom-encrypt-form" style="text-align: center; margin: 20px 0;">
          <input type="password" id="encrypt-password" placeholder="请输入密码" style="margin-right: 10px; padding: 5px;">
          <button id="encrypt-submit" style="padding: 5px 10px;">确认</button>
        </div>
      `;
      return form;
    }
  
    function decryptContent(password, encryptedContent) {
      try {
        // 使用 CryptoJS 进行解密（需要引入 CryptoJS 库）
        const decrypted = CryptoJS.AES.decrypt(encryptedContent, password).toString(CryptoJS.enc.Utf8);
        return decrypted;
      } catch (e) {
        console.error('Decryption failed:', e);
        return null;
      }
    }
  
    function showContactInfo(element) {
      const contactInfo = document.createElement('div');
      contactInfo.innerHTML = `
        <div style="text-align: center; margin: 20px 0;">
          <p>密码错误或未输入密码。如需帮助，请扫描下方二维码联系博主：</p>
          <img src="/images/WeChatPay.png" alt="联系博主" style="width:200px;height:200px;">
        </div>
      `;
      element.parentNode.insertBefore(contactInfo, element.nextSibling);
    }
  
    document.addEventListener('DOMContentLoaded', function() {
      const encryptedElement = document.querySelector('#hexo-blog-encrypt');
      if (encryptedElement) {
        // 移除默认的密码输入框
        const defaultForm = document.querySelector('form[id^="hbeForm"]');
        if (defaultForm) {
          defaultForm.remove();
        }
  
        // 添加自定义密码输入框
        const customForm = createPasswordForm();
        encryptedElement.insertBefore(customForm, encryptedElement.firstChild);
  
        // 处理密码提交
        document.getElementById('encrypt-submit').addEventListener('click', function() {
          const password = document.getElementById('encrypt-password').value;
          const encryptedContent = document.querySelector('script[id^="hbeData"]').textContent;
  
          const decryptedContent = decryptContent(password, encryptedContent);
          if (decryptedContent) {
            // 解密成功，显示文章内容
            const articleContainer = document.querySelector('#article-container');
            articleContainer.innerHTML = decryptedContent;
            // 移除加密相关的元素
            encryptedElement.remove();
          } else {
            alert('密码错误，请重试。');
            showContactInfo(encryptedElement);
          }
        });
      }
    });
  })();