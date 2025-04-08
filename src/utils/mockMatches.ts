
import { Match, MatchStatus, Skill, User } from '../types';
import { mockSkills } from './mockSkills';
import { mockUsers } from './mockUsers';

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

export const getMatchedSkill = (match: Match, isOffered: boolean): Skill | undefined => {
  const skillId = isOffered ? match.skillOfferedId : match.skillWantedId;
  return mockSkills.find(skill => skill.id === skillId);
};

export const getMatchedUser = (match: Match, currentUserId: string): User | undefined => {
  const matchedUserId = match.userId === currentUserId ? match.matchedUserId : match.userId;
  return mockUsers.find(user => user.id === matchedUserId);
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
