export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'testing';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  fileStructure: FileNode[];
  dependencies: Dependency[];
  codeFlow: CodeFlowStep[];
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  order: number;
  description: string;
  boilerplate?: string;
  tool: string;
  children?: FileNode[];
  imports?: string[];
  exports?: string[];
}

export interface Dependency {
  from: string;
  to: string;
  type: 'import' | 'component' | 'api' | 'data';
  description: string;
}

export interface CodeFlowStep {
  id: string;
  title: string;
  description: string;
  files: string[];
  order: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  examples?: string[];
  relatedTerms?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  mode: 'beginner' | 'intermediate';
  progress: UserProgress[];
}

export interface UserProgress {
  templateId: string;
  completedSteps: string[];
  lastAccessedAt: Date;
}