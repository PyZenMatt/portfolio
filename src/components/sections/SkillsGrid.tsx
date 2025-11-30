import { motion } from 'framer-motion'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { staggerContainer, staggerChild } from '../../motion'

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
  const prefersReducedMotion = useReducedMotion()
  const MotionDiv = prefersReducedMotion ? 'div' : motion.div

  return (
    <MotionDiv
      {...(!prefersReducedMotion && {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        variants: staggerContainer,
      })}
      className="space-y-8"
    >
      {categories.map((category) => {
        const categorySkills = SKILLS.filter((skill) => skill.category === category)
        
        return (
          <MotionDiv
            key={category}
            {...(!prefersReducedMotion && { variants: staggerChild })}
          >
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { 
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 group">
                <h3 className="text-[var(--text-xl)] font-medium mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
                      whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={prefersReducedMotion ? undefined : { 
                        delay: 0.05 * index,
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                      whileHover={prefersReducedMotion ? undefined : { 
                        scale: 1.05,
                        rotate: 2,
                      }}
                    >
                      <Badge variant="default" className="cursor-default">
                        {skill.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </MotionDiv>
        )
      })}
    </MotionDiv>
  )
}
