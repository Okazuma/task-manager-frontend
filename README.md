# アプリケーション名
    task-manager フロントエンド (Todoアプリのフロントエンド)
<img width="650" src="https://github.com/user-attachments/assets/53445c5a-4ed5-415c-9bd0-a295ac0adbb5">




## 概要説明
- シンプルなTodoアプリ

- ユーザー認証後にTodoリストを個人用ページで管理できる




## 作成目的
- 予定やタスクをメモ帳感覚で入力して直感的な操作で管理できるように

- CRUD操作の基本の作成・取得・更新・削除の基本の学習のため




## フロントエンドの役割
- バックエンドAPIとの連携
  task-managerアプリのフロントエンドとして、バックエンドAPIにリクエストを送信してユーザーにUI,UXを提供する。

- UI / UX の提供
  ユーザーが直感的に操作できる シンプルなデザイン の実装
  レスポンシブ対応（スマホ・PC どちらでも快適に利用可能）

- APIとの通信
  投稿の取得・作成・削除・編集 のリクエストをバックエンドAPIに送信
  いいね機能の管理（ユーザーのリアクションを送信し、リアルタイムで更新）
  認証済みユーザーのみが投稿・いいねできるよう制御

- 状態管理（アプリのデータ管理）
  キャッシュを活用して無駄なAPIリクエストを削減
  リアルタイムでデータを更新し、スムーズな操作性を実現

- エラーハンドリング & セキュリティ
  API通信の エラーハンドリング（ネットワークエラー・認証エラーなどを適切に処理）
  未ログインユーザーの制限（ログイン済みのユーザーのみTodoの登録が可能）
  入力バリデーションの実装（不正な投稿データが送られないようにチェック）




## アプリケーションURL

##### ローカル環境

`http://localhost:8081/`




## 機能一覧
- ユーザー管理機能 (laravel Fortify)
  ユーザーの新規登録・ログイン・ログアウト
  認証済みユーザーのみ利用可能
  未認証の場合Loginページに遷移し認証を促す仕様
  ユーザー情報はProfileページから編集可能

- 投稿機能
  投稿の作成・編集・削除
  投稿の一覧表示
  投稿の詳細表示

- Todoリストからのリアルタイム検索




## 詳細内容
- ユーザー管理機能 (Laravel Fortify)
  テスト用ユーザー(ログイン用)
    ユーザー名:テスト / email: test@example.com / password: password
  新規登録時は名前・メールアドレス・パスワードを入力
  ログイン時は名前・メールアドレス・パスワードを入力
  Profileページからユーザー情報の更新が可能

- Todo機能
  Todoの作成は最大は255文字まで可能
  Todo作成・編集・削除時はリアルタイムで反映
  Todo作成・編集・削除時は確認ダイアログを表示

- 編集機能
  Editボタンを押すとモーダルが表示されTodoを更新できる




## 使用技術
- Vue.js 3.2
- Vue CLI (ビルドツール)
- Prettier / ESLint (コードフォーマット & 品質チェック)




## 環境構築 & 開発サーバー起動手順

    1 リポジトリをクローン
      git clone https://github.com/Okazuma/share-app-frontend.git
      $ cd share-app-frontend

    2 依存パッケージのインストール
      $ npm install

    3 .env ファイルの作成
      cp .env.example .env
       .env の内容:  VUE_APP_API_BASE_URL=http://localhost/api

    4 開発サーバーの起動
      $ npm run serve

    5 ローカル環境でアプリにアクセス可能
      http://localhost:8081/

    ※ 開発サーバーが起動しない場合
      .env の VUE_APP_API_BASE_URL を正しく設定する
      Laravel バックエンドが http://localhost:8001 で起動していることを確認してください

    ※ npm install でエラーが発生する場合は以下のコマンドでキャッシュをクリアして再試行する
      $ rm -rf node_modules package-lock.json
      $ npm install
