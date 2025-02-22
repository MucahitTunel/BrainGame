import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { AD_IDS } from '../services/ads/config';

const interstitial = InterstitialAd.createForAdRequest(AD_IDS.INTERSTITIAL, {
    keywords: ['fashion', 'clothing'],
});

export const useInterstitialAds = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
            if (Platform.OS === 'ios') {
                // Prevent the close button from being unreachable by hiding the status bar on iOS
                StatusBar.setHidden(true)
            }
        });

        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            if (Platform.OS === 'ios') {
                StatusBar.setHidden(false)
            }
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeOpened();
            unsubscribeClosed();
        };
    }, []);

    const showInterstitial = () => {
        if (loaded) {
            interstitial.show();
        }
    };

    return { showInterstitial }
}