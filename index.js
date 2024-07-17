    <script>
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
                    // 通信完了時の処理（ローディング画像を非表示にし、コンテンツを表示）
                    $('#loading').hide();
                    $('#content').show();
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
  
  progressBar0.style.height = `${jsonData.progress_rate*100}`+'%';
 //progressBar0.style.height = "10"+"vw";




  if (jsonData.rank === "レギュラー") {
      document.querySelector("pa").style.backgroundColor = "#f5deb3";
    } else if (jsonData.rank === "シルバー") {
      document.querySelector("pa").style.backgroundColor = "#f5f5f5";
    } else if (jsonData.rank === "ゴールド") {
      document.querySelector("pa").style.backgroundColor = "#f0e68c";
    } else if (jsonData.rank === "プラチナ") {
      document.querySelector("pa").style.backgroundColor = "#add8e6";
    } else if (jsonData.rank === "ダイヤモンド") {
      document.querySelector("pa").style.backgroundColor = "#1e90ff";
    } else {
      // その他の場合のデフォルトの背景色を設定
      document.querySelector("pa").style.backgroundColor = "#f5f5dc";
    }

    }


    </script>
