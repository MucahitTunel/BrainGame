import { useEffect, useState, useRef } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { AD_IDS } from '../services/ads/config';

export const useRewardedAds = (onRewarded: () => void) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const rewardedAdRef = useRef<RewardedAd | null>(null);

    useEffect(() => {
        const adUnitId = __DEV__ ? TestIds.REWARDED : AD_IDS.REWARDED || '';
        const rewarded = RewardedAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
            keywords: [
                'puzzle',
                'game',
                'brain',
                'puzzle',
                'brain',
                'kids',
                'fun',
                'learning'
            ],
        });

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            console.log("Loaded");
            setIsLoaded(true);
        });

        const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
            onRewarded();
            setIsLoaded(false);
        });

        rewarded.load();
        rewardedAdRef.current = rewarded;

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
            rewardedAdRef.current = null;
        };
    }, [onRewarded]);

    const showRewardedAd = async () => {
        try {
            if (rewardedAdRef.current && isLoaded) {
                await rewardedAdRef.current.show();
            }
        } catch (error) {
            console.error('Error showing rewarded ad:', error);
        }
    };

    return { showRewardedAd, isLoaded };
}; 