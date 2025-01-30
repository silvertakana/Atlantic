export interface StoryMeta {
  id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
}

export interface StoryData extends StoryMeta {
  entrypoint: string;
  storyblocks: {
    [key: string]: StoryBlock;
  };
}

// Add these interfaces
export type StoryImage = string |{
  src: string;
  offset?: {
    x?: string;
    y?: string;
  };
  scale?: string;
} | "prev";

// Update StoryBlock interface
export interface StoryBlock {
  content: string;
  choices: Choice[] | null;
  image?: StoryImage;
}

interface Choice {
  text: string;
  id: string;
}