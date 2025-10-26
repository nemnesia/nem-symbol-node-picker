# NEM/Symbol Node Picker

**NEM/Symbol Node Picker** は、NodeWatch API から利用可能な NEM および Symbol ブロックチェーンノードをランダムに取得するための軽量なパッケージとツールセットです。

## 📁 プロジェクト構成

このリポジトリには以下のコンポーネントが含まれています：

```
nem-symbol-node-picker/
├── typescript/              # Node.js/Browser用TypeScriptパッケージ
│   ├── src/                 # ソースコード
│   ├── dist/                # ビルド済みファイル
│   └── package.json         # NPMパッケージ設定
├── openapi-client/          # OpenAPIクライアント生成ツール
│   ├── openapi.yaml         # NodeWatch API仕様
│   └── openapitools.json    # OpenAPI Generator設定
└── python/                  # Python実装（開発中）
```

## 🚀 主要機能

- **⚡ 高速**: 複数の NodeWatch エンドポイントへの並列リクエスト
- **💾 キャッシュ機能**: 1 分間のキャッシュで API 呼び出しを削減
- **🛡️ 冗長性**: NodeWatch インスタンス間の自動フェイルオーバー
- **⏰ タイムアウト保護**: 5 秒のタイムアウトとクリーンアップ
- **🌐 クロスプラットフォーム**: Node.js とブラウザで動作
- **📦 軽量**: minified + gzipped で ~3KB
- **🔧 TypeScript**: 完全な型サポート

## 📦 コンポーネント

### TypeScript/Node.js パッケージ

- **パッケージ名**: `nem-symbol-node-picker`
- **場所**: `typescript/` ディレクトリ
- **機能**: NEM/Symbol ノードをランダムに取得するメイン機能
- **詳細**: [typescript/README.md](typescript/README.md) を参照

### OpenAPI クライアント生成

- **場所**: `openapi-client/` ディレクトリ
- **機能**: NodeWatch API 仕様から多言語クライアントを生成
- **対応言語**: TypeScript, Python, PHP, Dart

### Python 実装

- **場所**: `python/` ディレクトリ
- **ステータス**: 開発中

## 🔧 NodeWatch API

NodeWatch API は以下のエンドポイントを提供します：

#### NEM ノード

- `GET /api/nem/nodes` - 既知の NEM ノードリストを取得
- `GET /api/nem/height` - NEM ブロックチェーンの高さ情報を取得

#### Symbol ノード

- `GET /api/symbol/nodes` - 既知の Symbol ノードリストを取得
- `GET /api/symbol/height` - Symbol ブロックチェーンの高さ情報を取得
- `GET /api/symbol/statistics` - Symbol ネットワーク統計を取得
- `GET /api/symbol/time-series/nodes-count` - ノード数の時系列データを取得

## 🌐 NodeWatch エンドポイント

以下の NodeWatch インスタンスを利用しています：

### メインネット

- `https://sse.nemnesia.com`
- `https://nodewatch.symbol.tools`

### テストネット

- `https://testnet.sse.nemnesia.com`
- `https://nodewatch.symbol.tools/testnet`

## ⚡ パフォーマンス

- **キャッシュ**: 1 分間のメモリキャッシュで重複リクエストを回避
- **並列処理**: 複数の NodeWatch インスタンスに同時リクエスト
- **フェイルオーバー**: 利用可能な最初のレスポンスを使用
- **タイムアウト**: 5 秒でリクエストをタイムアウト

## 🛠️ 開発環境

### 前提条件

- Node.js 18 以上
- npm または yarn

### クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/nemnesia/nem-symbol-node-picker.git
cd nem-symbol-node-picker

# TypeScriptパッケージのビルドとテスト
cd typescript
npm install && npm run build && npm test

# OpenAPIクライアント生成（オプション）
cd ../openapi-client
npm install && npm run gen:ts
```

## 📄 ライセンス

このプロジェクトは [Apache License 2.0](LICENSE) の下でライセンスされています。

## 🤝 コントリビューション

バグレポート、機能リクエスト、プルリクエストを歓迎します！

## 📞 サポート

- **Issues**: [GitHub Issues](https://github.com/nemnesia/nem-symbol-node-picker/issues)
- **Repository**: [nem-symbol-node-picker](https://github.com/nemnesia/nem-symbol-node-picker)

## 🔗 関連リンク

- [NodeWatch API Documentation](https://nodewatch.symbol.tools)
- [Symbol Documentation](https://docs.symbol.dev)
- [NEM Documentation](https://docs.nem.io)
