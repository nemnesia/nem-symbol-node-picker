# NEM/Symbol Node Picker

[![npm version](https://badge.fury.io/js/nem-symbol-node-picker.svg)](https://badge.fury.io/js/nem-symbol-node-picker)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

NodeWatch API から NEM および Symbol ブロックチェーンノードをランダムに取得する軽量な Node.js およびブラウザ向けパッケージです。

## 機能

- 🚀 **高速**: 複数のNodeWatchエンドポイントへの並列リクエスト
- 💾 **キャッシュ機能**: 1分間の内蔵キャッシュでAPI呼び出しを削減
- 🛡️ **冗長性**: NodeWatchインスタンス間の自動フェイルオーバー
- ⏰ **タイムアウト保護**: 5秒のタイムアウトとクリーンアップ
- 🌐 **クロスプラットフォーム**: Node.jsとブラウザで動作
- 📦 **軽量**: minified + gzipped で ~3KB
- 🔧 **TypeScript**: 完全な型サポート

## インストール

```bash
npm install nem-symbol-node-picker
```

## 使用方法

### ES Modules (Node.js 18+)

```javascript
import { nemSymbolNodePicker } from 'nem-symbol-node-picker';

// Symbol メインネットから3つのランダムノードを取得 (HTTP/HTTPS)
const symbolNodes = await nemSymbolNodePicker('symbol', 'mainnet', 3, false);
console.log(symbolNodes);
// ['http://symbol-node-1.com:3000', 'https://symbol-node-2.com:3001', ...]

// SSL専用のSymbol テストネットノードを1つ取得
const sslNode = await nemSymbolNodePicker('symbol', 'testnet', 1, true);
console.log(sslNode);
// ['https://testnet-symbol-node.com:3001']

// NEM メインネットノードを取得
const nemNodes = await nemSymbolNodePicker('nem', 'mainnet', 2, false);
console.log(nemNodes);
```

### CommonJS (Node.js)

```javascript
const { nemSymbolNodePicker } = require('nem-symbol-node-picker');

async function getNodes() {
  const nodes = await nemSymbolNodePicker('symbol', 'mainnet', 1);
  console.log(nodes);
}
```

### ブラウザ (CDN)

```html
<script type="module">
  import { nemSymbolNodePicker } from 'https://cdn.jsdelivr.net/npm/nem-symbol-node-picker/dist/index.min.js';

  const nodes = await nemSymbolNodePicker('symbol', 'mainnet', 1);
  console.log(nodes);
</script>
```

## API

### `nemSymbolNodePicker(chainName, network, count, isSsl)`

**パラメータ:**

- `chainName` (string, 省略可): チェーン名 - `'nem'` または `'symbol'`。デフォルト: `'symbol'`
- `network` (string, 省略可): ネットワーク - `'mainnet'` または `'testnet'`。デフォルト: `'mainnet'`
- `count` (number, 省略可): 取得するノード数。デフォルト: `1`
- `isSsl` (boolean, 省略可): HTTPS エンドポイントのみ取得するか。デフォルト: `false`

**戻り値:**

- `Promise<string[]>`: ノードエンドポイントURLの配列

**例外:**

- `Error`: NodeWatch インスタンスが利用できない場合
- `Error`: 条件に合うノードがない場合
- `Error`: リクエストタイムアウトが発生した場合

## 使用例

```javascript
import { nemSymbolNodePicker } from 'nem-symbol-node-picker';

// 基本的な使用方法 - Symbol メインネットノードを1つ取得
const nodes = await nemSymbolNodePicker();

// SSL専用ノードを複数取得
const sslNodes = await nemSymbolNodePicker('symbol', 'mainnet', 5, true);

// テストネット NEM ノードを取得
const testnetNodes = await nemSymbolNodePicker('nem', 'testnet', 3);

// エラーハンドリング
try {
  const nodes = await nemSymbolNodePicker('symbol', 'mainnet', 10);
  console.log('利用可能なノード:', nodes);
} catch (error) {
  console.error('ノードの取得に失敗:', error.message);
}
```

## NodeWatch API

このパッケージは [NodeWatch API](https://nodewatch.symbol.tools/api/openapi) を使用してノード情報を取得します。

**対応NodeWatchインスタンス:**

- メインネット: `https://sse.nemnesia.com`, `https://nodewatch.symbol.tools`
- テストネット: `https://testnet.sse.nemnesia.com`, `https://nodewatch.symbol.tools/testnet`

## キャッシュ機能

パッケージには1分間の内蔵キャッシュが含まれており、以下の効果があります：

- NodeWatchインスタンスへのAPI負荷を軽減
- 後続の呼び出しでレスポンス時間を改善
- キャッシュ期間内でのデータ一貫性を維持

## ライセンス

Apache License 2.0 の下でライセンスされています。詳細は [LICENSE](./LICENSE) を参照してください。
