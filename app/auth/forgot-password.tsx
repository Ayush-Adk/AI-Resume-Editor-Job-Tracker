import { View, Text, StyleSheet, TextInput, Pressable, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Mail, ArrowLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleResetPassword = () => {
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
      
      // In a real app, you would send a password reset email
    }, 1500);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleReturnToLogin = () => {
    router.replace('/auth/login');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeft size={20} color="#1e293b" />
        </Pressable>
        
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=200&auto=format&fit=crop' }} 
            style={styles.logo} 
          />
          <Text style={styles.appName}>Resume Builder</Text>
        </View>

        <View style={styles.formContainer}>
          {!resetSent ? (
            <>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>Enter your email to reset your password</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
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

              <Pressable 
                style={[styles.resetButton, loading ? styles.resetButtonDisabled : null]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                <Text style={styles.resetButtonText}>
                  {loading ? 'Sending...' : 'Reset Password'}
                </Text>
              </Pressable>

              <Pressable style={styles.returnLink} onPress={handleReturnToLogin}>
                <Text style={styles.returnText}>Return to Login</Text>
              </Pressable>
            </>
          ) : (
            <View style={styles.successContainer}>
              <Text style={styles.successTitle}>Check Your Email</Text>
              <Text style={styles.successText}>
                We've sent password reset instructions to:
              </Text>
              <Text style={styles.emailText}>{email}</Text>
              <Text style={styles.instructionText}>
                Please check your email and follow the instructions to reset your password.
              </Text>
              
              <Pressable 
                style={styles.returnToLoginButton}
                onPress={handleReturnToLogin}
              >
                <Text style={styles.returnToLoginText}>Return to Login</Text>
              </Pressable>
              
              <Pressable 
                style={styles.resendLink}
                onPress={handleResetPassword}
              >
                <Text style={styles.resendText}>Didn't receive an email? Resend</Text>
              </Pressable>
            </View>
          )}
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
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
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
    marginBottom: 24,
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
  resetButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  resetButtonDisabled: {
    backgroundColor: '#818cf8',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  returnLink: {
    alignItems: 'center',
  },
  returnText: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '500',
  },
  successContainer: {
    alignItems: 'center',
    padding: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  successText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  returnToLoginButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  returnToLoginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendLink: {
    padding: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '500',
  },
});