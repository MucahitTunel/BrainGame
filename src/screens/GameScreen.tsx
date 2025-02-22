import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInterstitialAds } from '../hooks/useInterstitialAds';
import BannerAds from '../components/Ads/BannerAds';
import WinDialog from '../components/WinDialog';
import TutorialDialog from '../components/TutorialDialog';

type GameScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Game'
>;

type RouteParams = {
    size: 4 | 6 | 8;
};

type Position = {
    row: number;
    col: number;
} | null;

const GameScreen = () => {
    const navigation = useNavigation<GameScreenNavigationProp>();
    const route = useRoute();
    const { showInterstitial } = useInterstitialAds();
    const { size } = route.params as RouteParams;

    const [grid, setGrid] = useState<number[][]>([]);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showExitAlert, setShowExitAlert] = useState(false);
    const [selectedTile, setSelectedTile] = useState<Position>(null);
    const [showWinDialog, setShowWinDialog] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);

    // Initialize grid with random numbers
    useEffect(() => {
        initializeGrid();
    }, [size]);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        checkFirstTime();
    }, []);

    const checkFirstTime = async () => {
        try {
            const hasPlayedBefore = await AsyncStorage.getItem('has_played_before');
            if (!hasPlayedBefore) {
                setShowTutorial(true);
                await AsyncStorage.setItem('has_played_before', 'true');
            }
        } catch (error) {
            console.error('Error checking first time:', error);
        }
    };

    const initializeGrid = () => {
        const targetSum = size * 10; // Hedef toplam

        const grid: number[][] = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (x === 0) {
                    const remain = size - y - 1;
                    const maxNumber = y === 0 ? targetSum - remain : targetSum - grid[x].reduce((a, b) => a + b, 0) - remain;
                    grid[x][y] = y === size - 1 ? targetSum - grid[x].reduce((a, b) => a + b, 0) : Math.floor(Math.random() * maxNumber) + 1;
                }
                else if (x === size - 1) {
                    const totalRowSum = grid.reduce((acc, row) => acc + row[y], 0);
                    grid[x][y] = targetSum - totalRowSum;
                }
                else if (x > 0 && y === 0) {
                    const remain = size - x - 1;
                    const totalColumnSum = grid.reduce((acc, row) => acc + row[y], 0);
                    const maxNumber = targetSum - totalColumnSum - remain;
                    grid[x][y] = x === size - 1 ? targetSum - totalColumnSum : Math.floor(Math.random() * maxNumber) + 1;
                }
                else if (x > 0 && y === size - 1) {
                    const totalRowSum = grid[x].reduce((a, b) => a + b, 0);
                    grid[x][y] = targetSum - totalRowSum;
                }
                else if (x > 0 && y > 0) {
                    const totalRowSum = grid[x].reduce((a, b) => a + b, 0);
                    const totalColumnSum = grid.reduce((acc, row) => acc + row[y], 0);
                    const maxTotal = Math.max(totalRowSum, totalColumnSum);
                    const remain = totalRowSum === totalColumnSum ?
                        size - Math.max(x, y) - 1
                        :
                        maxTotal === totalRowSum ?
                            size - x - 1
                            :
                            size - y - 1;
                    const maxNumber = targetSum - maxTotal - remain;
                    grid[x][y] = Math.floor(Math.random() * maxNumber) + 1;
                }
            }
        }
        
        const shuffledGrid = shuffleGrid(grid);
        setGrid(shuffledGrid);
    };

    const shuffleGrid = (grid: number[][]) => {
        const flatGrid = grid.flat();
        const shuffledFlatGrid = flatGrid.sort(() => Math.random() - 0.5);
        const shuffledGrid = Array.from({ length: size }, (_, i) => shuffledFlatGrid.slice(i * size, (i + 1) * size));
        return shuffledGrid;
    }

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const checkWin = (grid: number[][]) => {
        // Check rows
        const rowSums = grid.map((row) => row.reduce((a, b) => a + b, 0));
        const targetSum = rowSums[0];
        if (!rowSums.every((sum) => sum === targetSum)) return false;

        // Check columns
        for (let col = 0; col < size; col++) {
            let colSum = 0;
            for (let row = 0; row < size; row++) {
                colSum += grid[row][col];
            }
            if (colSum !== targetSum) return false;
        }

        return true;
    }

    const handleWin = async () => {
        setIsPlaying(false);
        const recordKey = `record_${size}`;

        try {
            const existingRecord = await AsyncStorage.getItem(recordKey);
            if (!existingRecord || timer < parseInt(existingRecord)) {
                await AsyncStorage.setItem(recordKey, timer.toString());
            }
            showInterstitial();
        } catch (error) {
            console.error('Error saving record:', error);
        }

        setShowWinDialog(true);
    };

    const swapTiles = (pos1: Position, pos2: Position) => {
        if (!pos1 || !pos2) return;

        const newGrid = grid.map((row) => [...row]);
        [newGrid[pos1.row][pos1.col], newGrid[pos2.row][pos2.col]] = [
            newGrid[pos2.row][pos2.col],
            newGrid[pos1.row][pos1.col],
        ];
        setGrid(newGrid);
        setSelectedTile(null);

        if (checkWin(newGrid)) {
            handleWin();
        }
    };

    const handleTilePress = (row: number, col: number) => {
        if (!isPlaying) return;

        if (!selectedTile) {
            // First tile selection
            setSelectedTile({ row, col });
        } else {
            // Second tile selection
            if (selectedTile.row === row && selectedTile.col === col) {
                // Deselect if same tile
                setSelectedTile(null);
            } else {
                // Swap tiles
                swapTiles(selectedTile, { row, col });
            }
        }
    };

    const handleExit = () => {
        setIsPlaying(false);
        setShowExitAlert(true);
    };

    const tileSize = (Dimensions.get('window').width - SIZES.padding * 4) / size;

    const isTileSelected = (row: number, col: number) => {
        return selectedTile?.row === row && selectedTile?.col === col;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.timer}>{formatTime(timer)}</Text>
                    <TouchableOpacity
                        style={styles.exitButton}
                        onPress={handleExit}
                    >
                        <Text style={styles.exitButtonText}>Çıkış</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.gridContainer}>
                    {grid.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((number, colIndex) => (
                                <TouchableOpacity
                                    key={colIndex}
                                    style={[
                                        styles.tile,
                                        {
                                            width: tileSize,
                                            height: tileSize,
                                        },
                                        isTileSelected(rowIndex, colIndex) && styles.selectedTile,
                                    ]}
                                    onPress={() => handleTilePress(rowIndex, colIndex)}
                                >
                                    <Text style={[
                                        styles.tileText,
                                        isTileSelected(rowIndex, colIndex) && styles.selectedTileText
                                    ]}>
                                        {number}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </View>

            {showExitAlert && (
                <View style={styles.alertOverlay}>
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertTitle}>Oyundan Çık?</Text>
                        <Text style={styles.alertMessage}>
                            Oyundan çıkmak istediğinizden emin misiniz? İlerlemeniz kaybedilecektir.
                        </Text>
                        <View style={styles.alertButtons}>
                            <TouchableOpacity
                                style={[styles.alertButton, styles.alertCancelButton]}
                                onPress={() => {
                                    setShowExitAlert(false);
                                    setIsPlaying(true);
                                }}
                            >
                                <Text style={styles.alertButtonText}>İptal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.alertButton, styles.alertConfirmButton]}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={styles.alertButtonText}>Çık</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            <TutorialDialog
                visible={showTutorial}
                onClose={() => setShowTutorial(false)}
            />

            <WinDialog
                visible={showWinDialog}
                size={size}
                time={formatTime(timer)}
                onClose={() => {
                    setShowWinDialog(false);
                    navigation.goBack();
                }}
            />

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
        padding: SIZES.padding,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.margin * 2,
    },
    timer: {
        ...FONTS.h2,
        color: COLORS.primary,
    },
    exitButton: {
        backgroundColor: COLORS.warning,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding / 2,
        borderRadius: SIZES.radius,
        ...SHADOWS.small,
    },
    exitButtonText: {
        ...FONTS.h3,
        color: COLORS.text,
    },
    gridContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    tile: {
        backgroundColor: COLORS.card,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius / 2,
        ...SHADOWS.small,
    },
    selectedTile: {
        backgroundColor: COLORS.primary,
        borderWidth: 2,
        borderColor: COLORS.secondary,
    },
    tileText: {
        ...FONTS.h2,
        color: COLORS.text,
    },
    selectedTileText: {
        color: COLORS.background,
    },
    alertOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContainer: {
        backgroundColor: COLORS.background,
        borderRadius: SIZES.radius,
        padding: SIZES.padding * 2,
        width: '80%',
        ...SHADOWS.medium,
    },
    alertTitle: {
        ...FONTS.h2,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SIZES.margin,
    },
    alertMessage: {
        ...FONTS.body,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SIZES.margin * 2,
    },
    alertButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SIZES.margin,
    },
    alertButton: {
        flex: 1,
        paddingVertical: SIZES.padding,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    alertCancelButton: {
        backgroundColor: COLORS.warning,
    },
    alertConfirmButton: {
        backgroundColor: COLORS.success,
    },
    alertButtonText: {
        ...FONTS.h3,
        color: COLORS.background,
    },
});

export default GameScreen; 