import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Plus, FileText, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useState } from 'react';

interface Resume {
  id: string;
  name: string;
  lastEdited: string;
  template: string;
  skills?: string[];
  education?: string[];
  experience?: string[];
}

export default function ResumesScreen() {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      name: 'Software Engineer Resume',
      lastEdited: '2 days ago',
      template: 'Modern',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      name: 'Product Manager Resume',
      lastEdited: '5 days ago',
      template: 'Professional',
      experience: ['Product Owner at Tech Co', 'Project Manager at Startup'],
    },
    {
      id: '3',
      name: 'UX Designer Resume',
      lastEdited: '1 week ago',
      template: 'Creative',
      education: ['BS in Design', 'UX Certificate'],
    },
  ]);

  const [showHint, setShowHint] = useState(true);

  const handleCreateResume = () => {
    Alert.alert(
      'Create New Resume',
      'Start with a blank template. All sections are optional and can be filled later.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: () => {
            const newResume: Resume = {
              id: Date.now().toString(),
              name: 'New Resume',
              lastEdited: 'Just now',
              template: 'Modern',
            };
            setResumes([newResume, ...resumes]);
          },
        },
      ],
    );
  };

  const handleResumePress = (resume: Resume) => {
    Alert.alert(
      resume.name,
      'Choose an action:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Edit',
          onPress: () => {
            // Navigate to resume editor
          },
        },
        {
          text: 'Download PDF',
          onPress: () => {
            // Handle PDF download
          },
        },
      ],
    );
  };

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
          <AlertCircle size={16} color="#0f766e" />
          <Text style={styles.hintText}>
            All resume sections are optional. Add what you need.
          </Text>
        </Pressable>
      )}

      <ScrollView style={styles.content}>
        <View style={styles.resumeGrid}>
          {resumes.map((resume) => (
            <Pressable
              key={resume.id}
              style={styles.resumeCard}
              onPress={() => handleResumePress(resume)}
            >
              <View style={styles.resumePreview}>
                <FileText size={32} color="#64748b" />
                <Text style={styles.templateText}>{resume.template}</Text>
              </View>
              <View style={styles.resumeInfo}>
                <Text style={styles.resumeName}>{resume.name}</Text>
                <Text style={styles.resumeDate}>Last edited: {resume.lastEdited}</Text>
                
                {resume.skills && (
                  <View style={styles.optionalSection}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <Text style={styles.sectionContent}>{resume.skills.join(', ')}</Text>
                  </View>
                )}
                
                {resume.education && (
                  <View style={styles.optionalSection}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <Text style={styles.sectionContent}>{resume.education.join(', ')}</Text>
                  </View>
                )}
                
                {resume.experience && (
                  <View style={styles.optionalSection}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    <Text style={styles.sectionContent}>{resume.experience.join(', ')}</Text>
                  </View>
                )}
              </View>
              <View style={styles.actions}>
                <Pressable 
                  style={styles.actionButton}
                  onPress={() => handleResumePress(resume)}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </Pressable>
                <Pressable 
                  style={[styles.actionButton, styles.downloadButton]}
                  onPress={() => handleResumePress(resume)}
                >
                  <Text style={styles.downloadText}>Download PDF</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccfbf1',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  hintText: {
    marginLeft: 8,
    color: '#0f766e',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  resumeGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  resumeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  resumePreview: {
    height: 160,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateText: {
    marginTop: 8,
    color: '#64748b',
    fontSize: 14,
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
  optionalSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 2,
  },
  sectionContent: {
    fontSize: 14,
    color: '#1e293b',
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  actionText: {
    color: '#1e293b',
    fontWeight: '500',
    fontSize: 14,
  },
  downloadButton: {
    backgroundColor: '#4f46e5',
  },
  downloadText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 14,
  },
});