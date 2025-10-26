# NEM/Symbol Node Picker

[![npm version](https://badge.fury.io/js/nem-symbol-node-picker.svg)](https://badge.fury.io/js/nem-symbol-node-picker)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A lightweight Node.js and browser package for picking random NEM and Symbol blockchain nodes from the NodeWatch API.

## Features

- 🚀 **Fast**: Concurrent requests to multiple NodeWatch endpoints
- 💾 **Cached**: Built-in 1-minute caching to reduce API calls
- 🛡️ **Resilient**: Automatic failover between NodeWatch instances
- ⏰ **Timeout Protection**: 5-second timeout with cleanup
- 🌐 **Cross-Platform**: Works in Node.js and browsers
- 📦 **Lightweight**: ~3KB minified + gzipped
- 🔧 **TypeScript**: Full type support included

## Installation

```bash
npm install nem-symbol-node-picker
```

## Usage

### ES Modules (Node.js 18+)

```javascript
import { nemSymbolNodePicker } from 'nem-symbol-node-picker';

// Get 3 random Symbol mainnet nodes (HTTP/HTTPS)
const symbolNodes = await nemSymbolNodePicker('symbol', 'mainnet', 3, false);
console.log(symbolNodes);
// ['http://symbol-node-1.com:3000', 'https://symbol-node-2.com:3001', ...]

// Get 1 SSL-only Symbol testnet node
const sslNode = await nemSymbolNodePicker('symbol', 'testnet', 1, true);
console.log(sslNode);
// ['https://testnet-symbol-node.com:3001']

// Get NEM mainnet nodes
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

### Browser (CDN)

```html
<script type="module">
  import { nemSymbolNodePicker } from 'https://cdn.jsdelivr.net/npm/nem-symbol-node-picker/dist/index.min.js';

  const nodes = await nemSymbolNodePicker('symbol', 'mainnet', 1);
  console.log(nodes);
</script>
```

## API

### `nemSymbolNodePicker(chainName, network, count, isSsl)`

**Parameters:**

- `chainName` (string, optional): Chain name - `'nem'` or `'symbol'`. Default: `'symbol'`
- `network` (string, optional): Network - `'mainnet'` or `'testnet'`. Default: `'mainnet'`
- `count` (number, optional): Number of nodes to return. Default: `1`
- `isSsl` (boolean, optional): Return only HTTPS endpoints. Default: `false`

**Returns:**

- `Promise<string[]>`: Array of node endpoint URLs

**Throws:**

- `Error`: When no NodeWatch instances are available
- `Error`: When no nodes meet the criteria
- `Error`: When request timeout occurs

## Examples

```javascript
import { nemSymbolNodePicker } from 'nem-symbol-node-picker';

// Basic usage - get 1 Symbol mainnet node
const nodes = await nemSymbolNodePicker();

// Get multiple SSL-only nodes
const sslNodes = await nemSymbolNodePicker('symbol', 'mainnet', 5, true);

// Get testnet NEM nodes
const testnetNodes = await nemSymbolNodePicker('nem', 'testnet', 3);

// Error handling
try {
  const nodes = await nemSymbolNodePicker('symbol', 'mainnet', 10);
  console.log('Available nodes:', nodes);
} catch (error) {
  console.error('Failed to get nodes:', error.message);
}
```

## NodeWatch API

This package uses the [NodeWatch API](https://nodewatch.symbol.tools/api/openapi) to fetch node information.

**Supported NodeWatch instances:**

- Mainnet: `https://sse.nemnesia.com`, `https://nodewatch.symbol.tools`
- Testnet: `https://testnet.sse.nemnesia.com`, `https://nodewatch.symbol.tools/testnet`

## Caching

The package includes built-in caching with a 1-minute duration to:

- Reduce API load on NodeWatch instances
- Improve response times for subsequent calls
- Maintain consistency within the cache window

## License

Licensed under the Apache License 2.0. See [LICENSE](./LICENSE) for details.
