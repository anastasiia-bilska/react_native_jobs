import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons } from '../constants';
import { ScreenHeaderBtn } from '../components';

const JobDetails = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: '',
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: 20 }}>
            <TouchableOpacity
              style={{
                padding: 20,
                borderRadius: 20,
                backgroundColor: COLORS.primary,
              }}
            >
              <Text style={{ color: '#fff' }}>Write NFC ('Hello world')</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 20,
                borderRadius: 20,
                backgroundColor: COLORS.primary,
              }}
            >
              <Text style={{ color: '#fff' }}>Write NFC ('Аптека 911')</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 20,
                borderRadius: 20,
                backgroundColor: COLORS.primary,
              }}
            >
              <Text style={{ color: '#fff' }}>Read NFC</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
