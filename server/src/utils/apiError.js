class ApiError extends Error{
  constructor(msg,status=500) {
    super(msg);
    this.status = status;
  }
  static notfound(msg) {
    return new this(msg || 'Not Found', 404);
  }
  static badRequest(msg = 'Invalid Request', status = 400) {
    return new this(msg,status=401);
  }
  static unauthorized(msg, status=400) {
    const message = msg || "You don't have required permission";
    return new this(message, status);
  }
  static unauthenticated(msg, status = 401) {
     const message = msg || "Loging is required";
    return new this(message, status);
  }
  static customEror(msg = 'Unknown error', status = 500) {
    return new this(msg, status);
  }
}

module.exports = {
  ApiError
}