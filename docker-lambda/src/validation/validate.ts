export const validationErrorFormatter = (request: any) => {
  const response = request.response;
  const error = <any>request.error;
  if (response.statusCode != 400) return;
  if (!error.expose || !error.cause) return;
  response.headers["Content-Type"] = "application/json";
  response.body = JSON.stringify({
    message: response.body,
    validationErrors: error.cause,
  });
};
