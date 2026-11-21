import { buildCookbookLlmsMarkdown, buildLlmsResponse } from "#src/documentation/documentationMarkdown.ts";

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = () => {
  return buildLlmsResponse(buildCookbookLlmsMarkdown());
};
