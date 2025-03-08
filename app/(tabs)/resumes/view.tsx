import { View, Text, StyleSheet, ScrollView, Pressable, Alert, ActivityIndicator, Modal, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Download, CreditCard as Edit, Award, Sparkles, Share2, FileText } from 'lucide-react-native';

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface Skill {
  id: string;
  name: string;
  level?: string;
}

interface Resume {
  id: string;
  name: string;
  personalInfo: {
    fullName: string;
    email?: string;
    phone?: string;
    location?: string;
    summary?: string;
  };
  education?: Education[];
  experience?: Experience[];
  skills?: Skill[];
  createdAt: string;
  lastEdited: string;
}

export default function ViewResumeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<Resume | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  
  useEffect(() => {
    // In a real app, you would fetch the resume from a database
    // For now, we'll use mock data
    
    const mockResume: Resume = {
      id: '1',
      name: 'Software Engineer Resume',
      personalInfo: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        location: 'San Francisco, CA',
        summary: 'Experienced software engineer with a passion for building scalable web applications. Proficient in JavaScript, TypeScript, React, and Node.js.',
      },
      education: [
        {
          id: '1',
          school: 'Stanford University',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          startDate: 'Sep 2015',
          endDate: 'May 2019',
          description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.',
        },
      ],
      experience: [
        {
          id: '1',
          company: 'Tech Corp',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: 'Jun 2021',
          endDate: 'Present',
          description: 'Lead developer for the company\'s main product. Implemented new features, improved performance, and mentored junior developers.',
        },
        {
          id: '2',
          company: 'Startup Inc',
          position: 'Software Engineer',
          location: 'Remote',
          startDate: 'Jul 2019',
          endDate: 'May 2021',
          description: 'Developed and maintained web applications using React and Node.js. Collaborated with designers and product managers to deliver high-quality features.',
        },
      ],
      skills: [
        { id: '1', name: 'JavaScript', level: 'Expert' },
        { id: '2', name: 'TypeScript', level: 'Expert' },
        { id: '3', name: 'React', level: 'Expert' },
        { id: '4', name: 'Node.js', level: 'Advanced' },
        { id: '5', name: 'HTML/CSS', level: 'Advanced' },
        { id: '6', name: 'SQL', level: 'Intermediate' },
        { id: '7', name: 'AWS', level: 'Intermediate' },
        { id: '8', name: 'Docker', level: 'Intermediate' },
      ],
      createdAt: '2023-01-15T12:00:00Z',
      lastEdited: '2023-06-20T15:30:00Z',
    };
    
    setTimeout(() => {
      setResume(mockResume);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleDownload = () => {
    Alert.alert(
      'Download Resume',
      'Choose a format to download your resume:',
      [
        {
          text: 'PDF',
          onPress: () => {
            Alert.alert('Success', 'Resume downloaded as PDF.');
          },
        },
        {
          text: 'DOCX',
          onPress: () => {
            Alert.alert('Success', 'Resume downloaded as DOCX.');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };
  
  const handleEdit = () => {
    router.push(`/resumes/edit?id=${id}`);
  };
  
  const handleAIEnhance = () => {
    setShowAIModal(true);
  };
  
  const processAIPrompt = () => {
    if (!aiPrompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt for the AI.');
      return;
    }
    
    setAiLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setAiLoading(false);
      setShowAIModal(false);
      
      Alert.alert(
        'AI Enhancement Complete',
        'Your resume has been enhanced with AI suggestions. Would you like to view the changes?',
        [
          {
            text: 'Later',
            style: 'cancel',
          },
          {
            text: 'View Now',
            onPress: () => {
              // In a real app, you would update the resume with AI suggestions
              // For now, we'll just show a success message
              Alert.alert('Success', 'AI enhancements applied to your resume.');
            },
          },
        ]
      );
    }, 2000);
  };
  
  const handleShare = () => {
    setShowShareModal(true);
  };
  
  const processShare = () => {
    if (!emailTo.trim()) {
      Alert.alert('Error', 'Please enter an email address.');
      return;
    }
    
    // Simulate sharing
    setTimeout(() => {
      setShowShareModal(false);
      setEmailTo('');
      
      Alert.alert('Success', `Resume shared with ${emailTo}.`);
    }, 1000);
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading resume...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }
  
  if (!resume) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Resume not found</Text>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resume Preview</Text>
        <View style={styles.headerActions}>
          <Pressable style={styles.actionButton} onPress={handleAIEnhance}>
            <Sparkles size={20} color="#4f46e5" />
            <Text style={styles.actionButtonText}>AI Enhance</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color="#4f46e5" />
            <Text style={styles.actionButtonText}>Share</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={styles.atsScoreContainer}>
        <Award size={24} color="#4f46e5" />
        <View style={styles.atsScoreContent}>
          <Text style={styles.atsScoreTitle}>ATS Score: 85/100</Text>
          <Text style={styles.atsScoreText}>Your resume is highly ATS-friendly. Great job!</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.resumePreview}>
          <View style={styles.resumeHeader}>
            <Text style={styles.resumeName}>{resume.personalInfo.fullName}</Text>
            <View style={styles.contactInfo}>
              {resume.personalInfo.email && (
                <Text style={styles.contactItem}>{resume.personalInfo.email}</Text>
              )}
              {resume.personalInfo.phone && (
                <Text style={styles.contactItem}>{resume.personalInfo.phone}</Text>
              )}
              {resume.personalInfo.location && (
                <Text style={styles.contactItem}>{resume.personalInfo.location}</Text>
              )}
            </View>
          </View>
          
          {resume.personalInfo.summary && (
            <View style={styles.resumeSection}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summaryText}>{resume.personalInfo.summary}</Text>
            </View>
          )}
          
          {resume.experience && resume.experience.length > 0 && (
            <View style={styles.resumeSection}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resume.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>{exp.position}</Text>
                    {(exp.startDate || exp.endDate) && (
                      <Text style={styles.experienceDates}>
                        {exp.startDate || ''} - {exp.endDate || 'Present'}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.experienceCompany}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </Text>
                  {exp.description && (
                    <Text style={styles.experienceDescription}>{exp.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
          
          {resume.education && resume.education.length > 0 && (
            <View style={styles.resumeSection}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resume.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                    {(edu.startDate || edu.endDate) && (
                      <Text style={styles.educationDates}>
                        {edu.startDate || ''} - {edu.endDate || 'Present'}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.educationDegree}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </Text>
                  {edu.description && (
                    <Text style={styles.educationDescription}>{edu.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
          
          {resume.skills && resume.skills.length > 0 && (
            <View style={styles.resumeSection}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {resume.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillItem}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    {skill.level && (
                      <Text style={styles.skillLevel}> • {skill.level}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.actions}>
        <Pressable 
          style={styles.secondaryButton}
          onPress={handleEdit}
        >
          <Edit size={20} color="#4f46e5" />
          <Text style={styles.secondaryButtonText}>Edit</Text>
        </Pressable>
        <Pressable 
          style={styles.primaryButton}
          onPress={handleDownload}
        >
          <Download size={20} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Download</Text>
        </Pressable>
      </View>
      
      {/* AI Enhancement Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAIModal}
        onRequestClose={() => setShowAIModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>AI Resume Enhancement</Text>
            <Text style={styles.modalSubtitle}>
              Let our AI help improve your resume. Describe what you'd like to enhance.
            </Text>
            
            <View style={styles.aiPromptContainer}>
              <TextInput
                style={styles.aiPromptInput}
                value={aiPrompt}
                onChangeText={setAiPrompt}
                placeholder="e.g., Make my experience more impactful, improve my summary, suggest better skills"
                multiline
                numberOfLines={4}
              />
            </View>
            
            <View style={styles.aiSuggestions}>
              <Text style={styles.aiSuggestionsTitle}>Suggested prompts:</Text>
              <Pressable 
                style={styles.aiSuggestionChip}
                onPress={() => setAiPrompt("Make my experience descriptions more impactful and quantifiable")}
              >
                <Text style={styles.aiSuggestionText}>Improve experience descriptions</Text>
              </Pressable>
              <Pressable 
                style={styles.aiSuggestionChip}
                onPress={() => setAiPrompt("Rewrite my summary to be more professional and concise")}
              >
                <Text style={styles.aiSuggestionText}>Enhance professional summary</Text>
              </Pressable>
              <Pressable 
                style={styles.aiSuggestionChip}
                onPress={() => setAiPrompt("Suggest relevant skills for a software engineering role")}
              >
                <Text style={styles.aiSuggestionText}>Suggest relevant skills</Text>
              </Pressable>
            </View>
            
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowAIModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable 
                style={[
                  styles.modalPrimaryButton,
                  aiLoading ? styles.modalPrimaryButtonDisabled : null
                ]}
                onPress={processAIPrompt}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.modalPrimaryButtonText}>Enhance with AI</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Share Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showShareModal}
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Share Resume</Text>
            <Text style={styles.modalSubtitle}>
              Share your resume with recruiters or colleagues
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={emailTo}
                onChangeText={setEmailTo}
                placeholder="Enter recipient's email"
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.shareOptions}>
              <Text style={styles.shareOptionsTitle}>Share as:</Text>
              <View style={styles.shareOptionsRow}>
                <Pressable style={styles.shareOptionChip}>
                  <FileText size={16} color="#4f46e5" />
                  <Text style={styles.shareOptionText}>PDF</Text>
                </Pressable>
                <Pressable style={styles.shareOptionChip}>
                  <FileText size={16} color="#4f46e5" />
                  <Text style={styles.shareOptionText}>DOCX</Text>
                </Pressable>
                <Pressable style={[styles.shareOptionChip, styles.shareOptionSelected]}>
                  <FileText size={16} color="#ffffff" />
                  <Text style={styles.shareOptionSelectedText}>Link</Text>
                </Pressable>
              </View>
            </View>
            
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowShareModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable 
                style={styles.modalPrimaryButton}
                onPress={processShare}
              >
                <Text style={styles.modalPrimaryButtonText}>Share</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#4f46e5',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 4,
  },
  atsScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede9fe',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  atsScoreContent: {
    marginLeft: 12,
    flex: 1,
  },
  atsScoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4f46e5',
    marginBottom: 4,
  },
  atsScoreText: {
    fontSize: 14,
    color: '#4338ca',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  resumePreview: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  resumeHeader: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 16,
  },
  resumeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: 14,
    color: '#64748b',
    marginHorizontal: 8,
    marginBottom: 4,
  },
  resumeSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  experienceDates: {
    fontSize: 14,
    color: '#64748b',
  },
  experienceCompany: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
  educationItem: {
    marginBottom: 16,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  educationSchool: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  educationDates: {
    fontSize: 14,
    color: '#64748b',
  },
  educationDegree: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
  },
  educationDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  skillLevel: {
    fontSize: 12,
    color: '#64748b',
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 2,
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#4f46e5',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  aiPromptContainer: {
    marginBottom: 16,
  },
  aiPromptInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  aiSuggestions: {
    marginBottom: 20,
  },
  aiSuggestionsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  aiSuggestionChip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  aiSuggestionText: {
    color: '#4f46e5',
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalPrimaryButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  modalPrimaryButtonDisabled: {
    backgroundColor: '#818cf8',
  },
  modalPrimaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalSecondaryButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  modalSecondaryButtonText: {
    color: '#1e293b',
    fontWeight: '600',
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  shareOptions: {
    marginBottom: 20,
  },
  shareOptionsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  shareOptionsRow: {
    flexDirection: 'row',
  },
  shareOptionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  shareOptionSelected: {
    backgroundColor: '#4f46e5',
  },
  shareOptionText: {
    color: '#4f46e5',
    fontSize: 14,
    marginLeft: 4,
  },
  shareOptionSelectedText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 4,
  },
});