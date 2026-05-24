import React, { useRef } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SWIPE_THRESHOLD = 100;

export default function Todo({
  id,
  description,
  isCompleted,
  createdAt,
  deleteTodo,
  toggleIsCompleted,
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const completed = Boolean(isCompleted);

  const showDetails = () => {
    Alert.alert(
      'Detalle de tarea',
      `Tarea: ${description}\nCreada: ${createdAt || 'Sin fecha'}`
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar tarea',
      `¿Estás seguro de que deseas eliminar la tarea ${id}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteTodo(id),
        },
      ]
    );
  };

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      bounciness: 10,
      useNativeDriver: false,
    }).start();
  };

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((event) => {
      translateX.setValue(event.translationX);
    })
    .onEnd((event) => {
      const { translationX } = event;

      if (translationX < -SWIPE_THRESHOLD * 2) {
        deleteTodo(id);
      } else if (translationX > SWIPE_THRESHOLD * 2) {
        toggleIsCompleted(id, completed);
      }

      resetPosition();
    });

  const redLayerOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD * 2, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const deleteIconOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD * 2, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const purpleLayerOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD * 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const checkIconOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD * 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    transform: [{ translateX }],
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.redLayer, { opacity: redLayerOpacity }]}
      >
        <Animated.View
          style={[styles.deleteIconContainer, { opacity: deleteIconOpacity }]}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="whitesmoke"
          />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[styles.purpleLayer, { opacity: purpleLayerOpacity }]}
      >
        <Animated.View
          style={[styles.checkIconContainer, { opacity: checkIconOpacity }]}
        >
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={24}
            color="whitesmoke"
          />
        </Animated.View>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.todoContainer, animatedStyle]}>
          <TouchableOpacity
            onPress={showDetails}
            onLongPress={() => toggleIsCompleted(id, completed)}
          >
            <Text
              style={[completed && styles.completed, styles.todoText]}
              variant="bodyLarge"
            >
              {description.length > 35
                ? description.slice(0, 35) + '...'
                : description}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 20,
    backgroundColor: 'rgb(237, 221, 245)',
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  todoText: {
    width: 280,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#512da8',
  },
  redLayer: {
    position: 'absolute',
    top: 20,
    right: 0,
    left: 0,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  deleteIconContainer: {
    position: 'absolute',
    right: 15,
    top: '20%',
  },
  purpleLayer: {
    position: 'absolute',
    top: 20,
    right: 0,
    left: 0,
    height: 40,
    backgroundColor: 'blueviolet',
    borderRadius: 12,
  },
  checkIconContainer: {
    position: 'absolute',
    left: 15,
    top: '20%',
  },
});
