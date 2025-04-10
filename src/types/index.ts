
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

// Supabase Database Types
export type Profile = {
  id: string
  name: string
  avatar: string | null
  bio: string | null
  location: string | null
  rating: number
  member_since: string
  is_premium: boolean
}

export type SkillRecord = {
  id: string
  user_id: string
  name: string
  category: string
  description: string | null
  level: string
  is_offered: boolean
  created_at: string
}

export type MatchRecord = {
  id: string
  user_id: string
  matched_user_id: string
  skill_offered_id: string
  skill_wanted_id: string
  matched_at: string
  status: string
}

export type MessageRecord = {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  sent_at: string
  read: boolean
  match_id: string | null
}

export type ChatThreadRecord = {
  id: string
  match_id: string | null
  updated_at: string
}

export type ThreadParticipantRecord = {
  thread_id: string
  user_id: string
}

export type ReviewRecord = {
  id: string
  reviewer_id: string
  recipient_id: string
  rating: number
  comment: string | null
  skill_id: string | null
  created_at: string
}
