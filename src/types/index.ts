
export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  rating: number;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  memberSince: string;
  isPremium: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description?: string;
  level: SkillLevel;
}

export type SkillCategory = 
  | 'Technology'
  | 'Design'
  | 'Business'
  | 'Language'
  | 'Music'
  | 'Cooking'
  | 'Fitness'
  | 'Arts & Crafts'
  | 'Academic'
  | 'Other';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  skillOfferedId: string;
  skillWantedId: string;
  matchedAt: string;
  status: MatchStatus;
}

export type MatchStatus = 'Pending' | 'Accepted' | 'Declined' | 'Completed';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: string;
  read: boolean;
}

export interface ChatThread {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  recipientId: string;
  rating: number;
  comment: string;
  skillId: string;
  createdAt: string;
}
