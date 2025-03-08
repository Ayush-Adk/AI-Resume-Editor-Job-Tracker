import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { User, Bell, Moon, Lock, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<boolean | null>(null);
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(true);

  const handleLogout = () => {
    router.replace('/'); // Root route, no change needed
  };

  const handleChangePassword = () => {
    router.push('../change-password'); // Relative path: go up from (tabs) to root, then to change-password
  };

  const handleHelpCenter = () => {
    router.push('../help'); // Relative path: go up from (tabs) to root, then to help
  };

  const handleProfileEdit = () => {
    router.push('../profile/edit'); // Relative path: go up from (tabs) to root, then to profile/edit
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        {showHint && (
          <Pressable 
            style={styles.hintBanner}
            onPress={() => setShowHint(false)}
          >
            <Text style={styles.hintText}>All settings are optional. Tap to dismiss</Text>
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.content}>
        <Pressable 
          style={styles.profileSection}
          onPress={handleProfileEdit}
        >
          <View style={styles.profilePicture}>
            <User size={40} color="#64748b" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
            <Text style={styles.optionalText}>(Optional) Tap to customize profile</Text>
          </View>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Text style={styles.sectionSubtitle}>All preferences are optional</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color="#64748b" />
              <View>
                <Text style={styles.settingText}>Notifications</Text>
                <Text style={styles.settingDescription}>Optional: Receive updates about your applications</Text>
              </View>
            </View>
            <Switch
              value={notifications ?? false}
              onValueChange={(value) => setNotifications(value)}
              trackColor={{ false: '#e2e8f0', true: '#818cf8' }}
              thumbColor={notifications ? '#4f46e5' : '#ffffff'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Moon size={20} color="#64748b" />
              <View>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Text style={styles.settingDescription}>Optional: Switch between light and dark themes</Text>
              </View>
            </View>
            <Switch
              value={darkMode ?? false}
              onValueChange={(value) => setDarkMode(value)}
              trackColor={{ false: '#e2e8f0', true: '#818cf8' }}
              thumbColor={darkMode ? '#4f46e5' : '#ffffff'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <Text style={styles.sectionSubtitle}>Optional security features</Text>
          
          <Pressable 
            style={styles.settingItem}
            onPress={handleChangePassword}
          >
            <View style={styles.settingLeft}>
              <Lock size={20} color="#64748b" />
              <View>
                <Text style={styles.settingText}>Change Password</Text>
                <Text style={styles.settingDescription}>Optional: Update your account password</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <Pressable 
            style={styles.settingItem}
            onPress={handleHelpCenter}
          >
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color="#64748b" />
              <View>
                <Text style={styles.settingText}>Help Center</Text>
                <Text style={styles.settingDescription}>Get help with using the app</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>

        <Pressable 
          style={[styles.settingItem, styles.logoutButton]}
          onPress={handleLogout}
        >
          <View style={styles.settingLeft}>
            <LogOut size={20} color="#ef4444" />
            <Text style={[styles.settingText, styles.logoutText]}>Log Out</Text>
          </View>
        </Pressable>
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
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  hintBanner: {
    backgroundColor: '#f0fdf4',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  hintText: {
    color: '#166534',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  optionalText: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  editText: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
    paddingLeft: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 12,
    paddingLeft: 4,
    fontStyle: 'italic',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
  settingDescription: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 12,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#94a3b8',
  },
  logoutButton: {
    marginTop: 24,
  },
  logoutText: {
    color: '#ef4444',
  },
});