import { useQuery } from '@tanstack/react-query'
import { PROJECTS_MOCK } from '../lib/projects'
import type { Project } from '../lib/projects'

const fetchProjects = async (): Promise<Project[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return Promise.resolve(PROJECTS_MOCK)
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })
}
