interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number; // in seconds
  publishedAt: Date;
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  feedUrl: string;
  acastUrl: string;
  language: string;
  hosts: {
    name: string;
    role: string;
  }[];
  shortDescription: string;
  episodes: Episode[];
}
