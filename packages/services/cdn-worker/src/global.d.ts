export {};

interface AnalyticsEngine {
  writeDataPoint(input: { blobs?: string[]; doubles?: number[]; indexes?: string[] }): void;
}

declare global {
  /**
   * KV Storage for the CDN
   */
  let HIVE_DATA: KVNamespace;
  /**
   * Analytics Engine for the CDN
   */
  let USAGE_ANALYTICS: AnalyticsEngine;
  let ERROR_ANALYTICS: AnalyticsEngine;
  /**
   * Secret used to sign the CDN keys
   */
  let KEY_DATA: string;
  let SENTRY_DSN: string;
  /**
   * Name of the environment, e.g. staging, production
   */
  let SENTRY_ENVIRONMENT: string;
  /**
   * Id of the release
   */
  let SENTRY_RELEASE: string;
}
