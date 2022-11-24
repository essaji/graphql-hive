import { track } from './analytics';

const description = `Please refer to the documentation for more details: https://docs.graphql-hive.com/features/registry-usage`;

export class MissingTargetIDErrorResponse extends Response {
  constructor() {
    super(
      JSON.stringify({
        code: 'MISSING_TARGET_ID',
        error: `Missing Hive target ID in request params.`,
        description,
      }),
      {
        status: 400,
      },
    );

    track({ type: 'error', value: ['missing_target_id'] }, 'unknown');
  }
}

export class InvalidArtifactTypeResponse extends Response {
  constructor(artifactType: string) {
    super(
      JSON.stringify({
        code: 'INVALID_ARTIFACT_TYPE',
        error: `Invalid artifact type: "${artifactType}"`,
        description,
      }),
      {
        status: 400,
      },
    );
    track({ type: 'error', value: ['invalid_artifact_type', artifactType] }, 'unknown');
  }
}

export class MissingAuthKey extends Response {
  constructor() {
    super(
      JSON.stringify({
        code: 'MISSING_AUTH_KEY',
        error: `Hive CDN authentication key is missing`,
        description,
      }),
      {
        status: 400,
      },
    );
    track({ type: 'error', value: ['missing_auth_key'] }, 'unknown');
  }
}

export class InvalidAuthKey extends Response {
  constructor() {
    super(
      JSON.stringify({
        code: 'INVALID_AUTH_KEY',
        error: `Hive CDN authentication key is invalid, or it does not match the requested target ID.`,
        description,
      }),
      {
        status: 403,
      },
    );
    track({ type: 'error', value: ['invalid_auth_key'] }, 'unknown');
  }
}

export class CDNArtifactNotFound extends Response {
  constructor(artifactType: string, targetId: string) {
    super(
      JSON.stringify({
        code: 'NOT_FOUND',
        error: `Hive CDN was unable to find an artifact of type "${artifactType}" for target "${targetId}"`,
        description,
      }),
      {
        status: 404,
      },
    );
    track({ type: 'error', value: ['artifact_not_found', artifactType] }, targetId);
  }
}

export class InvalidArtifactMatch extends Response {
  constructor(artifactType: string, targetId: string) {
    super(
      JSON.stringify({
        code: 'INVALID_ARTIFACT_MATCH',
        error: `Target "${targetId}" does not support the artifact type "${artifactType}"`,
        description,
      }),
      {
        status: 400,
      },
    );
    track({ type: 'error', value: ['invalid_artifact_match', artifactType] }, targetId);
  }
}

export class UnexpectedError extends Response {
  constructor() {
    super(
      JSON.stringify({
        code: 'UNEXPECTED_ERROR',
        error: `Please try again later, or contact Hive support if the problem persists.`,
        description,
      }),
      {
        status: 500,
      },
    );
  }
}
