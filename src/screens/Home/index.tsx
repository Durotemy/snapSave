import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Layout from '../../layout';
import CustomText from '../../components/CustomText';
import CustomHeader from '../../components/CustomHeader';

const HomeScreen = () => {
  return (
    <Layout>
      <CustomHeader text="Dashboard" />
      <CustomText>Welcome to SnapSave! This is the home screen.</CustomText>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
