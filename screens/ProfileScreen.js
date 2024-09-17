import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const initialUser = {
    name: 'Zu Ngo',
    email: 'zuzzz@gmail.com',
    address: '123 Hai Bà Tưng',
    phone: '123-456-7890',
    profilePicture: 'https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-avatar-user-basic-abstract-circle-background-flat-color-icon-png-image_1647265.jpg',
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(user);

  const handleSave = () => {
    setUser(editUser);
    setIsEditing(false);
    Alert.alert('Profile updated successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />

      {/* User Information */}
      {isEditing ? (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <TextInput
              style={styles.infoInput}
              value={editUser.name}
              onChangeText={(text) => setEditUser({ ...editUser, name: text })}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <TextInput
              style={styles.infoInput}
              value={editUser.email}
              onChangeText={(text) => setEditUser({ ...editUser, email: text })}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <TextInput
              style={styles.infoInput}
              value={editUser.address}
              onChangeText={(text) => setEditUser({ ...editUser, address: text })}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <TextInput
              style={styles.infoInput}
              value={editUser.phone}
              onChangeText={(text) => setEditUser({ ...editUser, phone: text })}
            />
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoText}>{user.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoText}>{user.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
        </View>
      )}

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : '✏️ Edit'}</Text>
      </TouchableOpacity>

      {/* View Ordered Items Button */}
      <TouchableOpacity
        style={styles.viewOrdersButton}
        onPress={() => navigation.navigate('OrderComplete')}
      >
        <Text style={styles.buttonText}>View Ordered Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 30,
    borderColor: '#3498db',
    borderWidth: 2,
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'right',
  },
  infoInput: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    padding: 5,
    width: '60%',
  },
  editButton: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  viewOrdersButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default SettingsScreen;
