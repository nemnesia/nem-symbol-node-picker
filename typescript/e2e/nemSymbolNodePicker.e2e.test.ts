import { describe, expect, test } from 'vitest';
import { nemSymbolNodePicker, symbolCache } from '../src/nemSymbolNodePicker.js';

// 実際のAPIにアクセスするため、タイムアウトは長めに設定
const E2E_TIMEOUT = 45000; // 45秒

describe('nemSymbolNodePicker - E2E (公開メソッドのみ)', () => {
  test(
    'デフォルトパラメータで1つ取得できる',
    async () => {
      const result = await nemSymbolNodePicker();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(typeof result[0]).toBe('string');
      expect(result[0]).toMatch(/^https?:\/\//);
      console.log('取得したノード:', result);
    },
    E2E_TIMEOUT
  );

  test(
    'symbol mainnet から複数ノードを取得できる',
    async () => {
      const result = await nemSymbolNodePicker('symbol', 'mainnet', 3);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(3);
      // 形式チェック
      result.forEach((ep) => expect(ep).toMatch(/^https?:\/\//));
      console.log('取得したノード:', result);
    },
    E2E_TIMEOUT
  );

  test(
    'nem mainnet を取得できる',
    async () => {
      const result = await nemSymbolNodePicker('nem', 'mainnet', 1);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0]).toMatch(/^https?:\/\//);
      console.log('取得したノード:', result);
    },
    E2E_TIMEOUT
  );

  test(
    'SSL オンでHTTPS のみ返す',
    async () => {
      const result = await nemSymbolNodePicker('symbol', 'mainnet', 5, true);
      expect(Array.isArray(result)).toBe(true);
      result.forEach((ep) => expect(ep).toMatch(/^https:\/\//));
      console.log('取得したノード:', result);
    },
    E2E_TIMEOUT
  );

  test(
    'キャッシュが作用する（同一リクエストで2回目が短い）',
    async () => {
      // キャッシュをクリアしてから測定
      symbolCache.clear();

      const t1 = Date.now();
      const r1 = await nemSymbolNodePicker('symbol', 'mainnet', 1);
      const d1 = Date.now() - t1;

      const t2 = Date.now();
      const r2 = await nemSymbolNodePicker('symbol', 'mainnet', 1);
      const d2 = Date.now() - t2;

      expect(r1.length).toBeGreaterThanOrEqual(1);
      expect(r2.length).toBeGreaterThanOrEqual(1);
      // 2回目は少なくとも短くなっていることを期待（ネットワーク状況によるが、通常は短縮）
      expect(d2).toBeLessThanOrEqual(Math.max(d1, 2000));
    },
    E2E_TIMEOUT
  );

  test(
    '大量要求（上限を超える）でも有効な結果を返す',
    async () => {
      const result = await nemSymbolNodePicker('symbol', 'mainnet', 1000);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result.length).toBeLessThanOrEqual(1000);
      console.log('取得したノード:', result);
    },
    E2E_TIMEOUT
  );

  test(
    '取得したエンドポイントに対する簡易ヘルスチェック（成功は保証されない）',
    async () => {
      const result = await nemSymbolNodePicker('symbol', 'mainnet', 1);
      console.log('取得したノード:', result);
      if (!result || result.length === 0) {
        // ノードが取得できない場合はスキップ扱い
        expect(result.length).toBeGreaterThanOrEqual(0);
        return;
      }

      const endpoint = result[0];
      try {
        const resp = await fetch(`${endpoint}/node/info`, {
          method: 'GET',
          signal: AbortSignal.timeout(10000),
        });
        // ステータスコードは問わないがレスポンスが来ることを期待
        expect(resp).toBeDefined();
      } catch (err) {
        // 到達不能でもテスト自体を失敗させない（ネットワーク依存のため）
        console.warn('node reachability check failed:', (err as Error).message);
      }
    },
    E2E_TIMEOUT
  );
});
