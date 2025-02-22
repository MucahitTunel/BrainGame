import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';

interface TutorialDialogProps {
    visible: boolean;
    onClose: () => void;
}

const TutorialDialog: React.FC<TutorialDialogProps> = ({
    visible,
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
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>🎮</Text>
                        </View>
                        
                        <Text style={styles.title}>Nasıl Oynanır?</Text>
                        
                        <View style={styles.rulesContainer}>
                            <View style={styles.ruleItem}>
                                <Text style={styles.ruleNumber}>1</Text>
                                <Text style={styles.ruleText}>
                                    Kutulardaki sayıların yerlerini değiştirerek oyunu tamamlayın
                                </Text>
                            </View>
                            
                            <View style={styles.ruleItem}>
                                <Text style={styles.ruleNumber}>2</Text>
                                <Text style={styles.ruleText}>
                                    Her satır ve sütunun toplamı birbirine eşit olmalı
                                </Text>
                            </View>
                            
                            <View style={styles.ruleItem}>
                                <Text style={styles.ruleNumber}>3</Text>
                                <Text style={styles.ruleText}>
                                    İki kutuya tıklayarak sayıların yerlerini değiştirebilirsiniz
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Anladım</Text>
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
    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.margin,
    },
    icon: {
        fontSize: 35,
    },
    title: {
        ...FONTS.h1,
        color: COLORS.primary,
        marginBottom: SIZES.margin * 2,
    },
    rulesContainer: {
        width: '100%',
        gap: SIZES.margin * 1.5,
        marginBottom: SIZES.margin * 2,
    },
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
    },
    ruleNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        ...FONTS.h3,
        color: COLORS.background,
        textAlign: 'center',
        marginRight: SIZES.margin,
    },
    ruleText: {
        flex: 1,
        ...FONTS.body,
        color: COLORS.text,
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

export default TutorialDialog; 