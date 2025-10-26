# NEM/Symbol Node Picker

**NEM/Symbol Node Picker** is a lightweight package and toolset for randomly picking available NEM and Symbol blockchain nodes from the NodeWatch API.

## 📁 Project Structure

This repository contains the following components:

```
nem-symbol-node-picker/
├── typescript/              # TypeScript package for Node.js/Browser
│   ├── src/                 # Source code
│   ├── dist/                # Built files
│   └── package.json         # NPM package configuration
├── openapi-client/          # OpenAPI client generation tools
│   ├── openapi.yaml         # NodeWatch API specification
│   └── openapitools.json    # OpenAPI Generator configuration
└── python/                  # Python implementation (in development)
```

## 🚀 Key Features

- **⚡ Fast**: Concurrent requests to multiple NodeWatch endpoints
- **💾 Caching**: 1-minute caching to reduce API calls
- **🛡️ Resilient**: Automatic failover between NodeWatch instances
- **⏰ Timeout Protection**: 5-second timeout with cleanup
- **🌐 Cross-Platform**: Works in Node.js and browsers
- **📦 Lightweight**: ~3KB minified + gzipped
- **🔧 TypeScript**: Full type support

## 📦 Components

### TypeScript/Node.js Package

- **Package Name**: `nem-symbol-node-picker`
- **Location**: `typescript/` directory
- **Function**: Main functionality for randomly picking NEM/Symbol nodes
- **Details**: See [typescript/README.md](typescript/README.md)

### OpenAPI Client Generation

- **Location**: `openapi-client/` directory
- **Function**: Generate multi-language clients from NodeWatch API specification
- **Supported Languages**: TypeScript, Python, PHP, Dart

### Python Implementation

- **Location**: `python/` directory
- **Status**: In development

## 🔧 NodeWatch API

NodeWatch API provides the following endpoints:

#### NEM Nodes

- `GET /api/nem/nodes` - Get list of known NEM nodes
- `GET /api/nem/height` - Get NEM blockchain height information

#### Symbol Nodes

- `GET /api/symbol/nodes` - Get list of known Symbol nodes
- `GET /api/symbol/height` - Get Symbol blockchain height information
- `GET /api/symbol/statistics` - Get Symbol network statistics
- `GET /api/symbol/time-series/nodes-count` - Get time-series data of node count

## 🌐 NodeWatch Endpoints

The following NodeWatch instances are utilized:

### Mainnet

- `https://sse.nemnesia.com`
- `https://nodewatch.symbol.tools`

### Testnet

- `https://testnet.sse.nemnesia.com`
- `https://nodewatch.symbol.tools/testnet`

## ⚡ Performance

- **Caching**: 1-minute memory cache to avoid duplicate requests
- **Parallel Processing**: Concurrent requests to multiple NodeWatch instances
- **Failover**: Use the first available response
- **Timeout**: 5-second request timeout

## 🛠️ Development Environment

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/nemnesia/nem-symbol-node-picker.git
cd nem-symbol-node-picker

# Build and test TypeScript package
cd typescript
npm install && npm run build && npm test

# Generate OpenAPI clients (optional)
cd ../openapi-client
npm install && npm run gen:ts
```

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).

## 🤝 Contributing

Bug reports, feature requests, and pull requests are welcome!

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/nemnesia/nem-symbol-node-picker/issues)
- **Repository**: [nem-symbol-node-picker](https://github.com/nemnesia/nem-symbol-node-picker)

## 🔗 Related Links

- [NodeWatch API Documentation](https://nodewatch.symbol.tools)
- [Symbol Documentation](https://docs.symbol.dev)
- [NEM Documentation](https://docs.nem.io)
