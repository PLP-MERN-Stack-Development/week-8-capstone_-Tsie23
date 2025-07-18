export interface ProjectType {
  id: string;
  name: string;
  description: string;
  tech: string[];
  color: string;
  icon: string;
}

export interface FileStructure {
  name: string;
  type: 'file' | 'folder';
  path: string;
  description: string;
  platform: string;
  dependencies: string[];
  children?: FileStructure[];
  order: number;
  boilerplate?: string;
}

export interface CodeFlow {
  step: number;
  title: string;
  description: string;
  files: string[];
  code?: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  examples?: string[];
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  fileStructure: FileStructure[];
  codeFlow: CodeFlow[];
  dependencies: string[];
  setupInstructions: string[];
}

export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  isBeginnerMode?: boolean;
  preferences?: {
    darkMode: boolean;
    selectedProject: string;
  };
  completedProjects?: Array<{
    projectId: string;
    completedAt: Date;
  }>;
}