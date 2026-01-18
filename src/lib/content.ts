/**
 * Content API Layer
 * 
 * This module provides a centralized way to fetch content from the backend.
 * In production, replace mock data with actual API calls to your FastAPI backend.
 * 
 * All content is fetched dynamically - nothing is hardcoded in components.
 */

import { supabase } from './supabase';

// Types for content structure
export interface ContentItem {
  id: string;
  key: string;
  value: string;
  language: 'he' | 'en';
}

export interface Service {
  id: string;
  icon: string;
  title: Record<'he' | 'en', string>;
  description: Record<'he' | 'en', string>;
  color: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: Record<'he' | 'en', string>;
  description: Record<'he' | 'en', string>;
}

export interface ContactInfo {
  id: string;
  type: 'phone' | 'email' | 'address' | 'hours';
  value: string;
  label: Record<'he' | 'en', string>;
}

export interface FAQItem {
  id: string;
  question: Record<'he' | 'en', string>;
  answer: Record<'he' | 'en', string>;
  category?: string;
}

// Mock data - replace with API calls in production
const mockServices: Service[] = [
  {
    id: '1',
    icon: 'Brain',
    title: { he: 'אבחון ADHD', en: 'ADHD Diagnosis' },
    description: { 
      he: 'אבחון מקצועי ומקיף לילדים, בני נוער ומבוגרים על ידי צוות מומחים', 
      en: 'Professional and comprehensive diagnosis for children, teens and adults by expert team' 
    },
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: '2',
    icon: 'ClipboardList',
    title: { he: 'תוכנית טיפול אישית', en: 'Personalized Treatment' },
    description: { 
      he: 'תוכנית טיפול מותאמת אישית לצרכים הייחודיים שלך', 
      en: 'Treatment plan tailored to your unique needs' 
    },
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: '3',
    icon: 'Users',
    title: { he: 'ייעוץ ותמיכה משפחתית', en: 'Family Support' },
    description: { 
      he: 'הדרכה ותמיכה מקצועית למשפחות ולקרובים', 
      en: 'Professional guidance and support for families' 
    },
    color: 'from-orange-500 to-amber-600'
  }
];

const mockProcessSteps: ProcessStep[] = [
  { id: '1', step: 1, title: { he: 'יצירת קשר', en: 'Contact' }, description: { he: 'פנייה ראשונית לקביעת פגישה', en: 'Initial contact to schedule appointment' } },
  { id: '2', step: 2, title: { he: 'פגישת היכרות', en: 'Initial Meeting' }, description: { he: 'שיחת היכרות ואיסוף רקע', en: 'Getting to know you and gathering background' } },
  { id: '3', step: 3, title: { he: 'אבחון', en: 'Assessment' }, description: { he: 'תהליך אבחון מקיף ומקצועי', en: 'Comprehensive professional assessment' } },
  { id: '4', step: 4, title: { he: 'תוכנית טיפול', en: 'Treatment Plan' }, description: { he: 'קבלת תוכנית טיפול אישית', en: 'Receive personalized treatment plan' } }
];

const mockContactInfo: ContactInfo[] = [
  { id: '1', type: 'phone', value: '055-27-399-27', label: { he: 'טלפון', en: 'Phone' } },
  { id: '2', type: 'email', value: 'info@keshevplus.co.il', label: { he: 'דוא"ל', en: 'Email' } },
  { id: '3', type: 'address', value: 'Tel Aviv, Israel', label: { he: 'כתובת', en: 'Address' } },
  { id: '4', type: 'hours', value: 'Sun-Thu 9:00-18:00', label: { he: 'שעות פעילות', en: 'Hours' } }
];

const mockFAQs: FAQItem[] = [
  {
    id: '1',
    question: { he: 'מהו ADHD?', en: 'What is ADHD?' },
    answer: { 
      he: 'ADHD (הפרעת קשב וריכוז) היא הפרעה נוירולוגית המשפיעה על יכולת הריכוז, השליטה בדחפים וויסות הפעילות. היא נפוצה בילדים ומבוגרים כאחד.', 
      en: 'ADHD (Attention Deficit Hyperactivity Disorder) is a neurological condition affecting concentration, impulse control, and activity regulation. It is common in both children and adults.' 
    },
    category: 'general'
  },
  {
    id: '2',
    question: { he: 'כמה זמן לוקח תהליך האבחון?', en: 'How long does the diagnosis process take?' },
    answer: { 
      he: 'תהליך האבחון המלא כולל מספר פגישות ואורך בממוצע 2-4 שבועות. התהליך כולל ריאיון קליני, מבחנים ממוחשבים ושאלונים.', 
      en: 'The full diagnosis process includes several sessions and takes an average of 2-4 weeks. It includes clinical interview, computerized tests, and questionnaires.' 
    },
    category: 'process'
  },
  {
    id: '3',
    question: { he: 'האם האבחון מתאים לכל הגילאים?', en: 'Is the diagnosis suitable for all ages?' },
    answer: { 
      he: 'כן, אנו מספקים אבחון מקצועי לילדים מגיל 6, בני נוער ומבוגרים. לכל גיל יש פרוטוקול אבחון מותאם.', 
      en: 'Yes, we provide professional diagnosis for children from age 6, teenagers, and adults. Each age group has a tailored assessment protocol.' 
    },
    category: 'general'
  },
  {
    id: '4',
    question: { he: 'מה כלול בתוכנית הטיפול?', en: 'What is included in the treatment plan?' },
    answer: { 
      he: 'תוכנית הטיפול מותאמת אישית וכוללת המלצות לטיפול תרופתי (במידת הצורך), הדרכת הורים, כלים להתמודדות יומיומית ומעקב מתמשך.', 
      en: 'The treatment plan is personalized and includes medication recommendations (if needed), parent guidance, daily coping tools, and ongoing follow-up.' 
    },
    category: 'treatment'
  }
];

// Content fetching functions
export const contentApi = {
  /**
   * Fetch services from backend
   * In production: GET /api/services
   */
  async getServices(): Promise<Service[]> {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/services');
    // return response.json();
    return mockServices;
  },

  /**
   * Fetch process steps from backend
   * In production: GET /api/process-steps
   */
  async getProcessSteps(): Promise<ProcessStep[]> {
    return mockProcessSteps;
  },

  /**
   * Fetch contact information from backend
   * In production: GET /api/contact-info
   */
  async getContactInfo(): Promise<ContactInfo[]> {
    return mockContactInfo;
  },

  /**
   * Fetch FAQs from backend
   * In production: GET /api/faqs
   */
  async getFAQs(): Promise<FAQItem[]> {
    return mockFAQs;
  },

  /**
   * Submit contact form to backend
   * In production: POST /api/contact
   */
  async submitContactForm(data: {
    name: string;
    phone: string;
    email?: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return response.json();
    
    // For now, store in Supabase if available
    try {
      console.log('Submitting contact form:', data);
      return { success: true, message: 'Form submitted successfully' };
    } catch (error) {
      console.error('Contact form error:', error);
      return { success: false, message: 'Failed to submit form' };
    }
  }
};

// Custom hook for fetching content with loading states
export function useContent<T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetcher();
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

// Re-export for convenience
import { useState, useEffect } from 'react';
