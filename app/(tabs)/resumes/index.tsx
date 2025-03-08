import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Plus, Search, FileText, Award, CreditCard as Edit, Trash2, Download } from 'lucide-react-native';
import { analyzeResume } from '../../utils/ai';

interface Resume {
  id: string;
  name: string;
  lastEdited: string;
  template: string;
  atsScore?: number;
  skills?: string[];
  education?: string[];
  experience?: string[];
}

export default function ResumesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
  const [showHint, setShowHint] = useState(true);
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading resumes from backend
    setTimeout(() => {
      setResumes([
        {
          id: '1',
          name: 'Software Engineer Resume',
          lastEdited: '2 days ago',
          template: 'Modern',
          atsScore: 85,
          skills: ['React', 'TypeScript', 'Node.js'],
          education: ['BS Computer Science, Stanford University'],
          experience: ['Senior Developer at Tech Corp', 'Software Engineer at StartupX']
        },
        {
          id: '2',
          name: 'Product Manager Resume',
          lastEdited: '5 days ago',
          template: 'Professional',
          atsScore: 78,
          skills: ['Product Strategy', 'Agile', 'User Research'],
          education: ['MBA, Harvard Business School'],
          experience: ['Product Manager at BigTech', 'Product Owner at Innovation Co']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = resumes.filter(resume => 
        resume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resume.skills?.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        resume.education?.some(edu =>
          edu.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        resume.experience?.some(exp =>
          exp.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredResumes(filtered);
    } else {
      setFilteredResumes(resumes);
    }
  }, [searchQuery, resumes]);

  const handleCreateResume = () => {
    router.push('/resumes/create');
  };

  const handleEditResume = (resume: Resume) => {
    router.push(`/resumes/edit?id=${resume.id}`);
  };

  const handleAnalyzeResume = async (resume: Resume) => {
    setAnalyzing(resume.id);
    try {
      const analysis = await analyzeResume(JSON.stringify(resume));
      Alert.alert(
        'AI Analysis Complete',
        `ATS Score: ${analysis.score}/100\n\nKey Suggestions:\n${analysis.suggestions.map(s => `• ${s.message}`).join('\n')}`,
        [
          {
            text: 'View Details',
            onPress: () => handleEditResume(resume)
          },
          { text: 'Close' }
        ]
      );
    } catch (error) {
      Alert.alert('Analysis Failed', 'Could not analyze resume. Please try again.');
    } finally {
      setAnalyzing(null);
    }
  };

  const handleDownloadResume = (resume: Resume) => {
    Alert.alert(
      'Download Resume',
      'Choose format:',
      [
        {
          text: 'PDF',
          onPress: () => Alert.alert('Success', `${resume.name} downloaded as PDF`)
        },
        {
          text: 'DOCX',
          onPress: () => Alert.alert('Success', `${resume.name} downloaded as DOCX`)
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleDeleteResume = (resume: Resume) => {
    Alert.alert(
      'Delete Resume',
      `Are you sure you want to delete "${resume.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setResumes(prev => prev.filter(r => r.id !== resume.id));
            Alert.alert('Success', `"${resume.name}" has been deleted.`);
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading your resumes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Resumes</Text>
        <Pressable style={styles.createButton} onPress={handleCreateResume}>
          <Plus size={20} color="#ffffff" />
          <Text style={styles.createButtonText}>Create New</Text>
        </Pressable>
      </View>

      {showHint && (
        <Pressable 
          style={styles.hintBanner}
          onPress={() => setShowHint(false)}
        >
          <Text style={styles.hintText}>
            Use AI to analyze and improve your resumes. Tap to dismiss.
          </Text>
        </Pressable>
      )}

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search resumes by name or skills..."
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredResumes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No resumes found.</Text>
            {searchQuery ? (
              <Pressable 
                style={styles.clearSearchButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearSearchButtonText}>Clear Search</Text>
              </Pressable>
            ) : (
              <Pressable 
                style={styles.createFirstButton}
                onPress={handleCreateResume}
              >
                <Text style={styles.createFirstButtonText}>Create Your First Resume</Text>
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.resumeGrid}>
            {filteredResumes.map((resume) => (
              <Pressable
                key={resume.id}
                style={styles.resumeCard}
                onPress={() => handleEditResume(resume)}
              >
                <View style={styles.resumePreview}>
                  <FileText size={32} color="#64748b" />
                  <Text style={styles.templateText}>{resume.template}</Text>
                  {resume.atsScore && (
                    <View style={styles.atsScoreBadge}>
                      <Award size={14} color="#4f46e5" />
                      <Text style={styles.atsScoreText}>{resume.atsScore}/100</Text>
                    </View>
                  )}
                </View>

                <View style={styles.resumeInfo}>
                  <Text style={styles.resumeName}>{resume.name}</Text>
                  <Text style={styles.resumeDate}>Last edited: {resume.lastEdited}</Text>
                  
                  {resume.skills && resume.skills.length > 0 && (
                    <View style={styles.skillsContainer}>
                      {resume.skills.map((skill, index) => (
                        <View key={index} style={styles.skillChip}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  
                  {resume.education && resume.education.length > 0 && (
                    <View style={styles.sectionContainer}>
                      <Text style={styles.sectionTitle}>Education</Text>
                      {resume.education.map((edu, index) => (
                        <Text key={index} style={styles.sectionText}>{edu}</Text>
                      ))}
                    </View>
                  )}
                  
                  {resume.experience && resume.experience.length > 0 && (
                    <View style={styles.sectionContainer}>
                      <Text style={styles.sectionTitle}>Experience</Text>
                      {resume.experience.map((exp, index) => (
                        <Text key={index} style={styles.sectionText}>{exp}</Text>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.actions}>
                  <View style={styles.actionButtons}>
                    <Pressable 
                      style={styles.iconButton}
                      onPress={() => handleEditResume(resume)}
                    >
                      <Edit size={20} color="#4f46e5" />
                    </Pressable>
                    <Pressable 
                      style={styles.iconButton}
                      onPress={() => handleDownloadResume(resume)}
                    >
                      <Download size={20} color="#4f46e5" />
                    </Pressable>
                    <Pressable 
                      style={styles.iconButton}
                      onPress={() => handleDeleteResume(resume)}
                    >
                      <Trash2 size={20} color="#ef4444" />
                    </Pressable>
                  </View>
                  <Pressable 
                    style={styles.analyzeButton}
                    onPress={() => handleAnalyzeResume(resume)}
                    disabled={analyzing === resume.id}
                  >
                    {analyzing === resume.id ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <>
                        <Award size={18} color="#ffffff" />
                        <Text style={styles.analyzeButtonText}>Analyze with AI</Text>
                      </>
                    )}
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  hintBanner: {
    backgroundColor: '#ede9fe',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  hintText: {
    color: '#4f46e5',
    fontSize: 14,
    textAlign: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1e293b',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  clearSearchButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearSearchButtonText: {
    color: '#4f46e5',
    fontWeight: '500',
    fontSize: 14,
  },
  createFirstButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createFirstButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  resumeGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  resumeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  resumePreview: {
    height: 120,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  templateText: {
    marginTop: 8,
    color: '#64748b',
    fontSize: 14,
  },
  atsScoreBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  atsScoreText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#4f46e5',
  },
  resumeInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  resumeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  resumeDate: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  skillChip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#4f46e5',
  },
  sectionContainer: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  analyzeButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 6,
  },
});