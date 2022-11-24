type Event =
  | {
      type: 'artifact';
      value: 'schema' | 'supergraph' | 'sdl' | 'metadata' | 'introspection';
    }
  | {
      type: 'error';
      value: [string, string] | [string];
    };

export function track(event: Event, targetId: string) {
  switch (event.type) {
    case 'artifact':
      return USAGE_ANALYTICS.writeDataPoint({
        blobs: [event.type, event.value, targetId],
        indexes: [targetId],
      });
    case 'error':
      return ERROR_ANALYTICS.writeDataPoint({
        blobs: [event.type, ...event.value],
      });
  }
}
