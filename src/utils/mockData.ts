import { User, Skill, Match, Message, ChatThread, SkillCategory, SkillLevel, MatchStatus } from '../types';

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'React Development',
    category: 'Technology',
    description: 'Building web applications with React',
    level: 'Advanced'
  },
  {
    id: '2',
    name: 'Graphic Design',
    category: 'Design',
    description: 'Creating visual content to communicate messages',
    level: 'Expert'
  },
  {
    id: '3',
    name: 'Spanish Language',
    category: 'Language',
    description: 'Conversational Spanish for beginners',
    level: 'Intermediate'
  },
  {
    id: '4',
    name: 'Piano Lessons',
    category: 'Music',
    description: 'Classical and contemporary piano techniques',
    level: 'Advanced'
  },
  {
    id: '5',
    name: 'Digital Marketing',
    category: 'Business',
    description: 'Social media marketing and SEO',
    level: 'Intermediate'
  },
  {
    id: '6',
    name: 'Yoga Instruction',
    category: 'Fitness',
    description: 'Hatha and Vinyasa yoga practices',
    level: 'Advanced'
  },
  {
    id: '7',
    name: 'Video Editing',
    category: 'Design',
    description: 'Adobe Premiere and After Effects',
    level: 'Intermediate'
  },
  {
    id: '8',
    name: 'French Cuisine',
    category: 'Cooking',
    description: 'Classic French cooking techniques',
    level: 'Expert'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/placeholder.svg',
    bio: 'Software engineer by day, graphic designer by night',
    location: 'San Francisco, CA',
    rating: 4.8,
    skillsOffered: [mockSkills[0], mockSkills[6]],
    skillsWanted: [mockSkills[1], mockSkills[7]],
    memberSince: '2023-01-15',
    isPremium: true
  },
  {
    id: '2',
    name: 'Sofia Martinez',
    avatar: '/placeholder.svg',
    bio: 'Graphic designer with a passion for languages',
    location: 'New York, NY',
    rating: 4.9,
    skillsOffered: [mockSkills[1], mockSkills[2]],
    skillsWanted: [mockSkills[0], mockSkills[4]],
    memberSince: '2023-02-20',
    isPremium: false
  },
  {
    id: '3',
    name: 'David Kim',
    avatar: '/placeholder.svg',
    bio: 'Piano teacher and aspiring web developer',
    location: 'Chicago, IL',
    rating: 4.7,
    skillsOffered: [mockSkills[3], mockSkills[2]],
    skillsWanted: [mockSkills[0], mockSkills[6]],
    memberSince: '2023-03-10',
    isPremium: false
  },
  {
    id: '4',
    name: 'Emily Chen',
    avatar: '/placeholder.svg',
    bio: 'Digital marketing specialist and yoga enthusiast',
    location: 'Austin, TX',
    rating: 4.6,
    skillsOffered: [mockSkills[4], mockSkills[5]],
    skillsWanted: [mockSkills[3], mockSkills[7]],
    memberSince: '2023-01-05',
    isPremium: true
  },
  {
    id: '5',
    name: 'Michael Scott',
    avatar: '/placeholder.svg',
    bio: 'French chef looking to expand digital skills',
    location: 'Portland, OR',
    rating: 4.9,
    skillsOffered: [mockSkills[7]],
    skillsWanted: [mockSkills[4], mockSkills[6]],
    memberSince: '2023-02-01',
    isPremium: false
  }
];

export const mockMatches: Match[] = [
  {
    id: '1',
    userId: '1',
    matchedUserId: '2',
    skillOfferedId: '1',
    skillWantedId: '2',
    matchedAt: '2023-04-10T14:30:00Z',
    status: 'Accepted'
  },
  {
    id: '2',
    userId: '1',
    matchedUserId: '3',
    skillOfferedId: '1',
    skillWantedId: '3',
    matchedAt: '2023-04-12T10:15:00Z',
    status: 'Pending'
  },
  {
    id: '3',
    userId: '2',
    matchedUserId: '4',
    skillOfferedId: '2',
    skillWantedId: '4',
    matchedAt: '2023-04-15T16:45:00Z',
    status: 'Accepted'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Hi Sofia, I saw that you offer graphic design skills. Would you be interested in exchanging for React development?',
    sentAt: '2023-04-11T09:30:00Z',
    read: true
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: "Hey Alex! Yes, that sounds great. I've been wanting to learn React for a while now.",
    sentAt: '2023-04-11T10:15:00Z',
    read: true
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: 'Perfect! When would you be available for our first session?',
    sentAt: '2023-04-11T10:30:00Z',
    read: true
  },
  {
    id: '4',
    senderId: '2',
    receiverId: '1',
    content: 'How about this Friday at 4pm?',
    sentAt: '2023-04-11T11:00:00Z',
    read: false
  }
];

export const mockChatThreads: ChatThread[] = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: mockMessages[3],
    updatedAt: '2023-04-11T11:00:00Z'
  },
  {
    id: '2',
    participants: ['1', '3'],
    lastMessage: {
      id: '5',
      senderId: '3',
      receiverId: '1',
      content: 'Looking forward to our session next week!',
      sentAt: '2023-04-14T15:20:00Z',
      read: true
    },
    updatedAt: '2023-04-14T15:20:00Z'
  }
];

export const getCurrentUser = (): User => {
  return mockUsers[0]; // Default to first user in the list
};

export const getMatchedSkill = (match: Match, isOffered: boolean): Skill | undefined => {
  const skillId = isOffered ? match.skillOfferedId : match.skillWantedId;
  return mockSkills.find(skill => skill.id === skillId);
};

export const getMatchedUser = (match: Match, currentUserId: string): User | undefined => {
  const matchedUserId = match.userId === currentUserId ? match.matchedUserId : match.userId;
  return mockUsers.find(user => user.id === matchedUserId);
};

export const getSkillCategoryColor = (category: SkillCategory): string => {
  const categoryColors: Record<SkillCategory, string> = {
    'Technology': 'bg-blue-100 text-blue-800',
    'Design': 'bg-purple-100 text-purple-800',
    'Business': 'bg-green-100 text-green-800',
    'Language': 'bg-yellow-100 text-yellow-800',
    'Music': 'bg-pink-100 text-pink-800',
    'Cooking': 'bg-orange-100 text-orange-800',
    'Fitness': 'bg-red-100 text-red-800',
    'Arts & Crafts': 'bg-indigo-100 text-indigo-800',
    'Academic': 'bg-teal-100 text-teal-800',
    'Other': 'bg-gray-100 text-gray-800'
  };
  
  return categoryColors[category];
};

export const getSkillLevelBadge = (level: SkillLevel): string => {
  const levelBadges: Record<SkillLevel, string> = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-blue-100 text-blue-800',
    'Advanced': 'bg-purple-100 text-purple-800',
    'Expert': 'bg-red-100 text-red-800'
  };
  
  return levelBadges[level];
};

export const getMatchStatusColor = (status: MatchStatus): string => {
  const statusColors: Record<MatchStatus, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Accepted': 'bg-green-100 text-green-800',
    'Declined': 'bg-red-100 text-red-800',
    'Completed': 'bg-blue-100 text-blue-800'
  };
  
  return statusColors[status];
};
