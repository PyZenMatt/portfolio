import Card from '../ui/Card'
import Badge from '../ui/Badge'

interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | 'DevOps' | 'AI'
}

const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  { name: 'TailwindCSS', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React Router', category: 'Frontend' },
  
  // Backend
  { name: 'Django', category: 'Backend' },
  { name: 'Django REST Framework', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'REST API', category: 'Backend' },
  
  // DevOps
  { name: 'Docker', category: 'DevOps' },
  { name: 'GitHub Actions', category: 'DevOps' },
  { name: 'CI/CD', category: 'DevOps' },
  { name: 'Linux', category: 'DevOps' },
  
  // AI
  { name: 'Prompt Engineering', category: 'AI' },
  { name: 'LLM Integration', category: 'AI' },
  { name: 'AI Workflows', category: 'AI' },
]

const categories = ['Frontend', 'Backend', 'DevOps', 'AI'] as const

export default function SkillsGrid() {
  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categorySkills = SKILLS.filter((skill) => skill.category === category)
        
        return (
          <Card key={category} className="p-6">
            <h3 className="text-xl font-medium text-[var(--color-text)] mb-4">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <Badge key={skill.name} variant="default">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
