import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Layout from '../../layout';
import CustomText from '../../components/CustomText';
import CustomHeader from '../../components/CustomHeader';
import { HStack, Image, VStack } from '@gluestack-ui/themed';
import { AppIcon } from '../../components/Icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dimensions } from 'react-native';

const HomeScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const handleSelection = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      console.log('response for Image', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Selected image URI: ', response.assets?.[0].uri);
        setSelectedImage(response.assets?.[0].uri || null);
      }
    });
    console.log('Image selection triggered');
  };

  const cancelImage = () => {
    setSelectedImage(null);
  };
  return (
    <Layout>
      <CustomHeader text="Dashboard" />
      <VStack marginTop={20} marginBottom={20}>
        <CustomText>Welcome to SnapSave! This is the home screen.</CustomText>
      </VStack>
      <VStack marginTop={40} position="relative">
        <HStack position="absolute" top={1} right={-4} zIndex={100}>
          <Pressable onPress={cancelImage}>
            <AppIcon name="cancel" />
          </Pressable>
        </HStack>
        <Pressable onPress={handleSelection}>
          <VStack
            height={200}
            borderColor="$backgroundDark100"
            borderWidth={2}
            borderRadius={5}
            justifyContent="center"
            alignItems="center"
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                width={screenWidth - 80}
                height={180}
                borderRadius={10}
                resizeMode="cover"
                alt="Selected image"
              />
            ) : (
              <>
                <AppIcon name="insert-photo" size={40} color="#8E8E93" />
                <CustomText paddingTop={10}>
                  Select an Image to upload
                </CustomText>
              </>
            )}
          </VStack>
        </Pressable>
      </VStack>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
