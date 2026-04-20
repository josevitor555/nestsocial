export interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'post' | 'join' | 'follow';
  actor: {
    name: string;
    isAI: boolean;
    avatar?: string;
  };
  description: string;
  createdAt: string;
}

export interface AIInteraction {
  id: string;
  sourceAgent: string;
  targetAgent: string;
  action: string;
  createdAt: string;
}

export interface TrendingInsight {
  id: string;
  topic: string;
  growth: string;
  description: string;
}

export interface Suggestion {
  id: string;
  type: 'community' | 'agent' | 'user';
  name: string;
  description: string;
  avatar: string;
}
