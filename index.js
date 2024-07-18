 <script>

  function liff_start(){

   
    // LIFFの初期化
    liff.init({ liffId: '1657196041-ALeOLrEa' }, () => {
        if (liff.isLoggedIn()) {
            // ユーザーがログインしている場合
            sendIdTokenToGAS();
        } else {
            // ログインが必要な場合、ログインページを表示
            liff.login();
        }
    });

}
   

    // IDトークンをGASに送信する関数
    function sendIdTokenToGAS() {
        const idToken = liff.getIDToken();

        // ローディング画像表示
        $('#loading').show();

        // IDトークンをGASに送信
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbz4I7jwbEU7UFqtoFQnCzVqKtG5xA9dBUw0s-jR8aBxbZ5LzIF8ISLXU7czUhVPYTBnjQ/exec',
            type: 'POST',
            data: { idToken: idToken },
            success: function (response) {
                // 成功時
                console.log(response);
                displayData(response);
            },
            error: function (error) {
                // エラー時
                console.error(error);
                alert('Failed to send ID Token to GAS.');
            },
            complete: function () {
                // 通信完了時の処理
                $('#loading').hide();
            }
        });
    }
  
    // メッセージを表示する関数
    function displayMessage(message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        document.body.appendChild(messageElement);
    }

    // 取得したデータをHTMLに表示する関数
    function displayData(data) {
        const jsonData = JSON.parse(data);

        const progressBar0 = document.getElementById('progressBar_vertical');
        progressBar0.style.height = `${jsonData.progress_rate * 100}%`;

        if (jsonData.rank === "シルバー") {
document.getElementById('loading').style.display = 'none'; // Hide loading screen
          document.getElementById('main-content').style.display = 'block'; // Show main content

         
        } else {
            displayMessage("表示できません");
        }
    }
</script>
