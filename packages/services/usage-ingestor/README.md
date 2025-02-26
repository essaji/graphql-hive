# `@hive/usage-ingestor`

This service takes care of feeding usage data into the ClickHouse instance.

## Configuration

| Name                                | Required                                       | Description                                                                           | Example Value                                        |
| ----------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `ENVIRONMENT`                       | No                                             | The environment of your Hive app. (**Note:** This will be used for Sentry reporting.) | `staging`                                            |
| `KAFKA_TOPIC`                       | **Yes**                                        | The kafka topic.                                                                      | `usage_reports_v2`                                   |
| `KAFKA_BROKER`                      | **Yes**                                        | The address of the Kafka broker.                                                      | `127.0.0.1:29092`                                    |
| `KAFKA_CONCURRENCY`                 | **Yes**                                        | The concurrency of the Kafka connection.                                              | `3`                                                  |
| `KAFKA_SSL`                         | No                                             | Whether an SSL connection should be established to the kafka service.                 | `1` (enabled) or `0` (disabled)                      |
| `KAFKA_SASL_MECHANISM`              | No                                             | The mechanism used for doing SASL authentication                                      | `plain` or `scram-sha-256` or `scram-sha-512`        |
| `KAFKA_SASL_USERNAME`               | No (Yes, if `KAFKA_SASL_MECHANISM` is defined) | The username for the SASL authentication                                              | `letmein`                                            |
| `KAFKA_SASL_PASSWORD`               | No (Yes, if `KAFKA_SASL_MECHANISM` is defined) | Whether an SSL connection should be established to the kafka service.                 | `letmein`                                            |
| `CLICKHOUSE_PROTOCOL`               | **Yes**                                        | The ClickHouse protocol.                                                              | `http` or `https`                                    |
| `CLICKHOUSE_HOST`                   | **Yes**                                        | The ClickHouse host.                                                                  | `127.0.0.1`                                          |
| `CLICKHOUSE_PORT`                   | **Yes**                                        | The ClickHouse port.                                                                  | `8443`                                               |
| `CLICKHOUSE_USERNAME`               | **Yes**                                        | The username for accessing ClickHouse.                                                | `letmein`                                            |
| `CLICKHOUSE_PASSWORD`               | **Yes**                                        | The password for accessing ClickHouse.                                                | `letmein`                                            |
| `HEARTBEAT_ENDPOINT`                | No                                             | The endpoint for a heartbeat.                                                         | `http://127.0.0.1:6969/heartbeat`                    |
| `SENTRY`                            | No                                             | Whether Sentry error reporting should be enabled.                                     | `1` (enabled) or `0` (disabled)                      |
| `SENTRY_DSN`                        | No (Yes if `SENTRY` is defined)                | The DSN for reporting errors to Sentry.                                               | `https://dooobars@o557896.ingest.sentry.io/12121212` |
| `PROMETHEUS_METRICS`                | No                                             | Whether Prometheus metrics should be enabled                                          | `1` (enabled) or `0` (disabled)                      |
| `PROMETHEUS_METRICS_LABEL_INSTANCE` | No                                             | The instance label added for the prometheus metrics.                                  | `usage-ingestor`                                     |

## Hive Hosted configuration

If you are self-hosting Hive, you can ignore these.

| Name                         | Required                                                                    | Description                            | Example Value     |
| ---------------------------- | --------------------------------------------------------------------------- | -------------------------------------- | ----------------- |
| `CLICKHOUSE_MIRROR_PROTOCOL` | No (Yes if any other `CLICKHOUSE_MIRROR_*` environment variable is defined) | The ClickHouse protocol.               | `http` or `https` |
| `CLICKHOUSE_MIRROR_HOST`     | No (Yes if any other `CLICKHOUSE_MIRROR_*` environment variable is defined) | The ClickHouse host.                   | `127.0.0.1`       |
| `CLICKHOUSE_MIRROR_PORT`     | No (Yes if any other `CLICKHOUSE_MIRROR_*` environment variable is defined) | The ClickHouse port.                   | `8443`            |
| `CLICKHOUSE_MIRROR_USERNAME` | No (Yes if any other `CLICKHOUSE_MIRROR_*` environment variable is defined) | The username for accessing ClickHouse. | `letmein`         |
| `CLICKHOUSE_MIRROR_PASSWORD` | No (Yes if any other `CLICKHOUSE_MIRROR_*` environment variable is defined) | The password for accessing ClickHouse. | `letmein`         |
