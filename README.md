# Domail Validator

メールアドレスのタイポを自動検出して修正提案する軽量JavaScriptライブラリ 📧

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/okada-taisho/domail-validator)

## ✨ 特徴

- **簡単導入** - HTMLにクラスを追加するだけで自動動作
- **軽量** - わずか11KB（minified）
- **カスタマイズ可能** - ドメインリストやスタイルを自由に変更
- **日本語対応** - 日本でよく使われるドメインもサポート

## 🚀 クイックスタート

### CDN経由で使用（最も簡単）

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Domail Validatorを読み込み -->
    <script src="https://cdn.jsdelivr.net/gh/okada-taisho/domail-validator@latest/dist/mailcheck.min.js"></script>
</head>
<body>
    <!-- メール入力欄にクラスを追加するだけ -->
    <input type="email" class="js-mailcheck-input" placeholder="メールアドレスを入力">
</body>
</html>
```

これだけで動作します！メールアドレスを入力してフォーカスを外すと、自動的にチェックされます。

### ダウンロードして使用

1. [最新版をダウンロード](https://github.com/okada-taisho/domail-validator/releases)
2. HTMLファイルに追加：

```html
<script src="path/to/mailcheck.min.js"></script>
```

## 📖 使い方

### 基本的な使用方法

入力欄に `js-mailcheck-input` クラスを追加するだけ：

```html
<form>
    <div class="form-group">
        <label>メールアドレス</label>
        <input type="email" class="js-mailcheck-input form-control">
    </div>
</form>
```

### 動作の流れ

1. ユーザーがメールアドレスを入力
2. 入力欄からフォーカスが外れる
3. タイポが検出されると修正提案が表示
4. 提案をクリックすると自動修正

### 対応しているタイポ例

- `test@gmai.com` → `test@gmail.com` を提案
- `user@yaho.co.jp` → `user@yahoo.co.jp` を提案
- `info@outlok.com` → `info@outlook.com` を提案

## 🎨 デザインのカスタマイズ

### CSSでスタイル変更

```css
/* 提案メッセージのスタイル */
.js-mailcheck-suggestion {
    background-color: #fef3c7;
    border: 1px solid #f59e0b;
    color: #92400e;
    padding: 8px 12px;
    border-radius: 4px;
    margin-top: 4px;
    font-size: 14px;
}

/* 提案リンクのスタイル */
.js-mailcheck-suggested {
    color: #b91c1c;
    font-weight: bold;
    text-decoration: underline;
}

.js-mailcheck-suggested:hover {
    color: #991b1b;
    background-color: #fee2e2;
}
```

## ⚙️ 高度な設定

### JavaScriptで初期化

カスタム設定で初期化する場合：

```javascript
document.addEventListener('DOMContentLoaded', function() {
    new MailcheckLibrary({
        // 対象要素のセレクタを変更
        selector: '.my-email-input',
        
        // 提案メッセージのテンプレートを変更
        suggestionTemplate: 'もしかして: <a href="#" class="js-mailcheck-suggested">{suggestion}</a>？',
        
        // カスタムドメインを追加
        domains: [
            'gmail.com',
            'yahoo.co.jp',
            'your-company.com'  // 独自ドメインを追加
        ]
    });
});
```

### 複数の入力欄で異なる設定

```javascript
// 一般ユーザー向け
new MailcheckLibrary({
    selector: '.public-email',
    suggestionTemplate: 'Did you mean: {suggestion}?'
});

// 企業ユーザー向け
new MailcheckLibrary({
    selector: '.corporate-email',
    domains: ['company.com', 'business.co.jp']
});
```

## 🛠️ 開発者向け情報

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/okada-taisho/domail-validator.git
cd domail-validator

# 依存関係をインストール
npm install

# 開発モードで起動
npm run dev

# ビルド
npm run build

# テスト実行
npm test
```

### プロジェクト構成

```
domail-validator/
├── dist/
│   └── mailcheck.min.js    # 本番用ファイル
├── src/
│   ├── data/
│   │   ├── domains.js       # メインドメインリスト
│   │   ├── second-level-domains.js
│   │   └── top-level-domains.js
│   ├── config.js           # 設定管理
│   ├── mailcheck-library.js # メインロジック
│   └── index.js            # エントリーポイント
├── tests/                  # テストファイル
├── demo.html              # デモページ
└── package.json
```

### ドメインリストのカスタマイズ

`src/data/domains.js` を編集してカスタムドメインを追加：

```javascript
export const domains = [
  // 国際的なドメイン
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  
  // 日本のドメイン
  "yahoo.co.jp",
  "docomo.ne.jp",
  "ezweb.ne.jp",
  "softbank.ne.jp",
  
  // カスタムドメインを追加
  "your-domain.com"
];
```

編集後はビルドが必要です：

```bash
npm run build
```

## 🤝 コントリビューション

バグ報告や機能提案は [Issues](https://github.com/okada-taisho/domail-validator/issues) からお願いします。

プルリクエストも歓迎です！

1. Fork する
2. Feature branch を作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. Branch にプッシュ (`git push origin feature/AmazingFeature`)
5. Pull Request を作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🙏 謝辞

このプロジェクトは [Mailcheck.js](https://github.com/mailcheck/mailcheck) をベースに開発されました。

## 📞 サポート

質問や問題がある場合は、[Issues](https://github.com/okada-taisho/domail-validator/issues) でお知らせください。

---

Made with ❤️ by [okada-taisho](https://github.com/okada-taisho)