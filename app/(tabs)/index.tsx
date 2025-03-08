import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput, Modal } from 'react-native';
import { Plus, FileText, Mail, Search, Award, Briefcase } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { someAiFunction } from "../../app/tabs/resumes/utils/ai";


export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [showJobTrackerModal, setShowJobTrackerModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [coverLetterTitle, setCoverLetterTitle] = useState('');
  const [coverLetterTone, setCoverLetterTone] = useState('professional');


  const jobCategories = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Marketing',
    'Business',
    'Agriculture',
    'Engineering',
    'Design',
  ];

  const handleNewResume = () => {
    setShowResumeModal(true);
  };

  const handleCoverLetter = () => {
    setShowCoverLetterModal(true);
  };

  const handleJobTracker = () => {
    setShowJobTrackerModal(true);
  };

  const createResume = () => {
    if (!resumeTitle.trim()) {
      Alert.alert('Error', 'Please enter a resume title');
      return;
    }

    // Create resume and navigate to resume editor
    Alert.alert(
      'Resume Created',
      `Your "${resumeTitle}" resume has been created with an initial ATS score of 65/100. Let's improve it!`,
      [
        {
          text: 'Edit Now',
          onPress: () => {
            setShowResumeModal(false);
            router.push('/resumes');
          },
        },
      ]
    );
  };

  const createCoverLetter = () => {
    if (!coverLetterTitle.trim()) {
      Alert.alert('Error', 'Please enter a cover letter title');
      return;
    }

    // Create cover letter and navigate
    Alert.alert(
      'Cover Letter Created',
      `Your "${coverLetterTitle}" cover letter has been created with a ${coverLetterTone} tone.`,
      [
        {
          text: 'Edit Now',
          onPress: () => {
            setShowCoverLetterModal(false);
            router.push('/resumes');
          },
        },
      ]
    );
  };

  const searchJobs = () => {
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a job category');
      return;
    }

    // Navigate to jobs with category filter
    setShowJobTrackerModal(false);
    router.push({
      pathname: '/jobs',
      params: { category: selectedCategory },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, User! 👋</Text>
        <Text style={styles.subGreeting}>Let's build your perfect resume</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resumes or jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.quickActions}>
        <Pressable style={styles.actionButton} onPress={handleNewResume}>
          <Plus size={24} color="#4f46e5" />
          <Text style={styles.actionText}>New Resume</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleCoverLetter}>
          <FileText size={24} color="#4f46e5" />
          <Text style={styles.actionText}>Cover Letter</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleJobTracker}>
          <Mail size={24} color="#4f46e5" />
          <Text style={styles.actionText}>Job Tracker</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Resumes</Text>
        <View style={styles.recentItem}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Software Engineer Resume</Text>
            <View style={styles.atsBadge}>
              <Award size={14} color="#4f46e5" />
              <Text style={styles.atsScore}>ATS: 85/100</Text>
            </View>
          </View>
          <Text style={styles.recentDate}>Last edited 2 days ago</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>Technology</Text>
            <Text style={styles.tag}>Engineering</Text>
          </View>
        </View>
        <View style={styles.recentItem}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Product Manager Resume</Text>
            <View style={styles.atsBadge}>
              <Award size={14} color="#4f46e5" />
              <Text style={styles.atsScore}>ATS: 78/100</Text>
            </View>
          </View>
          <Text style={styles.recentDate}>Last edited 5 days ago</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>Business</Text>
            <Text style={styles.tag}>Technology</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Applications</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Applied</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Interviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Offers</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Jobs</Text>
        <View style={styles.jobItem}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>Senior Frontend Developer</Text>
            <Briefcase size={16} color="#64748b" />
          </View>
          <Text style={styles.jobCompany}>TechCorp Inc.</Text>
          <Text style={styles.jobDetails}>$120K - $150K • Remote • Posted 2 days ago</Text>
          <Pressable style={styles.applyButton} onPress={() => router.push('/jobs')}>
            <Text style={styles.applyButtonText}>View Details</Text>
          </Pressable>
        </View>
        <View style={styles.jobItem}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>UX/UI Designer</Text>
            <Briefcase size={16} color="#64748b" />
          </View>
          <Text style={styles.jobCompany}>DesignStudio</Text>
          <Text style={styles.jobDetails}>$90K - $110K • Hybrid • Posted 3 days ago</Text>
          <Pressable style={styles.applyButton} onPress={() => router.push('/jobs')}>
            <Text style={styles.applyButtonText}>View Details</Text>
          </Pressable>
        </View>
      </View>

      {/* New Resume Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showResumeModal}
        onRequestClose={() => setShowResumeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Resume</Text>
            <Text style={styles.modalSubtitle}>Let's create an ATS-optimized resume</Text>

            <Text style={styles.inputLabel}>Resume Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Software Engineer Resume"
              value={resumeTitle}
              onChangeText={setResumeTitle}
            />

            <Text style={styles.inputLabel}>Job Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {jobCategories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.categoryChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.categoryChipTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowResumeModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalPrimaryButton} onPress={createResume}>
                <Text style={styles.modalPrimaryButtonText}>Create Resume</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Cover Letter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCoverLetterModal}
        onRequestClose={() => setShowCoverLetterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Cover Letter</Text>
            <Text style={styles.modalSubtitle}>Craft a personalized cover letter</Text>

            <Text style={styles.inputLabel}>Cover Letter Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Application for Software Engineer"
              value={coverLetterTitle}
              onChangeText={setCoverLetterTitle}
            />

            <Text style={styles.inputLabel}>Tone</Text>
            <View style={styles.toneContainer}>
              {['professional', 'friendly', 'enthusiastic', 'formal'].map((tone) => (
                <Pressable
                  key={tone}
                  style={[
                    styles.toneChip,
                    coverLetterTone === tone && styles.toneChipSelected,
                  ]}
                  onPress={() => setCoverLetterTone(tone)}
                >
                  <Text
                    style={[
                      styles.toneChipText,
                      coverLetterTone === tone && styles.toneChipTextSelected,
                    ]}
                  >
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowCoverLetterModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalPrimaryButton} onPress={createCoverLetter}>
                <Text style={styles.modalPrimaryButtonText}>Create Cover Letter</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Job Tracker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showJobTrackerModal}
        onRequestClose={() => setShowJobTrackerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Find Jobs</Text>
            <Text style={styles.modalSubtitle}>Discover jobs matching your skills</Text>

            <Text style={styles.inputLabel}>Job Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {jobCategories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.categoryChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.categoryChipTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowJobTrackerModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalPrimaryButton} onPress={searchJobs}>
                <Text style={styles.modalPrimaryButtonText}>Search Jobs</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#64748b',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#ffffff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  recentItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  atsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  atsScore: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#4f46e5',
  },
  recentDate: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
    fontSize: 12,
    color: '#64748b',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4f46e5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  jobItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  jobDetails: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#4f46e5',
    fontWeight: '500',
    fontSize: 14,
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
    marginBottom: 16,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#ede9fe',
  },
  categoryChipText: {
    color: '#64748b',
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#4f46e5',
  },
  toneContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  toneChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    marginBottom: 8,
  },
  toneChipSelected: {
    backgroundColor: '#ede9fe',
  },
  toneChipText: {
    color: '#64748b',
    fontWeight: '500',
  },
  toneChipTextSelected: {
    color: '#4f46e5',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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
});