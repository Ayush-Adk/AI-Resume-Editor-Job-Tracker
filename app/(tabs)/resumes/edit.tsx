import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Plus, Trash2, Save, FileText, Award } from 'lucide-react-native';

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface Resume {
  id: string;
  name: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  createdAt: string;
  lastEdited: string;
}

export default function EditResumeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  
  const [loading, setLoading] = useState(true);
  const [resumeName, setResumeName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  
  const [currentEducation, setCurrentEducation] = useState<Education>({
    id: '',
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    id: '',
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    id: '',
    name: '',
    level: ''
  });
  
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  
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
      setResumeName(mockResume.name);
      setFullName(mockResume.personalInfo.fullName);
      setEmail(mockResume.personalInfo.email);
      setPhone(mockResume.personalInfo.phone);
      setLocation(mockResume.personalInfo.location);
      setSummary(mockResume.personalInfo.summary);
      setEducation(mockResume.education);
      setExperience(mockResume.experience);
      setSkills(mockResume.skills);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const addEducation = () => {
    if (!currentEducation.school || !currentEducation.degree) {
      Alert.alert('Missing Information', 'School and degree are required fields.');
      return;
    }
    
    if (editMode) {
      const updatedEducation = [...education];
      updatedEducation[editIndex] = {...currentEducation};
      setEducation(updatedEducation);
      setEditMode(false);
      setEditIndex(-1);
    } else {
      setEducation([...education, {...currentEducation, id: Date.now().toString()}]);
    }
    
    setCurrentEducation({
      id: '',
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setShowEducationModal(false);
  };
  
  const addExperience = () => {
    if (!currentExperience.company || !currentExperience.position) {
      Alert.alert('Missing Information', 'Company and position are required fields.');
      return;
    }
    
    if (editMode) {
      const updatedExperience = [...experience];
      updatedExperience[editIndex] = {...currentExperience};
      setExperience(updatedExperience);
      setEditMode(false);
      setEditIndex(-1);
    } else {
      setExperience([...experience, {...currentExperience, id: Date.now().toString()}]);
    }
    
    setCurrentExperience({
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setShowExperienceModal(false);
  };
  
  const addSkill = () => {
    if (!currentSkill.name) {
      Alert.alert('Missing Information', 'Skill name is required.');
      return;
    }
    
    if (editMode) {
      const updatedSkills = [...skills];
      updatedSkills[editIndex] = {...currentSkill};
      setSkills(updatedSkills);
      setEditMode(false);
      setEditIndex(-1);
    } else {
      setSkills([...skills, {...currentSkill, id: Date.now().toString()}]);
    }
    
    setCurrentSkill({
      id: '',
      name: '',
      level: ''
    });
    setShowSkillModal(false);
  };
  
  const editEducationItem = (index: number) => {
    setCurrentEducation(education[index]);
    setEditMode(true);
    setEditIndex(index);
    setShowEducationModal(true);
  };
  
  const editExperienceItem = (index: number) => {
    setCurrentExperience(experience[index]);
    setEditMode(true);
    setEditIndex(index);
    setShowExperienceModal(true);
  };
  
  const editSkillItem = (index: number) => {
    setCurrentSkill(skills[index]);
    setEditMode(true);
    setEditIndex(index);
    setShowSkillModal(true);
  };
  
  const removeEducation = (id: string) => {
    setEducation(education.filter(item => item.id !== id));
  };
  
  const removeExperience = (id: string) => {
    setExperience(experience.filter(item => item.id !== id));
  };
  
  const removeSkill = (id: string) => {
    setSkills(skills.filter(item => item.id !== id));
  };
  
  const saveResume = () => {
    if (!resumeName || !fullName) {
      Alert.alert('Missing Information', 'Resume name and full name are required fields.');
      return;
    }
    
    // Here you would update the resume in the database
    // For now, we'll just show a success message and navigate back
    
    const resumeData = {
      id: id as string,
      name: resumeName,
      personalInfo: {
        fullName,
        email,
        phone,
        location,
        summary
      },
      education,
      experience,
      skills,
      createdAt: '2023-01-15T12:00:00Z', // This would be preserved from the original
      lastEdited: new Date().toISOString()
    };
    
    // Simulate saving to database
    setTimeout(() => {
      Alert.alert(
        'Resume Updated',
        `Your resume "${resumeName}" has been updated successfully.`,
        [
          {
            text: 'View Resume',
            onPress: () => router.push(`/resumes/view?id=${id}`)
          }
        ]
      );
    }, 1000);
  };
  
  const previewResume = () => {
    if (!resumeName || !fullName) {
      Alert.alert('Missing Information', 'Resume name and full name are required fields.');
      return;
    }
    
    // Navigate to preview screen
    router.push(`/resumes/view?id=${id}`);
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading resume...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Resume</Text>
        <Text style={styles.subtitle}>All fields are optional unless marked with *</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Resume Name *</Text>
          <TextInput
            style={styles.input}
            value={resumeName}
            onChangeText={setResumeName}
            placeholder="e.g., Software Engineer Resume"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g., John Doe"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="e.g., john.doe@example.com"
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="e.g., (123) 456-7890"
            keyboardType="phone-pad"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="e.g., New York, NY"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Professional Summary</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={summary}
            onChangeText={setSummary}
            placeholder="Brief summary of your professional background and goals..."
            multiline
            numberOfLines={4}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Pressable 
            style={styles.addButton}
            onPress={() => {
              setEditMode(false);
              setCurrentEducation({
                id: '',
                school: '',
                degree: '',
                fieldOfStudy: '',
                startDate: '',
                endDate: '',
                description: ''
              });
              setShowEducationModal(true);
            }}
          >
            <Plus size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
        
        {education.length === 0 ? (
          <Text style={styles.emptyText}>No education added yet. Tap "Add" to include your educational background.</Text>
        ) : (
          education.map((edu, index) => (
            <View key={edu.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.school}</Text>
                <View style={styles.itemActions}>
                  <Pressable 
                    style={styles.iconButton}
                    onPress={() => editEducationItem(index)}
                  >
                    <FileText size={18} color="#4f46e5" />
                  </Pressable>
                  <Pressable 
                    style={styles.iconButton}
                    onPress={() => removeEducation(edu.id)}
                  >
                    <Trash2 size={18} color="#ef4444" />
                  </Pressable>
                </View>
              </View>
              <Text style={styles.itemSubtitle}>{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</Text>
              {(edu.startDate || edu.endDate) && (
                <Text style={styles.itemDate}>{edu.startDate} - {edu.endDate || 'Present'}</Text>
              )}
              {edu.description && (
                <Text style={styles.itemDescription}>{edu.description}</Text>
              )}
            </View>
          ))
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <Pressable 
            style={styles.addButton}
            onPress={() => {
              setEditMode(false);
              setCurrentExperience({
                id: '',
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                description: ''
              });
              setShowExperienceModal(true);
            }}
          >
            <Plus size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
        
        {experience.length === 0 ? (
          <Text style={styles.emptyText}>No work experience added yet. Tap "Add" to include your professional experience.</Text>
        ) : (
          experience.map((exp, index) => (
            <View key={exp.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <View style={styles.itemActions}>
                  <Pressable 
                    style={styles.iconButton}
                    onPress={() => editExperienceItem(index)}
                  >
                    <FileText size={18} color="#4f46e5" />
                  </Pressable>
                  <Pressable 
                    style={styles.iconButton}
                    onPress={() => removeExperience(exp.id)}
                  >
                    <Trash2 size={18} color="#ef4444" />
                  </Pressable>
                </View>
              </View>
              <Text style={styles.itemSubtitle}>{exp.company} {exp.location ? `- ${exp.location}` : ''}</Text>
              {(exp.startDate || exp.endDate) && (
                <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate || 'Present'}</Text>
              )}
              {exp.description && (
                <Text style={styles.itemDescription}>{exp.description}</Text>
              )}
            </View>
          ))
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Pressable 
            style={styles.addButton}
            onPress={() => {
              setEditMode(false);
              setCurrentSkill({
                id: '',
                name: '',
                level: ''
              });
              setShowSkillModal(true);
            }}
          >
            <Plus size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
        
        {skills.length === 0 ? (
          <Text style={styles.emptyText}>No skills added yet. Tap "Add" to include your skills.</Text>
        ) : (
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <View key={skill.id} style={styles.skillItem}>
                <View style={styles.skillContent}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  {skill.level && (
                    <Text style={styles.skillLevel}>{skill.level}</Text>
                  )}
                </View>
                <View style={styles.skillActions}>
                  <Pressable 
                    style={styles.iconButton}
                    onPress={() => editSkillItem(index)}
                  >
                    <FileText size={16} color="#4f46e5" />
                  </Pressable>
                  <Pressable 
                    style={styles.iconButton}
                    onPress={() => removeSkill(skill.id)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.atsScoreContainer}>
        <Award size={24} color="#4f46e5" />
        <View style={styles.atsScoreContent}>
          <Text style={styles.atsScoreTitle}>ATS Score: 85/100</Text>
          <Text style={styles.atsScoreText}>Your resume is highly ATS-friendly. Great job!</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Pressable 
          style={styles.secondaryButton}
          onPress={previewResume}
        >
          <FileText size={20} color="#4f46e5" />
          <Text style={styles.secondaryButtonText}>Preview</Text>
        </Pressable>
        <Pressable 
          style={styles.primaryButton}
          onPress={saveResume}
        >
          <Save size={20} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Save Changes</Text>
        </Pressable>
      </View>
      
      {/* Education Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEducationModal}
        onRequestClose={() => setShowEducationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editMode ? 'Edit Education' : 'Add Education'}</Text>
            <Text style={styles.modalSubtitle}>All fields are optional unless marked with *</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>School/Institution *</Text>
              <TextInput
                style={styles.input}
                value={currentEducation.school}
                onChangeText={(text) => setCurrentEducation({...currentEducation, school: text})}
                placeholder="e.g., Harvard University"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Degree *</Text>
              <TextInput
                style={styles.input}
                value={currentEducation.degree}
                onChangeText={(text) => setCurrentEducation({...currentEducation, degree: text})}
                placeholder="e.g., Bachelor of Science"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Field of Study</Text>
              <TextInput
                style={styles.input}
                value={currentEducation.fieldOfStudy}
                onChangeText={(text) => setCurrentEducation({...currentEducation, fieldOfStudy: text})}
                placeholder="e.g., Computer Science"
              />
            </View>
            
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Start Date</Text>
                <TextInput
                  style={styles.input}
                  value={currentEducation.startDate}
                  onChangeText={(text) => setCurrentEducation({...currentEducation, startDate: text})}
                  placeholder="e.g., Sep 2018"
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>End Date</Text>
                <TextInput
                  style={styles.input}
                  value={currentEducation.endDate}
                  onChangeText={(text) => setCurrentEducation({...currentEducation, endDate: text})}
                  placeholder="e.g., May 2022"
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={currentEducation.description}
                onChangeText={(text) => setCurrentEducation({...currentEducation, description: text})}
                placeholder="e.g., Relevant coursework, achievements, etc."
                multiline
                numberOfLines={4}
              />
            </View>
            
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowEducationModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalPrimaryButton} onPress={addEducation}>
                <Text style={styles.modalPrimaryButtonText}>{editMode ? 'Update' : 'Add'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Experience Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showExperienceModal}
        onRequestClose={() => setShowExperienceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editMode ? 'Edit Experience' : 'Add Experience'}</Text>
            <Text style={styles.modalSubtitle}>All fields are optional unless marked with *</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company/Organization *</Text>
              <TextInput
                style={styles.input}
                value={currentExperience.company}
                onChangeText={(text) => setCurrentExperience({...currentExperience, company: text})}
                placeholder="e.g., Google"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Position/Title *</Text>
              <TextInput
                style={styles.input}
                value={currentExperience.position}
                onChangeText={(text) => setCurrentExperience({...currentExperience, position: text})}
                placeholder="e.g., Software Engineer"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={currentExperience.location}
                onChangeText={(text) => setCurrentExperience({...currentExperience, location: text})}
                placeholder="e.g., Mountain View, CA"
              />
            </View>
            
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Start Date</Text>
                <TextInput
                  style={styles.input}
                  value={currentExperience.startDate}
                  onChangeText={(text) => setCurrentExperience({...currentExperience, startDate: text})}
                  placeholder="e.g., Jan 2020"
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>End Date</Text>
                <TextInput
                  style={styles.input}
                  value={currentExperience.endDate}
                  onChangeText={(text) => setCurrentExperience({...currentExperience, endDate: text})}
                  placeholder="e.g., Present"
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={currentExperience.description}
                onChangeText={(text) => setCurrentExperience({...currentExperience, description: text})}
                placeholder="e.g., Responsibilities, achievements, technologies used, etc."
                multiline
                numberOfLines={4}
              />
            </View>
            
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowExperienceModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalPrimaryButton} onPress={addExperience}>
                <Text style={styles.modalPrimaryButtonText}>{editMode ? 'Update' : 'Add'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Skill Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSkillModal}
        onRequestClose={() => setShowSkillModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editMode ? 'Edit Skill' : 'Add Skill'}</Text>
            <Text style={styles.modalSubtitle}>All fields are optional unless marked with *</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Skill Name *</Text>
              <TextInput
                style={styles.input}
                value={currentSkill.name}
                onChangeText={(text) => setCurrentSkill({...currentSkill, name: text})}
                placeholder="e.g., JavaScript"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Proficiency Level</Text>
              <TextInput
                style={styles.input}
                value={currentSkill.level}
                onChangeText={(text) => setCurrentSkill({...currentSkill, level: text})}
                placeholder="e.g., Expert, Intermediate, Beginner"
              />
            </View>
            
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowSkillModal(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalPrimaryButton} onPress={addSkill}>
                <Text style={styles.modalPrimaryButtonText}>{editMode ? 'Update' : 'Add'}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  section: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    marginLeft: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 16,
  },
  itemCard: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  itemActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 4,
    marginLeft: 8,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#334155',
    marginTop: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  skillLevel: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 6,
  },
  skillActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  atsScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede9fe',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 32,
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
    maxHeight: '90%',
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
    fontStyle: 'italic',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
});