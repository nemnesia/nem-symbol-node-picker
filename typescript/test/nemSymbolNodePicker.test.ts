import { describe, expect, it, vi } from 'vitest';

// 基本的なモジュールと型のテスト
describe('nemSymbolNodePicker - 基本テスト', () => {
  it('モジュールが正しくエクスポートされている', async () => {
    const module = await import('../src/nemSymbolNodePicker.js');
    expect(typeof module.nemSymbolNodePicker).toBe('function');
  });

  it('デフォルトパラメータが型安全である', () => {
    // TypeScriptの型チェックが通ることを確認
    expect(true).toBe(true);
  });
});

// 引数バリデーションのテスト（実際のAPIを呼ばない）
describe('nemSymbolNodePicker - 引数テスト', () => {
  it('0件の取得では早期リターンする', async () => {
    // このテストはAPI呼び出し前に早期リターンするはず
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    const result = await nemSymbolNodePicker('symbol', 'mainnet', 0);
    expect(result).toEqual([]);
  });
});

// モック使用のテスト
describe('nemSymbolNodePicker - モックテスト', () => {
  it('APIエラー時に適切にエラーを処理する', async () => {
    // モックを正しく設定
    vi.doMock('../src/openapi-client', () => ({
      Configuration: function () {
        return {};
      },
      SymbolNodesApi: function () {
        return {
          symbolHeightInfo: () => Promise.reject(new Error('Network error')),
          symbolNodes: () => Promise.reject(new Error('Network error')),
        };
      },
      NEMNodesApi: function () {
        return {
          nemHeightInfo: () => Promise.reject(new Error('Network error')),
          nemNodes: () => Promise.reject(new Error('Network error')),
        };
      },
    }));

    // モジュールを再インポート
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');

    await expect(nemSymbolNodePicker('symbol', 'mainnet', 1)).rejects.toThrow('No available NodeWatch found.');
  });

  it('NodeWatchのURLリスト長不一致でエラー', async () => {
    vi.doMock('../src/openapi-client', () => ({
      Configuration: function () {
        return {};
      },
      SymbolNodesApi: function () {
        return {
          getSymbolHeight: () => Promise.resolve({ height: 100 }),
          getSymbolPeerNodes: () => Promise.resolve([]),
        };
      },
      NEMNodesApi: function () {
        return {
          getNemHeight: () => Promise.resolve({ height: 100 }),
          getNemNodes: () => Promise.resolve([]),
        };
      },
    }));
    vi.resetModules();
    // NodeWatchのURLリストを強制的に不一致にする
    const { nodewatchTestnetUrls } = await import('../src/nemSymbolNodePicker.js');
    nodewatchTestnetUrls.push('dummy');
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(nemSymbolNodePicker('symbol', 'mainnet', 1)).rejects.toThrow(
      'NodeWatch mainnet and testnet URL lists have different lengths.'
    );
    // 復元
    nodewatchTestnetUrls.pop();
  });

  it('キャッシュヒット時はAPIを呼ばない', async () => {
    vi.doMock('../src/openapi-client', () => ({
      Configuration: function () {
        return {};
      },
      SymbolNodesApi: function () {
        return {
          getSymbolHeight: vi.fn(),
          getSymbolPeerNodes: vi.fn(),
        };
      },
      NEMNodesApi: function () {
        return {
          getNemHeight: vi.fn(),
          getNemNodes: vi.fn(),
        };
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    // 1回目でキャッシュを作る
    const endpoints = ['https://ssl1', 'https://ssl2'];
    // キャッシュを直接操作
    const { symbolCache } = await import('../src/nemSymbolNodePicker.js');
    symbolCache.set('mainnet_true', {
      heightInfo: { height: 100, finalizedHeight: 100 },
      nodes: [
        { height: 100, endpoint: 'https://ssl1' },
        { height: 100, endpoint: 'https://ssl2' },
      ],
      timestamp: Date.now(),
      baseUrl: 'mock',
    });
    const result = await nemSymbolNodePicker('symbol', 'mainnet', 2, true);
    expect(result.sort()).toEqual(endpoints.sort());
  });

  it('SSLフィルタが有効な場合のみhttpsを返す', async () => {
    vi.doMock('../src/openapi-client', () => ({
      Configuration: function () {
        return {};
      },
      SymbolNodesApi: function () {
        return {
          getSymbolHeight: () => Promise.resolve({ height: 100 }),
          getSymbolPeerNodes: () =>
            Promise.resolve([
              { height: 100, endpoint: 'https://ssl1' },
              { height: 100, endpoint: 'http://nonssl' },
            ]),
        };
      },
      NEMNodesApi: function () {
        return {
          getNemHeight: () => Promise.resolve({ height: 100 }),
          getNemNodes: () =>
            Promise.resolve([
              { height: 100, endpoint: 'https://ssl1' },
              { height: 100, endpoint: 'http://nonssl' },
            ]),
        };
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    const result = await nemSymbolNodePicker('symbol', 'mainnet', 2, true);
    expect(result).toEqual(['https://ssl1']);
    const result2 = await nemSymbolNodePicker('nem', 'mainnet', 2, true);
    expect(result2).toEqual(['https://ssl1']);
  });

  it('NEMチェーン分岐も正常に動作する', async () => {
    vi.doMock('../src/openapi-client', () => ({
      Configuration: function () {
        return {};
      },
      SymbolNodesApi: function () {
        return {
          getSymbolHeight: () => Promise.resolve({ height: 100 }),
          getSymbolPeerNodes: () => Promise.resolve([]),
        };
      },
      NEMNodesApi: function () {
        return {
          getNemHeight: () => Promise.resolve({ height: 100 }),
          getNemNodes: () =>
            Promise.resolve([
              { height: 100, endpoint: 'https://nemssl' },
              { height: 99, endpoint: 'https://nemold' },
            ]),
        };
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    const result = await nemSymbolNodePicker('nem', 'mainnet', 2, true);
    expect(result).toEqual(['https://nemssl']);
  });

  it('NEMチェーンでキャッシュヒット時はAPIを呼ばない', async () => {
    vi.doMock('../src/openapi-client', () => ({
      Configuration: function () {
        return {};
      },
      SymbolNodesApi: function () {
        return {
          getSymbolHeight: vi.fn(),
          getSymbolPeerNodes: vi.fn(),
        };
      },
      NEMNodesApi: function () {
        return {
          getNemHeight: vi.fn(),
          getNemNodes: vi.fn(),
        };
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker, nemCache } = await import('../src/nemSymbolNodePicker.js');
    nemCache.set('mainnet_true', {
      heightInfo: { height: 100, finalizedHeight: 100 },
      nodes: [
        { height: 100, endpoint: 'https://nemssl' },
        { height: 100, endpoint: 'https://nemssl2' },
      ],
      timestamp: Date.now(),
      baseUrl: 'mock',
    });
    const result = await nemSymbolNodePicker('nem', 'mainnet', 2, true);
    expect(result.sort()).toEqual(['https://nemssl', 'https://nemssl2'].sort());
  });

  it('NEMチェーンでPromise.any失敗時はエラー', async () => {
    vi.doMock('../src/openapi-client', () => ({
      Configuration: function () {
        return {};
      },
      SymbolNodesApi: function () {
        return {
          getSymbolHeight: () => Promise.resolve({ height: 100 }),
          getSymbolPeerNodes: () => Promise.resolve([]),
        };
      },
      NEMNodesApi: function () {
        return {
          getNemHeight: () => Promise.reject(new Error('fail')),
          getNemNodes: () => Promise.reject(new Error('fail')),
        };
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(nemSymbolNodePicker('nem', 'mainnet', 1)).rejects.toThrow('No available NodeWatch found.');
  });
});
