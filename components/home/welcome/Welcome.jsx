import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const jobTypes = [
  { type: 'Full-time', name: 'Повний робочий день' },
  { type: 'Part-time', name: 'Часткова зайнятісь' },
  { type: 'Contaractor', name: 'Контракт' },
];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState(jobTypes[0].type);
  console.log({ activeJobType });
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Вітаємо!</Text>
        <Text style={styles.welcomeMessage}>Знайдіть роботу своєї мрії</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="Що ви шукаєте?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item.type)}
              onPress={() => {
                setActiveJobType(item.type);
                router.push(`/search/${item.type}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item.type)}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.type}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
