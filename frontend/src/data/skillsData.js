import { Code2, Globe, Server, Database, Wrench, Rocket } from 'lucide-react';

export const skillCategories = [
    {
        icon: Code2,
        title: 'Languages',
        iconBg: 'bg-blue-500',
        skills: ['Java', 'C++', 'JavaScript', 'TypeScript']
    },
    {
        icon: Globe,
        title: 'Frontend',
        iconBg: 'bg-purple-500',
        skills: ['HTML5', 'CSS3', 'React', 'Tailwind CSS']
    },
    {
        icon: Server,
        title: 'Backend',
        iconBg: 'bg-green-500',
        skills: ['Node.js', 'Express.js', 'REST APIs', 'Spring Boot']
    },
    {
        icon: Database,
        title: 'Database',
        iconBg: 'bg-orange-500',
        skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase']
    },
    {
        icon: Wrench,
        title: 'Tools',
        iconBg: 'bg-pink-500',
        skills: ['Git', 'GitHub', 'Postman', 'VS Code']
    },
    {
        icon: Rocket,
        title: 'Deployment',
        iconBg: 'bg-violet-500',
        skills: ['Vercel', 'Render', 'Netlify', 'Heroku']
    }
];
