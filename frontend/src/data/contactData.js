import { Github, Linkedin, Code2, FileCode } from 'lucide-react';

export const profiles = [
    {
        icon: Github,
        name: 'GitHub',
        username: '@yourusername',
        stat: '50+ Repositories',
        link: 'https://github.com/yourusername',
        iconBg: 'bg-gray-700'
    },
    {
        icon: Linkedin,
        name: 'LinkedIn',
        username: '/in/yourusername',
        stat: '500+ Connections',
        link: 'https://linkedin.com/in/yourusername',
        iconBg: 'bg-blue-600'
    },
    {
        icon: Code2,
        name: 'LeetCode',
        username: '@yourusername',
        stat: '300+ Problems',
        link: 'https://leetcode.com/yourusername',
        iconBg: 'bg-orange-500'
    },
    {
        icon: FileCode,
        name: 'GeeksforGeeks',
        username: '@yourusername',
        stat: '200+ Problems',
        link: 'https://auth.geeksforgeeks.org/user/yourusername',
        iconBg: 'bg-green-600'
    }
];

export const contactInfo = {
    email: 'your.email@example.com',
    location: 'City, State, India',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername'
};
