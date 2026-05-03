import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';
import { COLORS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CourseScheduleScreen from '../screens/CourseScheduleScreen';
import MidtermScheduleScreen from '../screens/MidtermScheduleScreen';
import AIChatScreen from '../screens/AIChatScreen';
import MessagesListScreen from '../screens/MessagesListScreen';
import ChatThreadScreen from '../screens/ChatThreadScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactsDirectoryScreen from '../screens/ContactsDirectoryScreen';
import CalendarScreen from '../screens/CalendarScreen';
import VoiceboxScreen from '../screens/VoiceboxScreen';
import RequestHubScreen from '../screens/RequestHubScreen';
import VenueBookingSelectScreen from '../screens/VenueBookingSelectScreen';
import VenueBookingFormScreen from '../screens/VenueBookingFormScreen';
import FormRequestScreen from '../screens/FormRequestScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStackNav = createNativeStackNavigator();
const ScheduleStackNav = createNativeStackNavigator();
const SearchStackNav = createNativeStackNavigator();
const MessagesStackNav = createNativeStackNavigator();
const ProfileStackNav = createNativeStackNavigator();

// Home Stack
function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="HomeMain" component={HomeScreen} />
      <HomeStackNav.Screen name="Contacts" component={ContactsDirectoryScreen} />
      <HomeStackNav.Screen name="Calendar" component={CalendarScreen} />
      <HomeStackNav.Screen name="Voicebox" component={VoiceboxScreen} />
      <HomeStackNav.Screen name="Request" component={RequestHubScreen} />
      <HomeStackNav.Screen name="VenueBookingSelect" component={VenueBookingSelectScreen} />
      <HomeStackNav.Screen name="VenueBookingForm" component={VenueBookingFormScreen} />
      <HomeStackNav.Screen name="FormRequest" component={FormRequestScreen} />
      <HomeStackNav.Screen name="Maintenance" component={MaintenanceScreen} />
    </HomeStackNav.Navigator>
  );
}

// Schedule Stack
function ScheduleStack() {
  return (
    <ScheduleStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ScheduleStackNav.Screen name="CourseSchedule" component={CourseScheduleScreen} />
      <ScheduleStackNav.Screen name="MidtermSchedule" component={MidtermScheduleScreen} />
    </ScheduleStackNav.Navigator>
  );
}

// Search / AI Chat Stack
function SearchStack() {
  return (
    <SearchStackNav.Navigator screenOptions={{ headerShown: false }}>
      <SearchStackNav.Screen name="AIChat" component={AIChatScreen} />
    </SearchStackNav.Navigator>
  );
}

// Messages Stack
function MessagesStack() {
  return (
    <MessagesStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MessagesStackNav.Screen name="MessagesList" component={MessagesListScreen} />
      <MessagesStackNav.Screen name="ChatThread" component={ChatThreadScreen} />
    </MessagesStackNav.Navigator>
  );
}

// Profile Stack
function ProfileStack() {
  return (
    <ProfileStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNav.Screen name="ProfileMain" component={ProfileScreen} />
    </ProfileStackNav.Navigator>
  );
}

// Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'ScheduleTab':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'SearchTab':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'MessagesTab':
              iconName = focused ? 'send' : 'send-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.divider,
          height: Platform.OS === 'ios' ? 85 : 60,
          paddingBottom: Platform.OS === 'ios' ? 25 : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="ScheduleTab" component={ScheduleStack} />
      <Tab.Screen name="SearchTab" component={SearchStack} />
      <Tab.Screen name="MessagesTab" component={MessagesStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Root Navigation
export default function AppNavigator() {
  const { isLoggedIn } = useAppStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
