# Mailcheck Library

HTMLでクラスを指定するだけで自動的にメールアドレスのスペルチェックを行うライブラリです。

## インストール

```bash
npm install
npm run build
```

## 基本的な使い方

### 1. HTMLでクラスを指定

```html

<head>
    <script src="./dist/mailcheck.min.js"></script>
</head>
```

```html

    <input type="email" class="js-mailcheck-input" placeholder="メールアドレスを入力" />
```
    


### 2. 自動的に動作

- `js-mailcheck-input` クラスが付いた入力欄でメールアドレスを入力
- フォーカスを外すと自動的にスペルチェックが実行
- 修正候補がある場合、入力欄の下に提案が表示

## カスタマイズ

### ドメインリストの編集

ドメインデータは以下のファイルで管理されています：

- `src/data/domains.js` - メインドメインリスト
- `src/data/second-level-domains.js` - セカンドレベルドメイン
- `src/data/top-level-domains.js` - トップレベルドメイン

```javascript
// src/data/domains.js の例
export const domains = [
  "gmail.com",
  "yahoo.com",
  "your-custom-domain.com"  // カスタムドメインを追加
];
```

### オプション設定

```javascript
import { MailcheckLibrary } from './dist/mailcheck.min.js';

// カスタム設定で初期化
new MailcheckLibrary({
  selector: '.my-email-input',  // 対象要素のセレクタ
  suggestionClass: 'my-suggestion',  // 提案要素のクラス名
  suggestionTemplate: 'Did you mean: <a href="#" class="suggestion-link">{suggestion}</a>?'  // 提案テンプレート
});
```

## スタイルのカスタマイズ

### CSSでのカスタマイズ

```css
/* 提案エリア全体 */
.js-mailcheck-suggestion {
  background-color: #fff3cd !important;
  border: 1px solid #ffeaa7 !important;
  color: #856404 !important;
}

/* 提案リンク */
.js-mailcheck-suggested {
  background-color: #ffc107 !important;
  color: #212529 !important;
  font-weight: bold !important;
}

/* ホバー時の効果を無効化 */
.js-mailcheck-suggested:hover {
  transform: none !important;
  background-color: #e0a800 !important;
}
```

### JavaScriptでのスタイル変更

```javascript
// 初期化時にカスタムスタイルを適用
new MailcheckLibrary({
  suggestionTemplate: '⚠️ 修正提案: <a href="#" class="js-mailcheck-suggested" style="color: red; font-weight: bold;">{suggestion}</a>'
});
```

### 動的スタイル変更

```javascript
// 提案表示後にスタイルを動的変更
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const suggestions = document.querySelectorAll('.js-mailcheck-suggestion');
        suggestions.forEach(suggestion => {
          suggestion.style.backgroundColor = '#e8f5e8';
          suggestion.style.borderColor = '#4caf50';
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
});
```

## 開発

```bash
# 開発モード（ファイル監視）
npm run dev

# ローカルサーバー起動
npm run serve
```

## ファイル構成

```
src/
├── data/
│   ├── domains.js              # メインドメインリスト
│   ├── second-level-domains.js # セカンドレベルドメイン
│   └── top-level-domains.js    # トップレベルドメイン
├── config.js                   # 設定クラス
├── mailcheck-library.js        # メインライブラリ
└── index.js                    # エントリーポイント
```
