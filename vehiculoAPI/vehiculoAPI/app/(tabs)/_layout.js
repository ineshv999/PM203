import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (

    <Tabs>
      <Tabs.Screen name="" options={{ href: null }} />
      <Tabs.Screen name="" options={{ title: 'Vehículos' }} />
      <Tabs.Screen name="" options={{ title: 'Nuevo Vehículo' }} />
    </Tabs>
  );
}