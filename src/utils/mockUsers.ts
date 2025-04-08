
import { User } from '../types';
import { mockSkills } from './mockSkills';

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

export const getCurrentUser = (): User => {
  return mockUsers[0]; // Default to first user in the list
};
