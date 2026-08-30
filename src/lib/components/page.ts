import { mergeClasses } from "#src/lib/utilities/common.ts";

export type OpenGraphType = "website" | "article" | "profile" | "book";

export type TwitterCardType = "summary" | "summary_large_image" | "app" | "player";

export type PageMetadataProps = {
  author?: string;
  componentId: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string;
  locale?: string;
  robots?: string;
  siteName?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  themeColor?: string;
  title?: string;
  twitterCard?: TwitterCardType;
  twitterCreator?: string;
  twitterSite?: string;
  type?: OpenGraphType;
  url?: string;
};

export function getPageClass(className: string = ""): string {
  return mergeClasses(className, "fluid-page flex w-full flex-1 flex-col");
}

export function serializeStructuredData(structuredData: Record<string, unknown> | Array<Record<string, unknown>>): string {
  try {
    return JSON.stringify(structuredData);
  } catch {
    return "";
  }
}
