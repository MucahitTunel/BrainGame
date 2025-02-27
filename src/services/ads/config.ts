import Config from 'react-native-config';
import { TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : Config.ADMOB_BANNER_ID;
const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : Config.ADMOB_INTERSTITIAL_ID;
const rewardedAdUnitId = __DEV__ ? TestIds.REWARDED : Config.ADMOB_REWARDED_ID;

// const adUnitId = Config.ADMOB_BANNER_ID;
// const interstitialAdUnitId = Config.ADMOB_INTERSTITIAL_ID;

export const AD_IDS = {
    BANNER: adUnitId,
    INTERSTITIAL: interstitialAdUnitId,
    REWARDED: rewardedAdUnitId,
} as const; 