import middy from "@middy/core";
import { handler } from ".";
import inputOutputLogger from "@middy/input-output-logger";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";

import { helloValidate } from "./validation/hello.validate";
import { validationErrorFormatter } from "./validation/validate";
import httpErrorHandler from "@middy/http-error-handler";
export const indexHandler = middy(handler)
  .use(inputOutputLogger())
  .use(
    validator({
      eventSchema: transpileSchema(helloValidate),
    })
  )
  .use({
    onError: (request) => validationErrorFormatter(request),
  })
  .use(httpErrorHandler());
