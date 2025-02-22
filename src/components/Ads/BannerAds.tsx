import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { AD_IDS } from '../../services/ads/config';

const BannerAds = () => {

    return null;
    return (
        <BannerAd
            unitId={AD_IDS.BANNER}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    );
};

export default BannerAds;