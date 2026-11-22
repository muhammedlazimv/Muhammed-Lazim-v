export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  affiliation?: string;
  period: string;
  status: string;
}

export interface PersonalSkill {
  id: string;
  index: string;
  title: string;
  description: string;
  iconKey:
    | 'leadership'
    | 'communication'
    | 'problemSolving'
    | 'decisionMaking'
    | 'teamwork'
    | 'timeManagement'
    | 'hardworking';
  accent: 'blue' | 'purple' | 'indigo';
}

export const PROFILE_IMAGE_PATH =
  '/assets/aistudio/Screenshot_2026-11-22-17-10-25-47_99c04817c0de5652397fc8b56c3b3817_fec5278e.jpg';

export const PERSONAL_INFO = {
  name: 'Muhammed Lazim V',
  initials: 'ML',
  profession: 'B.Sc. Computer Science Student',
  college: 'Regional College, Kuzhimanna',
  university: 'Calicut University',
  location: 'Kuzhimanna, Kerala, India',
  email: 'vambadens2@gmail.com',
  phone: '+91 7907737387',
  phoneHref: 'tel:+917907737387',
  whatsappHref: 'https://wa.me/917907737387',
  heroIntro:
    'A B.Sc. Computer Science student at Regional College, Kuzhimanna (Calicut University), passionate about web development, UI design, and building thoughtful digital solutions.',
  aboutParagraph:
    'I am a dedicated Computer Science student passionate about web development, UI design, and modern software technologies. I love building responsive websites, solving real-world problems, working with people, and continuously developing my knowledge and skills.',
} as const;

export const TYPING_PHRASES = [
  'Computer Science Student',
  'Aspiring Web Developer',
  'Creative Thinker',
] as const;

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    id: 'bsc-cs',
    degree: 'B.Sc. Computer Science (1st Year)',
    institution: 'Regional College, Kuzhimanna',
    affiliation: 'Calicut University',
    period: 'Currently Pursuing',
    status: 'Undergraduate Degree',
  },
  {
    id: 'plus-two',
    degree: 'Higher Secondary – Plus Two Science',
    institution: 'GHSS Kuzhimanna',
    period: '2026',
    status: 'Higher Secondary',
  },
  {
    id: 'sslc',
    degree: 'SSLC',
    institution: 'GHSS Kuzhimanna',
    period: '2024',
    status: 'Secondary Education',
  },
];

export const PERSONAL_SKILLS: PersonalSkill[] = [
  {
    id: 'leadership',
    index: '01',
    title: 'Leadership Skills',
    description:
      'Guiding collaborative efforts with clarity, taking responsibility for outcomes, and encouraging peers to contribute their best.',
    iconKey: 'leadership',
    accent: 'blue',
  },
  {
    id: 'communication',
    index: '02',
    title: 'Communication Skills',
    description:
      'Expressing ideas clearly in discussion and writing while listening attentively to understand diverse perspectives.',
    iconKey: 'communication',
    accent: 'purple',
  },
  {
    id: 'problem-solving',
    index: '03',
    title: 'Problem-Solving Skills',
    description:
      'Approaching challenges calmly, breaking complex issues into structured steps, and finding practical solutions.',
    iconKey: 'problemSolving',
    accent: 'indigo',
  },
  {
    id: 'decision-making',
    index: '04',
    title: 'Decision-Making Skills',
    description:
      'Weighing options thoughtfully, assessing priorities objectively, and committing to well-reasoned choices.',
    iconKey: 'decisionMaking',
    accent: 'blue',
  },
  {
    id: 'teamwork',
    index: '05',
    title: 'Teamwork',
    description:
      'Working harmoniously alongside others, sharing credit generously, and supporting shared academic and creative goals.',
    iconKey: 'teamwork',
    accent: 'purple',
  },
  {
    id: 'time-management',
    index: '06',
    title: 'Time Management',
    description:
      'Organizing schedules deliberately, meeting academic commitments reliably, and balancing focused learning with daily priorities.',
    iconKey: 'timeManagement',
    accent: 'indigo',
  },
  {
    id: 'hardworking',
    index: '07',
    title: 'Hardworking & Self-Motivation',
    description:
      'Bringing consistent effort, personal discipline, and genuine curiosity to every goal while continuously improving each day.',
    iconKey: 'hardworking',
    accent: 'blue',
  },
];

export const FEATURED_PROJECT = {
  title: 'Personal Portfolio Website',
  category: 'Featured Project · Responsive Web Design',
  description:
    'Designed and developed a fully responsive personal portfolio featuring dark mode, dynamic elements, and interactive contact forms.',
  highlights: [
    'Fully responsive layout tailored for mobile phones, tablets, laptops, and desktops',
    'Seamless Dark Mode and Light Mode theme switching with balanced blue, purple, and white palettes',
    'Dynamic animated elements including typing text, scroll reveals, and subtle ambient motion',
    'Interactive contact form alongside direct email, phone, and WhatsApp communication channels',
  ],
} as const;

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
