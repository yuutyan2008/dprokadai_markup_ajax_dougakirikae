let number = 0; //何番目のコードを表示するのかの数字を格納するnumber変数を用意
let data = []; // ajax.jsonから取得したデータを格納するための変数を初期化。次回クリックで前回のJSONデータを認識するため
// HTML要素を取得。一度取得したらプログラムの中で使うものは関数の外で定義し、
// クリックの度に取得の処理が実行されないようにしておく
const titleArea = document.getElementById("title"); //
const contentArea = document.getElementById("content"); //
const videoArea = document.getElementById("video"); //
const button = document.getElementById("btn"); //<button>要素を取得


// アクセスしてページ読み込み完了後、
// クリックイベントに対して、イベントハンドラを登録
window.onload = function () {
  button.addEventListener("click", movieClick);
};


// <button>要素をクリックした時のイベントリスナとして登録
function movieClick() {
  //clickは初回？ (number = 0 ?)
  if (data.length === 0) {
    getData(); // データを取得して更新
  } else { //初回ではない場合
    updateData(); // 取得済みのデータを使用して画面を更新
  }
};


// 1.XMLHttpRequestオブジェクトを生成し、サーバーとの非同期通信を行う準備をする
const request = new XMLHttpRequest(); //XMLHttpRequestオブジェクトが入ったrequestオブジェクトを使い、非同期通信が行われる

//2.onreadystatechangeプロパティで非同期通信開始から終了までに実行すべき処理を定義。XMLHttpRequestのプロパティ
//  onreadystatechange:サーバとの通信状態に変化があった(レスポンスが返ってきた)時に呼び出され、登録した処理を実行するイベントハンドラ
//①requestオブジェクトにどういう処理をするか決める
request.onreadystatechange = function () {

  //リクエストをサーバに送信する準備として、XMLHttpRequestオブジェクトのopenメソッドでHTTPリクエストを初期化する
  request.open("GET", "ajax.json"); //open()メソッドが呼ばれると、リクエストの準備が完了
  request.responseType = "json"; //サーバーからのレスポンスデータをJSON形式として受け取るように設定

  //②サーバに送信する
  request.send(null); //openメソッドで初期化されたHTTPリクエストをサーバーに送信する


  //-- 2-1
  //非同期通信が完了していたら
  if (request.readyState == 4) { //readyStateプロパティの戻り値が4になった時、つまり非同期通信が完了した時に
    // レスポンスデータを使い画像を更新
    //サーバからの応答が正常だった場合
    if (request.status == 200) { //ステータスコード200:リクエストが成功
      getData()
    }
  }
};


// getDataでjsonからのデー取得を定義
function getData() {
  //statusプロパティの戻り値は、HTTPのステータスコードをあわらす。
  // レスポンスデータを変数に格納
  data = request.response; //response: 応答データを持つ、XMLHttpRequestのプロパティ
  updateData(); // データ取得後にページを更新
}

// サーバからのレスポンスを画像データに反映させる
function updateData() { //
  titleArea.innerHTML = data[number].title; //innerHTMLプロパティは要素内の全てをタグやテキスト付きのHTMLとして取得する。
  // ここではタグ要素間のテキストを右辺のテキストに置き換える
  // <h1 id="title">ここにdata[number].titleの文字列を入れる</h1>
  contentArea.innerHTML = data[number].content; //
  videoArea.src = data[number].url; //
  number == 2 ? (number = 0) : number++; //最初のデータ(number = 0)がここで次のデータ(number = 1)になる。最後のデータが表示されたら、次は最初のデータに戻す
}