export class StreamNotFoundError extends Error {
  constructor(key: string) {
    super(`Stream not found for key: ${key}`);
  }
}

export class StreamAlreadyExistsError extends Error {
  constructor(key: string) {
    super(`Stream already exists for key: ${key}`);
  }
}

export class StreamUnidentifiableMissingRequirementsError extends Error {
  constructor() {
    super('Unable to identify stream due to missing requirements');
  }
}
