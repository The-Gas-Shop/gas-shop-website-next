export type contentfulResponse = {
  items: entries[];
  includes: {
    Asset: {
      sys: {
        id: string;
      };
      fields: {
        title: string;
        file: {
          url: string;
        };
      };
    }[];
  };
};

export type entries = {
  fields: postFields;
  sys: {
    id: string;
  };
};

type postBodyContent = {
  nodeType: string;
  content: {
    nodeType: string;
    value: string;
    marks: {
      type: string;
    }[];
  }[];
};

type postBody = {
  nodeType: string;
  content: postBodyContent[];
};

export type postFields = {
  title: string;
  slug: string;
  body: postBody;
  children?: entries[];
  isParent: boolean;
  headerImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
};

export type link = {
  title: string;
  slug: string;
  children?: link[];
  id: string;
};

export type review = {
  name: string;
  picture: string;
  relativeDate: string;
  date: string;
  content: string;
};

export type reviewResponse = {
  authorAttribution: {
    displayName: string;
    photoUri: string;
  };
  relativePublishTimeDescription: string;
  publishTime: string;
  text: {
    text: string;
  };
};

import type { EntryFieldTypes } from "contentful";

export type ProductEntrySkeleton = {
  contentTypeId: "page";
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    body: EntryFieldTypes.RichText;
    headerImage?: EntryFieldTypes.AssetLink;
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    isParent: EntryFieldTypes.Boolean;
    children?: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<ProductEntrySkeleton>
    >;
  };
};
