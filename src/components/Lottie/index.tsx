import LottieView from 'lottie-react-native';

export const LottieViewAnimation = () => (
  <LottieView
    source={require('../../assets/checkmark.json')}
    autoPlay
    loop={false}
    style={{ width: 300, height: 300 }}
  />
);
