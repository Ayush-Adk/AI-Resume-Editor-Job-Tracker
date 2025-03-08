import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, Modal, ViewStyle } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Plus, FileText, Award, Edit, Trash2, Download, Eye } from 'lucide-react-native';

// Define interfaces for each section
interface Education {
  institution: string;
  degree: string;
  gpa: string;
  startDate: string;
  endDate: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  name: string;
  technologies: string;
  description: string;
}

// Define interface for template style
interface TemplateStyle {
  backgroundColor: string;
  color: string;
  fontFamily: string;
  borderStyle: 'solid' | 'dotted' | 'dashed';
}

// Sample resume data
const sampleResume = {
  fullName: 'Ayush Adhikari',
  email: 'adhikariaayush633@gmail.com',
  phone: '365-880-6171',
  location: 'Ontario, Canada',
  summary: 'Computer Programming and Analysis student with a 3.80 GPA at Niagara College, skilled in C#, Python, SQL, JavaScript, TypeScript, and modern frameworks like ReactJS and NodeJS. Experienced in cloud technologies (GCP, Azure) and DevOps tools.',
  education: [
    { institution: 'Niagara College', degree: 'Computer Programming and Analysis', gpa: '3.80', startDate: 'September 2023', endDate: 'Present' }
  ],
  skills: [
    'C# (Proficient)', 'Python', 'SQL', 'JavaScript', 'TypeScript', 'Git', 'ReactJS', 'NodeJS', '.NET Frameworks',
    'GCP', 'Azure', 'Microsoft Azure DevOps', 'Google Play Console', 'Docker', 'Render',
    'Jira', 'Microsoft 365', 'Agile Scrum', 'Postman', 'SharePoint', 'Microsoft Power Platform', 'Linux', 'Windows'
  ],
  experience: [
    {
      title: 'Technical Analyst',
      company: 'Niagara College IT Services',
      location: 'Welland, ON',
      startDate: 'January 2024',
      endDate: 'November 2024',
      description: 'Collaborated on data migration projects with Azure DevOps, recognized by Microsoft for outstanding team achievement in a hackathon, and streamlined processes with SharePoint and Power Automate.'
    },
    {
      title: 'Web Application Developer',
      company: 'Upwork/Freelancer',
      location: 'St. Catharines, ON',
      startDate: 'September 2023',
      endDate: 'Present',
      description: 'Enhanced web applications with React, Angular, TypeScript, and .NET, reduced data retrieval times by 20% with SQL optimization.'
    },
    {
      title: 'Software Developer Intern',
      company: 'Daraz',
      location: 'Remote, ON',
      startDate: 'May 2023',
      endDate: 'August 2023',
      description: 'Developed a mobile-first web app with React Native for Web and optimized backend with ExpressJS and Firebase Functions.'
    }
  ],
  projects: [
    {
      name: 'Event Management System',
      technologies: 'React, TypeScript, Node.js, Tailwind CSS, SQL',
      description: 'Developed a system with real-time updates, secure authentication, and responsive design using Supabase.'
    },
    {
      name: 'Gym Management Application',
      technologies: 'C#, ASP.NET Core (MVC), SQLite, JavaScript',
      description: 'Built an app for scheduling and user registration with real-time UI updates.'
    },
    {
      name: 'Fitness App',
      technologies: 'React, TypeScript, ASP.NET Core (MVC), SQLite',
      description: 'Created a fitness app with scheduling, registration, and live data updates.'
    }
  ]
};

export default function CreateResumeScreen() {
  const router = useRouter();
  const [resumeName, setResumeName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Sleek, contemporary design with a focus on readability.', bgColor: '#e6f0fa', textColor: '#0056b3' },
    { id: 'professional', name: 'Professional', description: 'Classic layout for formal industries.', bgColor: '#e6ffe6', textColor: '#006600' },
    { id: 'creative', name: 'Creative', description: 'Bold design for showcasing creativity.', bgColor: '#fff0e6', textColor: '#cc5200' },
    { id: 'minimal', name: 'Minimal', description: 'Clean and concise for a straightforward look.', bgColor: '#f2e6ff', textColor: '#6600cc' },
  ];

  const autofillWithAI = () => {
    setFullName(sampleResume.fullName);
    setEmail(sampleResume.email);
    setPhone(sampleResume.phone);
    setLocation(sampleResume.location);
    setSummary(sampleResume.summary);
    setEducation(sampleResume.education);
    setSkills(sampleResume.skills);
    setExperience(sampleResume.experience);
    setProjects(sampleResume.projects);
    setResumeName('Ayush Adhikari Resume');
    Alert.alert('Success', 'Resume autofilled with sample data.');
  };

  const handleCreateResume = () => {
    if (!resumeName.trim() || !fullName.trim()) {
      Alert.alert('Error', 'Resume name and full name are required.');
      return;
    }
    const resumeData = { resumeName, fullName, email, phone, location, summary, education, skills, experience, projects, template: selectedTemplate };
    Alert.alert(
      'Success',
      `Resume "${resumeName}" created successfully.`,
      [{ text: 'Edit Now', onPress: () => router.push({ pathname: 'edit', params: { id: 'new', data: JSON.stringify(resumeData) } }) }]
    );
  };

  const handleViewResume = () => {
    if (!resumeName.trim() || !fullName.trim()) {
      Alert.alert('Error', 'Please enter a resume name and full name to preview.');
      return;
    }
    setShowPreviewModal(true);
  };

  const handleDownloadPDF = () => {
    if (!resumeName.trim()) {
      Alert.alert('Error', 'Please enter a resume name before downloading.');
      return;
    }
    Alert.alert('Download', `Downloading "${resumeName}" as PDF in ${selectedTemplate} style. (Simulated)`);
  };

  const addOrEditSection = (section: string, data: Education | Experience | Project) => {
    if (editIndex !== null) {
      if (section === 'education') setEducation(education.map((item, i) => (i === editIndex ? data as Education : item)));
      if (section === 'experience') setExperience(experience.map((item, i) => (i === editIndex ? data as Experience : item)));
      if (section === 'projects') setProjects(projects.map((item, i) => (i === editIndex ? data as Project : item)));
      setEditIndex(null);
    } else {
      if (section === 'education') setEducation([...education, data as Education]);
      if (section === 'experience') setExperience([...experience, data as Experience]);
      if (section === 'projects') setProjects([...projects, data as Project]);
    }
    setEditSection(null);
  };

  const deleteSectionItem = (section: string, index: number) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (section === 'education') setEducation(education.filter((_, i) => i !== index));
          if (section === 'experience') setExperience(experience.filter((_, i) => i !== index));
          if (section === 'projects') setProjects(projects.filter((_, i) => i !== index));
        }
      }
    ]);
  };

  const getTemplateStyle = (templateId: string): TemplateStyle => {
    const template = templates.find(t => t.id === templateId);
    return {
      backgroundColor: template?.bgColor || '#fff',
      color: template?.textColor || '#333',
      fontFamily: templateId === 'modern' ? 'Arial' : templateId === 'professional' ? 'Times New Roman' : templateId === 'creative' ? 'Comic Sans MS' : 'Helvetica',
      borderStyle: templateId === 'creative' ? 'dashed' : 'solid',
    };
  };

  const getTemplatePreview = (templateId: string) => {
    const style = getTemplateStyle(templateId);
    return (
      <View style={[styles.templatePreview, { backgroundColor: style.backgroundColor, borderColor: style.color, borderStyle: style.borderStyle }]}>
        <FileText size={32} color={style.color} />
        <Text style={[styles.templateName, { color: style.color }]}>{templates.find(t => t.id === templateId)?.name}</Text>
      </View>
    );
  };

  const renderPreview = () => {
    const style = getTemplateStyle(selectedTemplate);
    return (
      <ScrollView style={[styles.previewContainer, { backgroundColor: style.backgroundColor }]}>
        <Text style={[styles.previewTitle, { color: style.color }]}>{resumeName || 'Your Resume'}</Text>
        <Text style={[styles.previewSubtitle, { color: style.color }]}>{fullName}</Text>
        <Text style={[styles.previewText, { color: style.color }]}>{email} | {phone} | {location}</Text>
        {summary && <Text style={[styles.previewSectionTitle, { color: style.color }]}>Summary</Text>}
        {summary && <Text style={[styles.previewText, { color: style.color }]}>{summary}</Text>}
        
        {education.length > 0 && <Text style={[styles.previewSectionTitle, { color: style.color }]}>Education</Text>}
        {education.map((edu, index) => (
          <View key={index} style={styles.previewItem}>
            <Text style={[styles.previewText, { color: style.color }]}>{edu.degree} - {edu.institution}</Text>
            <Text style={[styles.previewText, { color: style.color }]}>{edu.startDate} - {edu.endDate} | GPA: {edu.gpa}</Text>
          </View>
        ))}

        {skills.length > 0 && <Text style={[styles.previewSectionTitle, { color: style.color }]}>Skills</Text>}
        {skills.length > 0 && <Text style={[styles.previewText, { color: style.color }]}>{skills.join(', ')}</Text>}

        {experience.length > 0 && <Text style={[styles.previewSectionTitle, { color: style.color }]}>Experience</Text>}
        {experience.map((exp, index) => (
          <View key={index} style={styles.previewItem}>
            <Text style={[styles.previewText, { color: style.color }]}>{exp.title} - {exp.company}</Text>
            <Text style={[styles.previewText, { color: style.color }]}>{exp.startDate} - {exp.endDate} | {exp.location}</Text>
            <Text style={[styles.previewText, { color: style.color }]}>{exp.description}</Text>
          </View>
        ))}

        {projects.length > 0 && <Text style={[styles.previewSectionTitle, { color: style.color }]}>Projects</Text>}
        {projects.map((proj, index) => (
          <View key={index} style={styles.previewItem}>
            <Text style={[styles.previewText, { color: style.color }]}>{proj.name}</Text>
            <Text style={[styles.previewText, { color: style.color }]}>Technologies: {proj.technologies}</Text>
            <Text style={[styles.previewText, { color: style.color }]}>{proj.description}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Your Resume</Text>
        <Text style={styles.subtitle}>Build a professional resume with ease.</Text>
        <Pressable style={styles.autofillButton} onPress={autofillWithAI}>
          <Text style={styles.autofillButtonText}>Autofill with AI</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Resume Name *<Text style={styles.required}> (required)</Text></Text>
          <TextInput style={styles.input} value={resumeName} onChangeText={setResumeName} placeholder="e.g., Software Engineer Resume" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *<Text style={styles.required}> (required)</Text></Text>
          <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="e.g., John Doe" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="e.g., john.doe@example.com" keyboardType="email-address" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="e.g., (123) 456-7890" keyboardType="phone-pad" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="e.g., New York, NY" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Professional Summary</Text>
          <TextInput style={[styles.input, styles.textArea]} value={summary} onChangeText={setSummary} placeholder="Brief summary..." multiline numberOfLines={4} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {education.length === 0 && <Text style={styles.emptyText}>No education entries yet.</Text>}
        {education.map((edu, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{edu.degree}</Text>
            <Text style={styles.itemSubtitle}>{edu.institution} | {edu.startDate} - {edu.endDate} | GPA: {edu.gpa}</Text>
            <View style={styles.itemActions}>
              <Pressable onPress={() => { setEditSection('education'); setEditIndex(index); }}><Edit size={18} color="#007bff" /></Pressable>
              <Pressable onPress={() => deleteSectionItem('education', index)}><Trash2 size={18} color="#dc3545" /></Pressable>
            </View>
          </View>
        ))}
        <Pressable style={styles.addButton} onPress={() => setEditSection('education')}>
          <Plus size={18} color="#007bff" /><Text style={styles.addButtonText}>Add Education</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={skills.join(', ')}
          onChangeText={(text) => setSkills(text.split(', ').filter(s => s.trim()))}
          placeholder="e.g., JavaScript, Python, SQL (separate with commas)"
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.length === 0 && <Text style={styles.emptyText}>No experience entries yet.</Text>}
        {experience.map((exp, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{exp.title}</Text>
            <Text style={styles.itemSubtitle}>{exp.company} | {exp.location}</Text>
            <Text style={styles.itemSubtitle}>{exp.startDate} - {exp.endDate}</Text>
            <Text style={styles.itemDescription}>{exp.description}</Text>
            <View style={styles.itemActions}>
              <Pressable onPress={() => { setEditSection('experience'); setEditIndex(index); }}><Edit size={18} color="#007bff" /></Pressable>
              <Pressable onPress={() => deleteSectionItem('experience', index)}><Trash2 size={18} color="#dc3545" /></Pressable>
            </View>
          </View>
        ))}
        <Pressable style={styles.addButton} onPress={() => setEditSection('experience')}>
          <Plus size={18} color="#007bff" /><Text style={styles.addButtonText}>Add Experience</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {projects.length === 0 && <Text style={styles.emptyText}>No project entries yet.</Text>}
        {projects.map((proj, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{proj.name}</Text>
            <Text style={styles.itemSubtitle}>Technologies: {proj.technologies}</Text>
            <Text style={styles.itemDescription}>{proj.description}</Text>
            <View style={styles.itemActions}>
              <Pressable onPress={() => { setEditSection('projects'); setEditIndex(index); }}><Edit size={18} color="#007bff" /></Pressable>
              <Pressable onPress={() => deleteSectionItem('projects', index)}><Trash2 size={18} color="#dc3545" /></Pressable>
            </View>
          </View>
        ))}
        <Pressable style={styles.addButton} onPress={() => setEditSection('projects')}>
          <Plus size={18} color="#007bff" /><Text style={styles.addButtonText}>Add Project</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Template</Text>
        <Pressable style={styles.templateSelector} onPress={() => setShowTemplateModal(true)}>
          {getTemplatePreview(selectedTemplate)}
          <View style={styles.templateInfo}>
            <Text style={styles.selectedTemplateName}>{templates.find(t => t.id === selectedTemplate)?.name}</Text>
            <Text style={styles.templateDescription}>{templates.find(t => t.id === selectedTemplate)?.description}</Text>
            <Text style={styles.changeTemplateText}>Change Template</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.viewButton} onPress={handleViewResume}>
          <Eye size={20} color="#fff" /><Text style={styles.viewButtonText}>View Resume</Text>
        </Pressable>
        <Pressable style={styles.createButton} onPress={handleCreateResume}>
          <Plus size={20} color="#fff" /><Text style={styles.createButtonText}>Create Resume</Text>
        </Pressable>
        <Pressable style={styles.downloadButton} onPress={handleDownloadPDF}>
          <Download size={20} color="#fff" /><Text style={styles.downloadButtonText}>Download PDF</Text>
        </Pressable>
      </View>

      {editSection && (
        <Modal animationType="slide" transparent={true} visible={!!editSection} onRequestClose={() => setEditSection(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{editIndex !== null ? `Edit ${editSection}` : `Add ${editSection}`}</Text>
              {editSection === 'education' && (
                <EducationForm initialData={editIndex !== null ? education[editIndex] : {}} onSave={(data: Education) => addOrEditSection('education', data)} onCancel={() => setEditSection(null)} />
              )}
              {editSection === 'experience' && (
                <ExperienceForm initialData={editIndex !== null ? experience[editIndex] : {}} onSave={(data: Experience) => addOrEditSection('experience', data)} onCancel={() => setEditSection(null)} />
              )}
              {editSection === 'projects' && (
                <ProjectForm initialData={editIndex !== null ? projects[editIndex] : {}} onSave={(data: Project) => addOrEditSection('projects', data)} onCancel={() => setEditSection(null)} />
              )}
            </View>
          </View>
        </Modal>
      )}

      <Modal animationType="slide" transparent={true} visible={showTemplateModal} onRequestClose={() => setShowTemplateModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Template</Text>
            <ScrollView style={styles.templateList}>
              {templates.map((template) => (
                <Pressable key={template.id} style={[styles.templateItem, selectedTemplate === template.id && styles.selectedTemplateItem]} onPress={() => { setSelectedTemplate(template.id); setShowTemplateModal(false); }}>
                  {getTemplatePreview(template.id)}
                  <View style={styles.templateItemInfo}>
                    <Text style={styles.templateItemName}>{template.name}</Text>
                    <Text style={styles.templateItemDescription}>{template.description}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable style={styles.closeModalButton} onPress={() => setShowTemplateModal(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={showPreviewModal} onRequestClose={() => setShowPreviewModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.previewModalContent}>
            <Text style={styles.modalTitle}>Resume Preview ({templates.find(t => t.id === selectedTemplate)?.name})</Text>
            {renderPreview()}
            <Pressable style={styles.closeModalButton} onPress={() => setShowPreviewModal(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const EducationForm = ({ initialData, onSave, onCancel }: { initialData: Partial<Education>; onSave: (data: Education) => void; onCancel: () => void }) => {
  const [institution, setInstitution] = useState(initialData.institution || '');
  const [degree, setDegree] = useState(initialData.degree || '');
  const [gpa, setGpa] = useState(initialData.gpa || '');
  const [startDate, setStartDate] = useState(initialData.startDate || '');
  const [endDate, setEndDate] = useState(initialData.endDate || '');

  const handleSave = () => {
    if (!institution || !degree) {
      Alert.alert('Error', 'Institution and degree are required.');
      return;
    }
    onSave({ institution, degree, gpa, startDate, endDate });
  };

  return (
    <View>
      <TextInput style={styles.input} value={institution} onChangeText={setInstitution} placeholder="Institution *" />
      <TextInput style={styles.input} value={degree} onChangeText={setDegree} placeholder="Degree *" />
      <TextInput style={styles.input} value={gpa} onChangeText={setGpa} placeholder="GPA" />
      <TextInput style={styles.input} value={startDate} onChangeText={setStartDate} placeholder="Start Date" />
      <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} placeholder="End Date" />
      <View style={styles.modalActions}>
        <Pressable style={styles.modalButton} onPress={handleSave}><Text style={styles.modalButtonText}>Save</Text></Pressable>
        <Pressable style={styles.modalButtonSecondary} onPress={onCancel}><Text style={styles.modalButtonTextSecondary}>Cancel</Text></Pressable>
      </View>
    </View>
  );
};

const ExperienceForm = ({ initialData, onSave, onCancel }: { initialData: Partial<Experience>; onSave: (data: Experience) => void; onCancel: () => void }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [company, setCompany] = useState(initialData.company || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [startDate, setStartDate] = useState(initialData.startDate || '');
  const [endDate, setEndDate] = useState(initialData.endDate || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSave = () => {
    if (!title || !company) {
      Alert.alert('Error', 'Title and company are required.');
      return;
    }
    onSave({ title, company, location, startDate, endDate, description });
  };

  return (
    <View>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title *" />
      <TextInput style={styles.input} value={company} onChangeText={setCompany} placeholder="Company *" />
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Location" />
      <TextInput style={styles.input} value={startDate} onChangeText={setStartDate} placeholder="Start Date" />
      <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} placeholder="End Date" />
      <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Description" multiline />
      <View style={styles.modalActions}>
        <Pressable style={styles.modalButton} onPress={handleSave}><Text style={styles.modalButtonText}>Save</Text></Pressable>
        <Pressable style={styles.modalButtonSecondary} onPress={onCancel}><Text style={styles.modalButtonTextSecondary}>Cancel</Text></Pressable>
      </View>
    </View>
  );
};

const ProjectForm = ({ initialData, onSave, onCancel }: { initialData: Partial<Project>; onSave: (data: Project) => void; onCancel: () => void }) => {
  const [name, setName] = useState(initialData.name || '');
  const [technologies, setTechnologies] = useState(initialData.technologies || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSave = () => {
    if (!name) {
      Alert.alert('Error', 'Project name is required.');
      return;
    }
    onSave({ name, technologies, description });
  };

  return (
    <View>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Project Name *" />
      <TextInput style={styles.input} value={technologies} onChangeText={setTechnologies} placeholder="Technologies" />
      <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Description" multiline />
      <View style={styles.modalActions}>
        <Pressable style={styles.modalButton} onPress={handleSave}><Text style={styles.modalButtonText}>Save</Text></Pressable>
        <Pressable style={styles.modalButtonSecondary} onPress={onCancel}><Text style={styles.modalButtonTextSecondary}>Cancel</Text></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7fb' },
  contentContainer: { paddingBottom: 20 },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 12, textAlign: 'center' },
  autofillButton: { backgroundColor: '#28a745', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, elevation: 2 },
  autofillButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  section: { marginTop: 20, padding: 20, backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '500', color: '#444', marginBottom: 6 },
  required: { color: '#dc3545', fontSize: 12 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, color: '#333' },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  itemCard: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  itemDescription: { fontSize: 14, color: '#444', marginTop: 4 },
  itemActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  addButton: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  addButtonText: { color: '#007bff', fontWeight: '600', fontSize: 14, marginLeft: 8 },
  templateSelector: { flexDirection: 'row', backgroundColor: '#f9f9f9', borderRadius: 10, padding: 15, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  templatePreview: { width: 90, height: 110, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1 },
  templateName: { fontSize: 14, marginTop: 8, fontWeight: '500' },
  templateInfo: { flex: 1 },
  selectedTemplateName: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 4 },
  templateDescription: { fontSize: 14, color: '#666', marginBottom: 6 },
  changeTemplateText: { fontSize: 14, color: '#007bff', fontWeight: '500' },
  actions: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd' },
  viewButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#17a2b8', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 8, elevation: 2 },
  viewButtonText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  createButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007bff', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 8, elevation: 2 },
  createButtonText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  downloadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#28a745', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 8, elevation: 2 },
  downloadButtonText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%', maxHeight: '80%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 5 },
  previewModalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '95%', height: '90%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 5 },
  modalTitle: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 15, textAlign: 'center' },
  templateList: { marginBottom: 15 },
  templateItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, marginBottom: 10, backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee' },
  selectedTemplateItem: { backgroundColor: '#e6f0fa', borderColor: '#007bff' },
  templateItemInfo: { flex: 1 },
  templateItemName: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  templateItemDescription: { fontSize: 14, color: '#666' },
  closeModalButton: { backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  closeModalButtonText: { color: '#333', fontWeight: '600', fontSize: 16 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  modalButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, flex: 1, marginRight: 10, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  modalButtonSecondary: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, flex: 1, alignItems: 'center' },
  modalButtonTextSecondary: { color: '#333', fontWeight: '600', fontSize: 16 },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 10 },
  previewContainer: { flex: 1, padding: 15 },
  previewTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  previewSubtitle: { fontSize: 18, fontWeight: '600', marginBottom: 5, textAlign: 'center' },
  previewSectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  previewText: { fontSize: 14, marginBottom: 5 },
  previewItem: { marginBottom: 10 },
});