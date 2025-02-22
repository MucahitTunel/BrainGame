import MobileAds from "react-native-google-mobile-ads"

export const initializeAds = async () => {
    try {
        MobileAds().initialize();
    } catch (error) {
        // console.log(error);
    }
}