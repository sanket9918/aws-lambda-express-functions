import middy from "@middy/core";
import { handler } from ".";
import inputOutputLogger from "@middy/input-output-logger";

export const indexHandler = middy(handler).use(inputOutputLogger());
