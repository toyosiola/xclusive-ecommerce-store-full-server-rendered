class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

export {
  NotFoundError,
  UnauthenticatedError,
  ForbiddenError,
  InternalServerError,
};
