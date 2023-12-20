import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';

const tabs = [
  { type: 'About', name: 'Про вакансію' },
  { type: 'Qualifications', name: 'Необхідна кваліфікація' },
  { type: 'Responsibilities', name: "Обов'язки" },
];

const JobDetails = () => {
  const params = useGlobalSearchParams();
  console.log(params);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].type);

  const onRefresh = () => {};

  const { data, isLoading, error, refresh } = useFetch('job-details', {
    job_id: params.id,
  });

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title="Необхідна кваліфікація"
            points={data[0].job_highlights?.Qualifications ?? ['Відсутня']}
          />
        );
      case 'Responsibilities':
        return (
          <Specifics
            title="Обов'язки"
            points={data[0].job_highlights?.Responsibilities ?? ['Інформація відсутня']}
          />
        );
      case 'About':
        return (
          <JobAbout info={data[0].job_description ?? 'Інформація відсутня'} />
        );
      default:
        break;
    }
  };

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Щось пішло не так, спробуйте, будь ласка пізніше</Text>
          ) : data.length === 0 ? (
            <Text>Дані відсутні</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].empoyer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
