import { Alert } from 'react-native';

export const showAlert = (message) => {
  Alert.alert(
    'Alert',
    message,
    [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ],
    { cancelable: false }
  );
};
