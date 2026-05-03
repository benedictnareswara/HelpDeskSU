import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { COLORS } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import ErrorBoundary from '../components/ErrorBoundary';

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

// Wrap each screen in ErrorBoundary (Shneiderman Rule 6: Error Prevention)
const withEB = (Screen: React.ComponentType<any>, name: string) => {
  return (props: any) => (
    <ErrorBoundary fallbackTitle={`The ${name} screen encountered an error.`}>
      <Screen {...props} />
    </ErrorBoundary>
  );
};

// Home Stack
function HomeStack() {
  return (
    <HomeStackNav.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <HomeStackNav.Screen name="HomeMain" component={withEB(HomeScreen, 'Home')} />
      <HomeStackNav.Screen name="Contacts" component={withEB(ContactsDirectoryScreen, 'Contacts')} />
      <HomeStackNav.Screen name="Calendar" component={withEB(CalendarScreen, 'Calendar')} />
      <HomeStackNav.Screen name="Voicebox" component={withEB(VoiceboxScreen, 'Voicebox')} />
      <HomeStackNav.Screen name="Request" component={withEB(RequestHubScreen, 'Request')} />
      <HomeStackNav.Screen name="VenueBookingSelect" component={withEB(VenueBookingSelectScreen, 'Venue Booking')} />
      <HomeStackNav.Screen name="VenueBookingForm" component={withEB(VenueBookingFormScreen, 'Booking Form')} />
      <HomeStackNav.Screen name="FormRequest" component={withEB(FormRequestScreen, 'Form Request')} />
      <HomeStackNav.Screen name="Maintenance" component={withEB(MaintenanceScreen, 'Maintenance')} />
    </HomeStackNav.Navigator>
  );
}

// Schedule Stack
function ScheduleStack() {
  return (
    <ScheduleStackNav.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <ScheduleStackNav.Screen name="CourseSchedule" component={withEB(CourseScheduleScreen, 'Schedule')} />
      <ScheduleStackNav.Screen name="MidtermSchedule" component={withEB(MidtermScheduleScreen, 'Midterm')} />
    </ScheduleStackNav.Navigator>
  );
}

// Search / AI Chat Stack
function SearchStack() {
  return (
    <SearchStackNav.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <SearchStackNav.Screen name="AIChat" component={withEB(AIChatScreen, 'AI Chat')} />
    </SearchStackNav.Navigator>
  );
}

// Messages Stack
function MessagesStack() {
  return (
    <MessagesStackNav.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <MessagesStackNav.Screen name="MessagesList" component={withEB(MessagesListScreen, 'Messages')} />
      <MessagesStackNav.Screen name="ChatThread" component={withEB(ChatThreadScreen, 'Chat')} />
    </MessagesStackNav.Navigator>
  );
}

// Profile Stack
function ProfileStack() {
  return (
    <ProfileStackNav.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <ProfileStackNav.Screen name="ProfileMain" component={withEB(ProfileScreen, 'Profile')} />
    </ProfileStackNav.Navigator>
  );
}

// Bottom Tabs — Shneiderman Rule 1 (Consistency) + Rule 8 (labels on icons)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
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
        // Shneiderman Rule 8: Show labels on all nav icons to reduce memory load
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: -2,
        },
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.divider,
          height: Platform.OS === 'ios' ? 85 : 60,
          paddingBottom: Platform.OS === 'ios' ? 25 : 8,
          paddingTop: 6,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="ScheduleTab" component={ScheduleStack} options={{ tabBarLabel: 'Schedule' }} />
      <Tab.Screen name="SearchTab" component={SearchStack} options={{ tabBarLabel: 'AI Help' }} />
      <Tab.Screen name="MessagesTab" component={MessagesStack} options={{ tabBarLabel: 'Messages' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Root Navigation
export default function AppNavigator() {
  const { isLoggedIn } = useAppStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
