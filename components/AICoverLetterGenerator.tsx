import React, { useState } from 'react';
import { CoverLetterAnalysis, generateCoverLetter, supabase } from '../app/utilis/ai'; // Corrected path: from components/ to app/

const AICoverLetterGenerator: React.FC = () => {
  const [analysis, setAnalysis] = useState<CoverLetterAnalysis | null>(null);
  const [resumeContent, setResumeContent] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [preferences, setPreferences] = useState<{
    tone: 'professional' | 'conversational' | 'enthusiastic';
    length: 'short' | 'medium' | 'long';
    focus: string[];
  }>({
    tone: 'professional',
    length: 'medium',
    focus: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);

      const result: CoverLetterAnalysis = await generateCoverLetter(
        resumeContent,
        jobDescription,
        preferences
      );

      setAnalysis(result);

      // Optional: Fetch stored analyses as an example of using supabase
      const { data, error: supabaseError } = await supabase
        .from('cover_letter_analyses')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (supabaseError) throw supabaseError;
      console.log('Latest analysis from Supabase:', data);
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AI Cover Letter Generator</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Resume Content:
          <textarea
            value={resumeContent}
            onChange={(e) => setResumeContent(e.target.value)}
            style={{ width: '100%', minHeight: '100px', marginTop: '5px' }}
            placeholder="Paste your resume content here..."
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Job Description:
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={{ width: '100%', minHeight: '100px', marginTop: '5px' }}
            placeholder="Paste the job description here..."
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Tone:
          <select
            value={preferences.tone}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                tone: e.target.value as 'professional' | 'conversational' | 'enthusiastic',
              })
            }
            style={{ marginLeft: '10px' }}
          >
            <option value="professional">Professional</option>
            <option value="conversational">Conversational</option>
            <option value="enthusiastic">Enthusiastic</option>
          </select>
        </label>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !resumeContent || !jobDescription}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Cover Letter'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {analysis && (
        <div style={{ marginTop: '20px' }}>
          <h2>Analysis Results</h2>
          <p>
            <strong>Score:</strong> {analysis.score}
          </p>
          <h3>Suggestions:</h3>
          <ul>
            {analysis.suggestions.map(
              (
                suggestion: {
                  message: string;
                  section: string;
                  impact: 'high' | 'medium' | 'low';
                  example?: string;
                },
                index: number
              ) => (
                <li key={index}>
                  {suggestion.message} ({suggestion.section}) - {suggestion.impact} impact
                  {suggestion.example && <p>Example: {suggestion.example}</p>}
                </li>
              )
            )}
          </ul>
          <h3>Tone:</h3>
          <p>Current: {analysis.tone.current}</p>
          <p>Suggestion: {analysis.tone.suggestion}</p>
          <h3>Personalization Score:</h3>
          <p>{analysis.personalization.score}/100</p>
          {/* Add more analysis details as needed */}
        </div>
      )}
    </div>
  );
};

export default AICoverLetterGenerator;