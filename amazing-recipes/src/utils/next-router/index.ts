import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type HTTPMethod = "HEAD" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

class NextRouteHandler {
  context: Record<string, any> = {};

  constructor() {}

  private dispatch(method: HTTPMethod, handler: NextApiHandler) {
    return function (request: NextApiRequest, response: NextApiResponse) {
      if (request.method === method) return handler(request, response);

      return response.status(405).end();
    };
  }

  head(handler: NextApiHandler) {
    return this.dispatch("GET", handler);
  }

  get(handler: NextApiHandler) {
    return this.dispatch("GET", handler);
  }

  post(handler: NextApiHandler) {
    return this.dispatch("GET", handler);
  }

  put(handler: NextApiHandler) {
    return this.dispatch("GET", handler);
  }

  patch(handler: NextApiHandler) {
    return this.dispatch("GET", handler);
  }

  delete(handler: NextApiHandler) {
    return this.dispatch("GET", handler);
  }
}

export default NextRouteHandler;
