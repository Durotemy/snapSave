import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

export const AppIcon = ({ name, size = 24, color = '#000' }: IconProps) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};
