// export const COLORS = {
//   primary: '#A8D8EA',  // Pastel Blue
//   secondary: '#AA96DA', // Pastel Purple
//   accent: '#FCBAD3',   // Pastel Pink
//   background: '#FFFFFF',
//   text: '#333333',
//   success: '#95E1D3',  // Pastel Green
//   warning: '#FFE2E2',  // Pastel Red
//   card: '#F9F9F9',
//   shadow: '#000000',
//   overlay: 'rgba(0,0,0,0.5)',
// };

export const COLORS = {
  primary: '#007BFF',  // Vivid Blue
  secondary: '#6F42C1', // Vibrant Purple
  accent: '#FF4081',   // Bright Pink
  background: '#FFFFFF',
  text: '#212529',
  success: '#28A745',  // Bright Green
  warning: '#FFC107',  // Bright Yellow
  card: '#F8F9FA',
  shadow: '#343A40',
  overlay: 'rgba(0,0,0,0.7)',
};


export const SIZES = {
  padding: 16,
  margin: 16,
  radius: 12,
  borderWidth: 1,
};

export const FONTS = {
  h1: { fontSize: 32, fontWeight: '700' as const },
  h2: { fontSize: 24, fontWeight: '600' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 16 },
  caption: { fontSize: 14 },
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
}; 