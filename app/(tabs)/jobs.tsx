import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput, Modal, ActivityIndicator } from 'react-native';
import { Plus, Clock, CheckCircle2, XCircle, Info, Search, Filter, MapPin, DollarSign, Briefcase, Star, StarOff } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

type JobStatus = 'applied' | 'interviewing' | 'rejected' | 'saved';

interface Job {
  id: string;
  title: string;
  company: string;
  date: string;
  status: JobStatus;
  notes?: string;
  salary?: string;
  location?: string;
  description?: string;
  requirements?: string[];
  isSaved?: boolean;
}

interface RealJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  posted: string;
  type: string;
  url: string;
  isSaved?: boolean; // Added isSaved property
}

export default function JobsScreen() {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'myJobs' | 'discover'>('myJobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(params.category as string || '');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<RealJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [jobType, setJobType] = useState('');
  
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      date: '2 days ago',
      status: 'applied',
      location: 'Remote',
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      date: 'July 15',
      status: 'interviewing',
      salary: '$120k - $150k',
    },
    {
      id: '3',
      title: 'Frontend Engineer',
      company: 'Big Tech Co',
      date: 'July 10',
      status: 'rejected',
      notes: 'Position filled internally',
    },
  ]);

  const [realJobs, setRealJobs] = useState<RealJob[]>([
    {
      id: '101',
      title: 'Senior React Developer',
      company: 'TechGlobal Inc.',
      location: 'Remote (US)',
      salary: '$130,000 - $160,000',
      description: 'We are looking for a Senior React Developer to join our growing team. You will be responsible for building and maintaining high-performance web applications using React, TypeScript, and modern frontend tools.',
      requirements: [
        'At least 5 years of experience with React',
        'Strong TypeScript skills',
        'Experience with state management (Redux, Context API)',
        'Knowledge of modern frontend build tools'
      ],
      posted: '2 days ago',
      type: 'Full-time',
      url: 'https://example.com/jobs/senior-react-developer',
      isSaved: false
    },
    {
      id: '102',
      title: 'UX/UI Designer',
      company: 'Creative Solutions',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      description: 'Join our design team to create beautiful, intuitive user interfaces for our clients. You will work closely with product managers and developers to deliver exceptional user experiences.',
      requirements: [
        'Portfolio demonstrating UI/UX skills',
        'Experience with Figma or Adobe XD',
        'Understanding of user-centered design principles',
        'Knowledge of design systems'
      ],
      posted: '3 days ago',
      type: 'Full-time',
      url: 'https://example.com/jobs/ux-ui-designer',
      isSaved: false
    },
    {
      id: '103',
      title: 'Data Scientist',
      company: 'AnalyticsPro',
      location: 'Remote',
      salary: '$110,000 - $140,000',
      description: 'We are seeking a Data Scientist to help us extract insights from complex datasets. You will build machine learning models and work with stakeholders to drive data-informed decisions.',
      requirements: [
        'MS or PhD in a quantitative field',
        'Experience with Python, R, and SQL',
        'Knowledge of machine learning algorithms',
        'Strong communication skills'
      ],
      posted: '1 week ago',
      type: 'Full-time',
      url: 'https://example.com/jobs/data-scientist',
      isSaved: false
    },
    {
      id: '104',
      title: 'Product Manager',
      company: 'SaaS Platform Inc.',
      location: 'San Francisco, CA',
      salary: '$125,000 - $155,000',
      description: 'Lead the development of our flagship SaaS product. You will work with engineering, design, and marketing teams to define product strategy and roadmap.',
      requirements: [
        '3+ years of product management experience',
        'Experience with SaaS products',
        'Strong analytical and problem-solving skills',
        'Excellent communication abilities'
      ],
      posted: '5 days ago',
      type: 'Full-time',
      url: 'https://example.com/jobs/product-manager',
      isSaved: false
    },
    {
      id: '105',
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Remote (US)',
      salary: '$115,000 - $145,000',
      description: 'Join our DevOps team to build and maintain our cloud infrastructure. You will automate deployment processes and ensure the reliability and scalability of our systems.',
      requirements: [
        'Experience with AWS or Azure',
        'Knowledge of containerization (Docker, Kubernetes)',
        'Experience with CI/CD pipelines',
        'Infrastructure as Code (Terraform, CloudFormation)'
      ],
      posted: '1 week ago',
      type: 'Full-time',
      url: 'https://example.com/jobs/devops-engineer',
      isSaved: false
    }
  ]);

  const jobCategories = [
    'All',
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Marketing',
    'Business',
    'Agriculture',
    'Engineering',
    'Design'
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(params.category as string);
      setActiveTab('discover');
      searchJobsByCategory(params.category as string);
    }
  }, [params.category]);

  const searchJobsByCategory = (category: string) => {
    setLoading(true);
    
    setTimeout(() => {
      if (category && category !== 'All') {
        const filtered = realJobs.filter(job => {
          if (category === 'Technology') {
            return job.title.includes('Developer') || job.title.includes('Engineer') || job.company.includes('Tech');
          } else if (category === 'Design') {
            return job.title.includes('Designer') || job.title.includes('UX') || job.title.includes('UI');
          } else if (category === 'Business') {
            return job.title.includes('Manager') || job.title.includes('Business') || job.title.includes('Product');
          }
          return true;
        });
        setRealJobs(filtered.length > 0 ? filtered : realJobs);
      }
      setLoading(false);
    }, 1000);
  };

  const handleAddJob = () => {
    Alert.alert(
      'Add New Job',
      'All fields are optional. You can update them later.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add',
          onPress: () => {
            const newJob: Job = {
              id: Date.now().toString(),
              title: 'New Position',
              company: 'Company Name',
              date: 'Just now',
              status: 'applied',
            };
            setJobs([newJob, ...jobs]);
          },
        },
      ],
    );
  };

  const getJobsByStatus = (status: JobStatus) => {
    return jobs.filter(job => job.status === status);
  };

  const handleJobPress = (job: RealJob) => {
    setSelectedJob(job);
    setShowJobDetailModal(true);
  };

  const applyToJob = () => {
    if (!selectedJob) return;
    
    const newJob: Job = {
      id: Date.now().toString(),
      title: selectedJob.title,
      company: selectedJob.company,
      date: 'Just now',
      status: 'applied',
      location: selectedJob.location,
      salary: selectedJob.salary,
    };
    
    setJobs([newJob, ...jobs]);
    
    Alert.alert(
      'Application Submitted',
      `Your application for ${selectedJob.title} at ${selectedJob.company} has been submitted.`,
      [
        {
          text: 'View My Applications',
          onPress: () => {
            setShowJobDetailModal(false);
            setActiveTab('myJobs');
          }
        },
        {
          text: 'Continue Browsing',
          onPress: () => setShowJobDetailModal(false)
        }
      ]
    );
  };

  const saveJob = () => {
    if (!selectedJob) return;
    
    setRealJobs(realJobs.map(job => 
      job.id === selectedJob.id ? {...job, isSaved: !job.isSaved} : job
    ));
    
    setSelectedJob({...selectedJob, isSaved: !selectedJob.isSaved});
    
    Alert.alert(
      selectedJob.isSaved ? 'Job Removed' : 'Job Saved',
      selectedJob.isSaved 
        ? `${selectedJob.title} has been removed from your saved jobs.`
        : `${selectedJob.title} has been saved to your list.`
    );
  };

  const applyFilters = () => {
    setLoading(true);
    
    setTimeout(() => {
      let filtered = [...realJobs];
      
      if (searchQuery) {
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedCategory && selectedCategory !== 'All') {
        filtered = filtered.filter(job => {
          if (selectedCategory === 'Technology') {
            return job.title.includes('Developer') || job.title.includes('Engineer');
          } else if (selectedCategory === 'Design') {
            return job.title.includes('Designer') || job.title.includes('UX') || job.title.includes('UI');
          } else if (selectedCategory === 'Business') {
            return job.title.includes('Manager') || job.title.includes('Business');
          }
          return true;
        });
      }
      
      if (location) {
        filtered = filtered.filter(job => 
          job.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      if (minSalary) {
        filtered = filtered.filter(job => {
          if (!job.salary) return false;
          const salaryNum = parseInt(job.salary.replace(/[^0-9]/g, ''));
          return salaryNum >= parseInt(minSalary);
        });
      }
      
      if (jobType) {
        filtered = filtered.filter(job => 
          job.type.toLowerCase() === jobType.toLowerCase()
        );
      }
      
      setRealJobs(filtered.length > 0 ? filtered : realJobs);
      setShowFilterModal(false);
      setLoading(false);
    }, 1000);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setLocation('');
    setMinSalary('');
    setJobType('');
    setShowFilterModal(false);
    
    setRealJobs([
      {
        id: '101',
        title: 'Senior React Developer',
        company: 'TechGlobal Inc.',
        location: 'Remote (US)',
        salary: '$130,000 - $160,000',
        description: 'We are looking for a Senior React Developer to join our growing team. You will be responsible for building and maintaining high-performance web applications using React, TypeScript, and modern frontend tools.',
        requirements: [
          'At least 5 years of experience with React',
          'Strong TypeScript skills',
          'Experience with state management (Redux, Context API)',
          'Knowledge of modern frontend build tools'
        ],
        posted: '2 days ago',
        type: 'Full-time',
        url: 'https://example.com/jobs/senior-react-developer',
        isSaved: false
      },
      {
        id: '102',
        title: 'UX/UI Designer',
        company: 'Creative Solutions',
        location: 'New York, NY',
        salary: '$90,000 - $120,000',
        description: 'Join our design team to create beautiful, intuitive user interfaces for our clients. You will work closely with product managers and developers to deliver exceptional user experiences.',
        requirements: [
          'Portfolio demonstrating UI/UX skills',
          'Experience with Figma or Adobe XD',
          'Understanding of user-centered design principles',
          'Knowledge of design systems'
        ],
        posted: '3 days ago',
        type: 'Full-time',
        url: 'https://example.com/jobs/ux-ui-designer',
        isSaved: false
      },
      {
        id: '103',
        title: 'Data Scientist',
        company: 'AnalyticsPro',
        location: 'Remote',
        salary: '$110,000 - $140,000',
        description: 'We are seeking a Data Scientist to help us extract insights from complex datasets. You will build machine learning models and work with stakeholders to drive data-informed decisions.',
        requirements: [
          'MS or PhD in a quantitative field',
          'Experience with Python, R, and SQL',
          'Knowledge of machine learning algorithms',
          'Strong communication skills'
        ],
        posted: '1 week ago',
        type: 'Full-time',
        url: 'https://example.com/jobs/data-scientist',
        isSaved: false
      },
      {
        id: '104',
        title: 'Product Manager',
        company: 'SaaS Platform Inc.',
        location: 'San Francisco, CA',
        salary: '$125,000 - $155,000',
        description: 'Lead the development of our flagship SaaS product. You will work with engineering, design, and marketing teams to define product strategy and roadmap.',
        requirements: [
          '3+ years of product management experience',
          'Experience with SaaS products',
          'Strong analytical and problem-solving skills',
          'Excellent communication abilities'
        ],
        posted: '5 days ago',
        type: 'Full-time',
        url: 'https://example.com/jobs/product-manager',
        isSaved: false
      },
      {
        id: '105',
        title: 'DevOps Engineer',
        company: 'CloudTech Solutions',
        location: 'Remote (US)',
        salary: '$115,000 - $145,000',
        description: 'Join our DevOps team to build and maintain our cloud infrastructure. You will automate deployment processes and ensure the reliability and scalability of our systems.',
        requirements: [
          'Experience with AWS or Azure',
          'Knowledge of containerization (Docker, Kubernetes)',
          'Experience with CI/CD pipelines',
          'Infrastructure as Code (Terraform, CloudFormation)'
        ],
        posted: '1 week ago',
        type: 'Full-time',
        url: 'https://example.com/jobs/devops-engineer',
        isSaved: false
      }
    ]);
  };

  const JobCard = ({ job }: { job: Job }) => {
    const getStatusIcon = () => {
      switch (job.status) {
        case 'applied':
          return <Clock size={16} color="#64748b" />;
        case 'interviewing':
          return <CheckCircle2 size={16} color="#64748b" />;
        case 'rejected':
          return <XCircle size={16} color="#64748b" />;
        case 'saved':
          return <Star size={16} color="#64748b" />;
      }
    };

    return (
      <Pressable 
        style={styles.jobCard}
        onPress={() => {
          Alert.alert(
            'Job Details',
            'All fields can be updated or left empty.',
            [
              {
                text: 'Close',
                style: 'cancel',
              },
              {
                text: 'Edit',
                onPress: () => {
                  // Navigate to edit screen
                },
              },
            ],
          );
        }}
      >
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.companyName}>{job.company}</Text>
        
        {job.location && (
          <Text style={styles.optionalField}>📍 {job.location}</Text>
        )}
        {job.salary && (
          <Text style={styles.optionalField}>💰 {job.salary}</Text>
        )}
        {job.notes && (
          <Text style={styles.optionalField}>📝 {job.notes}</Text>
        )}
        
        <View style={styles.jobMeta}>
          {getStatusIcon()}
          <Text style={styles.jobDate}>{job.date}</Text>
        </View>
      </Pressable>
    );
  };

  const RealJobCard = ({ job }: { job: RealJob }) => {
    return (
      <Pressable 
        style={styles.realJobCard}
        onPress={() => handleJobPress(job)}
      >
        <View style={styles.jobHeader}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          {job.isSaved ? (
            <Star size={20} color="#4f46e5" fill="#4f46e5" />
          ) : null}
        </View>
        <Text style={styles.companyName}>{job.company}</Text>
        
        <View style={styles.jobDetailRow}>
          <View style={styles.jobDetailItem}>
            <MapPin size={14} color="#64748b" />
            <Text style={styles.jobDetailText}>{job.location}</Text>
          </View>
          
          {job.salary && (
            <View style={styles.jobDetailItem}>
              <DollarSign size={14} color="#64748b" />
              <Text style={styles.jobDetailText}>{job.salary}</Text>
            </View>
          )}
          
          <View style={styles.jobDetailItem}>
            <Briefcase size={14} color="#64748b" />
            <Text style={styles.jobDetailText}>{job.type}</Text>
          </View>
        </View>
        
        <View style={styles.jobMeta}>
          <Text style={styles.jobDate}>Posted {job.posted}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Job Applications</Text>
        {activeTab === 'myJobs' && (
          <Pressable style={styles.addButton} onPress={handleAddJob}>
            <Plus size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Add Job</Text>
          </Pressable>
        )}
      </View>

      {showInfoBanner && (
        <Pressable 
          style={styles.infoBanner}
          onPress={() => setShowInfoBanner(false)}
        >
          <Info size={16} color="#1e40af" />
          <Text style={styles.infoText}>
            All job details are optional. Tap to dismiss
          </Text>
        </Pressable>
      )}

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'myJobs' && styles.activeTab]}
          onPress={() => setActiveTab('myJobs')}
        >
          <Text style={[styles.tabText, activeTab === 'myJobs' && styles.activeTabText]}>
            My Applications
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'discover' && styles.activeTab]}
          onPress={() => setActiveTab('discover')}
        >
          <Text style={[styles.tabText, activeTab === 'discover' && styles.activeTabText]}>
            Discover Jobs
          </Text>
        </Pressable>
      </View>

      {activeTab === 'myJobs' ? (
        <ScrollView style={styles.content}>
          <View style={styles.kanbanColumn}>
            <Text style={styles.columnTitle}>Applied ({getJobsByStatus('applied').length})</Text>
            {getJobsByStatus('applied').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </View>

          <View style={styles.kanbanColumn}>
            <Text style={styles.columnTitle}>Interviewing ({getJobsByStatus('interviewing').length})</Text>
            {getJobsByStatus('interviewing').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </View>

          <View style={styles.kanbanColumn}>
            <Text style={styles.columnTitle}>Rejected ({getJobsByStatus('rejected').length})</Text>
            {getJobsByStatus('rejected').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.discoverContainer}>
          <View style={styles.searchFilterContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#64748b" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search job title or company..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <Pressable 
              style={styles.filterButton}
              onPress={() => setShowFilterModal(true)}
            >
              <Filter size={20} color="#4f46e5" />
            </Pressable>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {jobCategories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipSelected
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  searchJobsByCategory(category);
                }}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.categoryChipTextSelected
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4f46e5" />
              <Text style={styles.loadingText}>Finding the best jobs for you...</Text>
            </View>
          ) : (
            <ScrollView style={styles.jobsList}>
              {realJobs.length > 0 ? (
                realJobs.map(job => (
                  <RealJobCard key={job.id} job={job} />
                ))
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No jobs found matching your criteria</Text>
                  <Pressable 
                    style={styles.resetButton}
                    onPress={resetFilters}
                  >
                    <Text style={styles.resetButtonText}>Reset Filters</Text>
                  </Pressable>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Jobs</Text>
            <Text style={styles.modalSubtitle}>Find the perfect job for you</Text>
            
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Remote, New York, San Francisco"
              value={location}
              onChangeText={setLocation}
            />
            
            <Text style={styles.inputLabel}>Minimum Salary</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 100000"
              value={minSalary}
              onChangeText={setMinSalary}
              keyboardType="numeric"
            />
            
            <Text style={styles.inputLabel}>Job Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {jobTypes.map((type) => (
                <Pressable
                  key={type}
                  style={[
                    styles.categoryChip,
                    jobType === type && styles.categoryChipSelected
                  ]}
                  onPress={() => setJobType(type)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      jobType === type && styles.categoryChipTextSelected
                    ]}
                  >
                    {type}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={resetFilters}
              >
                <Text style={styles.modalSecondaryButtonText}>Reset</Text>
              </Pressable>
              <Pressable style={styles.modalPrimaryButton} onPress={applyFilters}>
                <Text style={styles.modalPrimaryButtonText}>Apply Filters</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showJobDetailModal && selectedJob !== null}
        onRequestClose={() => setShowJobDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.jobDetailModalContent}>
            <ScrollView>
              <View style={styles.jobDetailHeader}>
                <Text style={styles.jobDetailTitle}>{selectedJob?.title}</Text>
                <Text style={styles.jobDetailCompany}>{selectedJob?.company}</Text>
                
                <View style={styles.jobDetailInfoContainer}>
                  <View style={styles.jobDetailInfo}>
                    <MapPin size={16} color="#64748b" />
                    <Text style={styles.jobDetailInfoText}>{selectedJob?.location}</Text>
                  </View>
                  
                  {selectedJob?.salary && (
                    <View style={styles.jobDetailInfo}>
                      <DollarSign size={16} color="#64748b" />
                      <Text style={styles.jobDetailInfoText}>{selectedJob?.salary}</Text>
                    </View>
                  )}
                  
                  <View style={styles.jobDetailInfo}>
                    <Briefcase size={16} color="#64748b" />
                    <Text style={styles.jobDetailInfoText}>{selectedJob?.type}</Text>
                  </View>
                  
                  <View style={styles.jobDetailInfo}>
                    <Clock size={16} color="#64748b" />
                    <Text style={styles.jobDetailInfoText}>Posted {selectedJob?.posted}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.jobDetailSection}>
                <Text style={styles.jobDetailSectionTitle}>Description</Text>
                <Text style={styles.jobDetailSectionText}>{selectedJob?.description}</Text>
              </View>
              
              <View style={styles.jobDetailSection}>
                <Text style={styles.jobDetailSectionTitle}>Requirements</Text>
                {selectedJob?.requirements.map((req, index) => (
                  <View key={index} style={styles.requirementItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.requirementText}>{req}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.jobDetailSection}>
                <Text style={styles.jobDetailSectionTitle}>AI Resume Match</Text>
                <View style={styles.matchScoreContainer}>
                  <View style={styles.matchScoreCircle}>
                    <Text style={styles.matchScoreNumber}>82%</Text>
                  </View>
                  <View style={styles.matchScoreInfo}>
                    <Text style={styles.matchScoreTitle}>Your resume matches this job</Text>
                    <Text style={styles.matchScoreText}>
                      Our AI analysis shows your resume is a strong match for this position.
                      Consider highlighting your React and TypeScript skills.
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.jobDetailActions}>
              <Pressable
                style={styles.saveJobButton}
                onPress={saveJob}
              >
                {selectedJob?.isSaved ? (
                  <>
                    <StarOff size={20} color="#64748b" />
                    <Text style={styles.saveJobButtonText}>Unsave</Text>
                  </>
                ) : (
                  <>
                    <Star size={20} color="#64748b" />
                    <Text style={styles.saveJobButtonText}>Save</Text>
                  </>
                )}
              </Pressable>
              <Pressable style={styles.applyJobButton} onPress={applyToJob}>
                <Text style={styles.applyJobButtonText}>Apply Now</Text>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  infoText: {
    marginLeft: 8,
    color: '#1e40af',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4f46e5',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#4f46e5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  kanbanColumn: {
    marginBottom: 24,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  jobCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  optionalField: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  jobDate: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
  },
  discoverContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1e293b',
  },
  filterButton: {
    backgroundColor: '#ede9fe',
    padding: 10,
    borderRadius: 8,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  jobsList: {
    flex: 1,
    padding: 16,
  },
  realJobCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobDetailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 12,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  jobDetailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#64748b',
  },
  noResultsContainer: {
    padding: 24,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#ede9fe',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#4f46e5',
    fontWeight: '500',
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
  jobDetailModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    height: '90%',
  },
  jobDetailHeader: {
    marginBottom: 24,
  },
  jobDetailTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  jobDetailCompany: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  jobDetailInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  jobDetailInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  jobDetailInfoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#64748b',
  },
  jobDetailSection: {
    marginBottom: 24,
  },
  jobDetailSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  jobDetailSectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  requirementItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#64748b',
    marginRight: 8,
    marginTop: 2,
  },
  requirementText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  matchScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
  },
  matchScoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ede9fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  matchScoreNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4f46e5',
  },
  matchScoreInfo: {
    flex: 1,
  },
  matchScoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  matchScoreText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  jobDetailActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  saveJobButton: {
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
  saveJobButtonText: {
    marginLeft: 8,
    color: '#1e293b',
    fontWeight: '600',
    fontSize: 16,
  },
  applyJobButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 2,
    alignItems: 'center',
  },
  applyJobButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
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
});