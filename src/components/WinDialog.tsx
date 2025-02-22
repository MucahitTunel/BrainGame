import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';

interface WinDialogProps {
    visible: boolean;
    size: number;
    time: string;
    onClose: () => void;
}

const WinDialog: React.FC<WinDialogProps> = ({
    visible,
    size,
    time,
    onClose,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.trophy}>
                            <Text style={styles.trophyEmoji}>🏆</Text>
                        </View>
                        
                        <Text style={styles.congratsText}>Tebrikler!</Text>
                        <Text style={styles.subtitle}>Bulmacayı Tamamladınız</Text>
                        
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Boyut</Text>
                                <Text style={styles.statValue}>{size}x{size}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Süre</Text>
                                <Text style={styles.statValue}>{time}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Devam Et</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: COLORS.background,
        borderRadius: SIZES.radius * 2,
        padding: SIZES.padding * 2,
        ...SHADOWS.medium,
    },
    content: {
        alignItems: 'center',
    },
    trophy: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.margin,
    },
    trophyEmoji: {
        fontSize: 40,
    },
    congratsText: {
        ...FONTS.h1,
        color: COLORS.primary,
        marginBottom: SIZES.margin / 2,
    },
    subtitle: {
        ...FONTS.h3,
        color: COLORS.text,
        marginBottom: SIZES.margin * 2,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        marginBottom: SIZES.margin * 2,
        width: '100%',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: COLORS.text + '20',
        marginHorizontal: SIZES.margin,
    },
    statLabel: {
        ...FONTS.body,
        color: COLORS.text + '80',
        marginBottom: SIZES.margin / 2,
    },
    statValue: {
        ...FONTS.h2,
        color: COLORS.secondary,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.padding * 2,
        paddingVertical: SIZES.padding,
        borderRadius: SIZES.radius,
        width: '100%',
        alignItems: 'center',
        ...SHADOWS.small,
    },
    buttonText: {
        ...FONTS.h3,
        color: COLORS.background,
    },
});

export default WinDialog; 