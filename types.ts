export interface DocumentItem {
  id: string;
  title: string;
  category: 'Project' | 'Form' | 'Lecture' | 'Other';
  size: string;
  date: string;
  type: string; // e.g., PDF, DOCX
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  category: 'Activity' | 'Workshop' | 'Presentation';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  HOME = 'HOME',
  DOCUMENTS = 'DOCUMENTS',
  GALLERY = 'GALLERY',
  SCHEDULE = 'SCHEDULE',
  AI_ASSISTANT = 'AI_ASSISTANT'
}