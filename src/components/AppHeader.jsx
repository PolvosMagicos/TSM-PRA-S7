import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

export default function AppHeader() {
  const frame = useSafeAreaFrame();

  return (
    <View>
      <Svg
        width={frame.width}
        height={120}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        fill="#512da8"
      >
        <Path
          opacity={0.8}
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        />
      </Svg>

      <Text variant="displaySmall" style={styles.headerTitle}>
        tareApps
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#f2e9e9',
    position: 'absolute',
    left: 20,
    top: 10,
  },
});
