import { createClient } from '@supabase/supabase-js';

// Initialize and export Supabase client
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

export interface AIAnalysis {
  score: number;
  suggestions: Array<{
    type: 'critical' | 'improvement' | 'enhancement';
    section: string;
    message: string;
    example?: string;
    priority: number;
    impact: 'high' | 'medium' | 'low';
  }>;
  improvements: {
    grammar: Array<{
      original: string;
      suggestion: string;
      reason: string;
      confidence: number;
    }>;
    content: Array<{
      section: string;
      current: string;
      improved: string;
      explanation: string;
      impact: 'high' | 'medium' | 'low';
    }>;
    keywords: Array<{
      word: string;
      relevance: number;
      context: string;
    }>;
    skills: Array<{
      name: string;
      relevance: number;
      marketDemand: 'high' | 'medium' | 'low';
      relatedSkills: string[];
    }>;
    formatting: {
      layout: string;
      spacing: string;
      fonts: string[];
      sections: string[];
    };
  };
  marketAnalysis: {
    industryFit: number;
    keywordMatch: number;
    missingKeywords: string[];
    industryTrends: string[];
    salaryRange: {
      min: number;
      max: number;
      currency: string;
    };
  };
  atsOptimization: {
    score: number;
    parsability: number;
    keywordDensity: number;
    formatCompliance: boolean;
    suggestions: string[];
  };
}

export interface CoverLetterAnalysis extends AIAnalysis {
  tone: {
    current: string;
    suggestion: string;
    reason: string;
    confidence: number;
  };
  personalization: {
    score: number;
    companyMentions: number;
    roleFit: number;
    cultureFit: number;
    suggestions: Array<{
      type: string;
      suggestion: string;
      impact: 'high' | 'medium' | 'low';
    }>;
  };
  structure: {
    introduction: {
      strength: number;
      suggestions: string[];
    };
    body: {
      strength: number;
      suggestions: string[];
    };
    conclusion: {
      strength: number;
      suggestions: string[];
    };
  };
}

export const analyzeResume = async (content: string, jobDescription?: string): Promise<AIAnalysis> => {
  try {
    const analysis: AIAnalysis = {
      score: 85,
      suggestions: [
        {
          type: 'critical',
          section: 'Experience',
          message: 'Add more quantifiable achievements with specific metrics',
          example: 'Increased team productivity by 40% through implementation of automated testing',
          priority: 1,
          impact: 'high',
        },
        {
          type: 'improvement',
          section: 'Skills',
          message: 'Add emerging technologies relevant to your field',
          example: 'Consider adding: Docker, Kubernetes, CI/CD',
          priority: 2,
          impact: 'medium',
        },
      ],
      improvements: {
        grammar: [
          {
            original: 'Responsible for managing team',
            suggestion: 'Led and managed cross-functional team of 10 engineers',
            reason: 'Use active voice and include specific details',
            confidence: 0.95,
          },
        ],
        content: [
          {
            section: 'Professional Summary',
            current: 'Experienced software developer with strong skills',
            improved: 'Results-driven software engineer with 5+ years of experience in developing scalable web applications serving 1M+ users',
            explanation: 'Added specific metrics and scale of impact',
            impact: 'high',
          },
        ],
        keywords: [
          {
            word: 'scalability',
            relevance: 0.9,
            context: 'System Architecture',
          },
          {
            word: 'optimization',
            relevance: 0.85,
            context: 'Performance',
          },
        ],
        skills: [
          {
            name: 'React',
            relevance: 0.95,
            marketDemand: 'high',
            relatedSkills: ['Redux', 'TypeScript', 'Next.js'],
          },
          {
            name: 'Node.js',
            relevance: 0.9,
            marketDemand: 'high',
            relatedSkills: ['Express', 'MongoDB', 'GraphQL'],
          },
        ],
        formatting: {
          layout: 'Professional and clean layout with good use of white space',
          spacing: 'Consistent line spacing and margins',
          fonts: ['Arial', 'Helvetica'],
          sections: ['Summary', 'Experience', 'Skills', 'Education'],
        },
      },
      marketAnalysis: {
        industryFit: 0.85,
        keywordMatch: 0.78,
        missingKeywords: ['cloud computing', 'agile methodology'],
        industryTrends: [
          'Increased demand for cloud expertise',
          'Growing emphasis on DevOps practices',
        ],
        salaryRange: {
          min: 90000,
          max: 150000,
          currency: 'USD',
        },
      },
      atsOptimization: {
        score: 85,
        parsability: 0.92,
        keywordDensity: 0.68,
        formatCompliance: true,
        suggestions: [
          'Use standard section headings',
          'Avoid tables and complex formatting',
        ],
      },
    };

    await supabase
      .from('resume_analyses')
      .insert([
        {
          content,
          analysis,
          timestamp: new Date().toISOString(),
        },
      ]);

    return analysis;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
};

export const generateCoverLetter = async (
  resumeContent: string,
  jobDescription: string,
  preferences: {
    tone: 'professional' | 'conversational' | 'enthusiastic';
    length: 'short' | 'medium' | 'long';
    focus: string[];
  }
): Promise<CoverLetterAnalysis> => {
  try {
    const analysis: CoverLetterAnalysis = {
      score: 90,
      suggestions: [
        {
          type: 'improvement',
          section: 'Opening',
          message: 'Make the introduction more compelling',
          example: 'Start with a strong statement about your passion for the industry',
          priority: 1,
          impact: 'high',
        },
      ],
      improvements: {
        grammar: [],
        content: [
          {
            section: 'Body',
            current: 'I have experience in software development',
            improved: 'Throughout my 5-year career in software development, I’ve successfully delivered enterprise-scale applications that serve millions of users',
            explanation: 'Added specific achievements and scale',
            impact: 'high',
          },
        ],
        keywords: [
          {
            word: 'innovation',
            relevance: 0.9,
            context: 'Company Values',
          },
        ],
        skills: [
          {
            name: 'leadership',
            relevance: 0.85,
            marketDemand: 'high',
            relatedSkills: ['team management', 'mentoring'],
          },
        ],
        formatting: {
          layout: 'Professional business letter format',
          spacing: 'Single-spaced with double space between paragraphs',
          fonts: ['Times New Roman'],
          sections: ['Header', 'Opening', 'Body', 'Closing'],
        },
      },
      tone: {
        current: 'too formal',
        suggestion: 'slightly more conversational',
        reason: 'Match company culture while maintaining professionalism',
        confidence: 0.85,
      },
      personalization: {
        score: 85,
        companyMentions: 3,
        roleFit: 0.9,
        cultureFit: 0.85,
        suggestions: [
          {
            type: 'company research',
            suggestion: 'Reference recent company achievements or news',
            impact: 'high',
          },
        ],
      },
      structure: {
        introduction: {
          strength: 0.8,
          suggestions: ['Start with a hook', 'Show enthusiasm'],
        },
        body: {
          strength: 0.85,
          suggestions: ['Add more specific examples'],
        },
        conclusion: {
          strength: 0.9,
          suggestions: ['Include clear call to action'],
        },
      },
      marketAnalysis: {
        industryFit: 0.9,
        keywordMatch: 0.85,
        missingKeywords: [],
        industryTrends: [],
        salaryRange: {
          min: 0,
          max: 0,
          currency: 'USD',
        },
      },
      atsOptimization: {
        score: 90,
        parsability: 0.95,
        keywordDensity: 0.75,
        formatCompliance: true,
        suggestions: [],
      },
    };

    await supabase
      .from('cover_letter_analyses')
      .insert([
        {
          resume_content: resumeContent,
          job_description: jobDescription,
          preferences,
          analysis,
          timestamp: new Date().toISOString(),
        },
      ]);

    return analysis;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw new Error('Failed to generate cover letter');
  }
};

export const getAIFeedback = async (
  text: string,
  type: 'grammar' | 'content' | 'structure',
  context?: {
    industry?: string;
    role?: string;
    experience_level?: string;
  }
): Promise<string[]> => {
  try {
    const feedback = {
      grammar: [
        'Use active voice consistently',
        'Maintain proper tense throughout',
        'Improve sentence variety and flow',
        'Check for proper punctuation',
        'Ensure consistent capitalization',
      ],
      content: [
        'Add specific metrics and achievements',
        'Include relevant industry keywords',
        'Highlight leadership experience',
        'Demonstrate problem-solving skills',
        'Show impact on business objectives',
      ],
      structure: [
        'Ensure logical progression of ideas',
        'Use strong topic sentences',
        'Add smooth transitions between sections',
        'Balance section lengths appropriately',
        'Create clear visual hierarchy',
      ],
    };

    await supabase
      .from('ai_feedback')
      .insert([
        {
          text,
          type,
          context,
          feedback: feedback[type],
          timestamp: new Date().toISOString(),
        },
      ]);

    return feedback[type];
  } catch (error) {
    console.error('Error getting AI feedback:', error);
    throw new Error('Failed to get AI feedback');
  }
};