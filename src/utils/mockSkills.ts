
import { Skill, SkillCategory, SkillLevel } from '../types';

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
