import Config from 'react-native-config';
import { TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : Config.ADMOB_BANNER_ID;
const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : Config.ADMOB_INTERSTITIAL_ID;

export const AD_IDS = {
    BANNER: adUnitId,
    INTERSTITIAL: interstitialAdUnitId,
} as const; 