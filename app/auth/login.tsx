import { View, Text, StyleSheet, TextInput, Pressable, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    // Email is optional, so if it's empty, that's fine
    if (!email) {
      return true;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    // Password is optional, so if it's empty, that's fine
    if (!password) {
      return true;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // For demo purposes, let's allow login with any credentials or even empty ones
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // In a real app, you would store the user's session/token
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleSignUp = () => {
    router.push('/auth/register');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleSkipLogin = () => {
    // Allow users to skip login entirely
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=200&auto=format&fit=crop' }} 
            style={styles.logo} 
          />
          <Text style={styles.appName}>Resume Builder</Text>
          <Text style={styles.tagline}>Create ATS-friendly resumes in minutes</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to continue building your career (optional)</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email (Optional)</Text>
            <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
              <Mail size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) validateEmail(text);
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={() => validateEmail(email)}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password (Optional)</Text>
            <View style={[styles.inputContainer, passwordError ? styles.inputError : null]}>
              <Lock size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) validatePassword(text);
                }}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                onBlur={() => validatePassword(password)}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </Pressable>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          <Pressable style={styles.forgotPasswordLink} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          <Pressable 
            style={[styles.loginButton, loading ? styles.loginButtonDisabled : null]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </Pressable>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Pressable onPress={handleSignUp}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
          
          <Pressable style={styles.skipButton} onPress={handleSkipLogin}>
            <Text style={styles.skipButtonText}>Skip Login</Text>
          </Pressable>
          
          <View style={styles.demoCredentials}>
            <Text style={styles.demoTitle}>Demo Credentials (Optional)</Text>
            <Text style={styles.demoText}>Email: user@example.com</Text>
            <Text style={styles.demoText}>Password: password</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1e293b',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    backgroundColor: '#818cf8',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  signupText: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 4,
  },
  signupLink: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '500',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  demoCredentials: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
});