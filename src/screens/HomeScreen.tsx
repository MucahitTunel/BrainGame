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
import BannerAds from '../components/Ads/BannerAds';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const GAME_SIZES = [4, 6, 8] as const;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleSizeSelect = (size: 4 | 6 | 8) => {
    navigation.navigate('Game', { size });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Zeka Oyunu</Text>
        <Text style={styles.subtitle}>Zorluk Seviyesi</Text>

        <View style={styles.buttonsContainer}>
          {GAME_SIZES.map((size) => {
            const difficulty = size === 4 ? 'Kolay' : size === 6 ? 'Orta' : 'Zor';
            return (
              <TouchableOpacity
                key={size}
                style={styles.sizeButton}
                onPress={() => handleSizeSelect(size)}
              >
                <Text style={styles.buttonText}>{difficulty}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <TouchableOpacity
          style={styles.recordsButton}
          onPress={() => navigation.navigate('Records')}
        >
          <Text style={styles.recordsButtonText}>Rekorlar</Text>
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
    marginBottom: SIZES.margin,
  },
  subtitle: {
    ...FONTS.h2,
    color: COLORS.secondary,
    marginBottom: SIZES.margin * 2,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding * 2,
    gap: SIZES.margin,
  },
  sizeButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  buttonText: {
    ...FONTS.h2,
    color: COLORS.background,
  },
  gridSize: {
    ...FONTS.h3,
    color: COLORS.secondary,
  },
  recordsButton: {
    marginTop: SIZES.margin * 3,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  recordsButtonText: {
    ...FONTS.h3,
    color: COLORS.background,
  },
});

export default HomeScreen; 