import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="" options={{ title: 'Detalle del Vehículo' }} />
      <Stack.Screen name="" options={{ title: 'Editar Vehículo' }} />
    </Stack>
  );
}