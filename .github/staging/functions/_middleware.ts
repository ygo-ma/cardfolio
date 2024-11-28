function authentication(context) {
  const { request, env } = context;
  const { CREDENTIALS } = env;
  const credentialsSet = new Set(CREDENTIALS.split(";"));

  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return new Response("You need to login.", {
      status: 401,
      headers: {
        // Prompts the user for credentials.
        "WWW-Authenticate": 'Basic realm="cardfolio", charset="UTF-8"',
      },
    });
  }

  // The Authorization header must start with Basic, followed by a space.
  const [scheme, encoded] = authorization.split(" ");
  if (!encoded || scheme !== "Basic") {
    return new Response("Malformed authorization header.", {
      status: 400,
    });
  }

  // Check the user among the allowed users.
  if (!credentialsSet.has(encoded)) {
    return new Response("You need to login.", {
      status: 401,
      headers: {
        // Prompts the user for credentials.
        "WWW-Authenticate": 'Basic realm="cardfolio", charset="UTF-8"',
      },
    });
  }

  return context.next();
}

export const onRequest = [authentication];
