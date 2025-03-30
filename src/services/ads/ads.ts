import MobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads"

export const initializeAds = async () => {
    try {
        MobileAds().setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.G,
            tagForChildDirectedTreatment: true,
            tagForUnderAgeOfConsent: true,
        }).then(() => {
            MobileAds().initialize();
        })
    } catch (error) {
        // console.log(error);
    }
}