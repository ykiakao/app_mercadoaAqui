import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function ProtectedLayout() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        router.replace('/auth/login');
      }
      setReady(true);
    }, 100); // pequeno delay evita o erro

    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
