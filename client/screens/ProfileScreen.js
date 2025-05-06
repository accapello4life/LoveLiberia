import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [tribe, setTribe] = useState('');
  const [language, setLanguage] = useState('');
  const [values, setValues] = useState('');
  const [clothing, setClothing] = useState('');
  const [religion, setReligion] = useState('');
  const [profileImage, setProfileImage] = useState(require('../assets/profile-placeholder.png'));
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const formData = new FormData();
        formData.append('image', {
          uri,
          name: 'profile.jpg',
          type: 'image/jpeg'
        });

        const response = await fetch('https://loveliberia-server.onrender.com/api/profile/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfileImage({ uri: data.imageUrl });
          setSuccessMessage('Profile image updated successfully!');
          setErrorMessage('');
        } else {
          setErrorMessage(data.message || 'Failed to upload image');
          setSuccessMessage('');
        }
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setErrorMessage('Failed to upload image');
      setSuccessMessage('');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          location,
          bio,
          interests: interests.split(',').map(i => i.trim()),
          tribe,
          language,
          values: values.split(',').map(i => i.trim()),
          clothing,
          religion
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Profile saved successfully:', data);
        setSuccessMessage('Profile saved successfully!');
        setErrorMessage('');
      } else {
        console.error('Profile save failed:', data.message);
        setErrorMessage(data.message || 'Failed to save profile');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Profile save error:', error);
      // TODO: Show error to user
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={profileImage}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.changePhotoButton} onPress={handleImageUpload}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Cultural Preferences</Text>

      <TextInput
        style={styles.input}
        placeholder="Traditional clothing preferences"
        value={clothing}
        onChangeText={setClothing}
      />

      <TextInput
        style={styles.input}
        placeholder="Religious practices"
        value={religion}
        onChangeText={setReligion}
      />

      <Text style={styles.sectionTitle}>Basic Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Location in Liberia"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.sectionTitle}>About Me</Text>

      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Tell others about yourself"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.sectionTitle}>Interests</Text>

      <TextInput
        style={styles.input}
        placeholder="Your interests (separate with commas)"
        value={interests}
        onChangeText={setInterests}
      />

      <Text style={styles.sectionTitle}>Cultural Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Tribe (e.g. Kpelle, Bassa, Kru)"
        value={tribe}
        onChangeText={setTribe}
      />

      <TextInput
        style={styles.input}
        placeholder="Languages spoken (separate with commas)"
        value={language}
        onChangeText={setLanguage}
      />

      <TextInput
        style={styles.input}
        placeholder="Traditional values important to you (separate with commas)"
        value={values}
        onChangeText={setValues}
      />

      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: liberianTheme.colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  changePhotoButton: {
    padding: 8,
  },
  changePhotoText: {
    color: liberianTheme.colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: liberianTheme.colors.primary,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
  },
  bioInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: liberianTheme.colors.primary,
    padding: 15,
    borderRadius: liberianTheme.borderRadius.medium,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successMessage: {
    color: liberianTheme.colors.success,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  errorMessage: {
    color: liberianTheme.colors.danger,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ProfileScreen;
