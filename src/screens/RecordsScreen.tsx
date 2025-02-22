import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BannerAds from '../components/Ads/BannerAds';

type RecordsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Records'
>;

const GAME_SIZES = [4, 6, 8] as const;

const RecordsScreen = () => {
  const navigation = useNavigation<RecordsScreenNavigationProp>();
  const [records, setRecords] = React.useState<Record<number, string>>({});

  React.useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const recordsData: Record<number, string> = {};
      for (const size of GAME_SIZES) {
        const record = await AsyncStorage.getItem(`record_${size}`);
        if (record) {
          recordsData[size] = record;
        }
      }
      setRecords(recordsData);
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  const formatTime = (time: string | undefined) => {
    if (!time) return 'Henüz rekor yok';
    
    const seconds = parseInt(time);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>En İyi Süreler</Text>

        <View style={styles.recordsContainer}>
          {GAME_SIZES.map((size) => (
            <View key={size} style={styles.recordItem}>
              <Text style={styles.recordTitle}>{size}x{size}</Text>
              <Text style={styles.recordTime}>
                {formatTime(records[size])}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Geri</Text>
        </TouchableOpacity>
      </View>

      <BannerAds />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SIZES.padding * 4,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginBottom: SIZES.margin * 3,
  },
  recordsContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding * 2,
    gap: SIZES.margin,
  },
  recordItem: {
    backgroundColor: COLORS.card,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  recordTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  recordTime: {
    ...FONTS.h3,
    color: COLORS.secondary,
  },
  backButton: {
    marginTop: SIZES.margin * 3,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  backButtonText: {
    ...FONTS.h3,
    color: COLORS.background,
  },
});

export default RecordsScreen; 