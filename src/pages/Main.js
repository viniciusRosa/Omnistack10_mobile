import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

function Main({ navigation }) {

	const [currentRegion, setCurrentRegion] = useState(null);
	useEffect(() => {
		async function loadInitialLocation() {
			const { granted } = await requestPermissionsAsync();

			if (granted) {
				const { coords } = await getCurrentPositionAsync({
					enableHighAccuracy: true
				});

				const { latitude, longitude } = coords;

				setCurrentRegion({
					latitude,
					longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				})

			}
		}

		loadInitialLocation();
	}, []);

	if (!currentRegion) {
		return null;
	}

	return (
	<>
	<MapView initialRegion={currentRegion} style={styles.map} >
		<Marker coordinate={{ latitude: -29.891507,longitude: -50.2577158 }}>
			<Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/7891544?s=460&v=4'}} />
			<Callout onPress={ () => {
				navigation.navigate('Profile', { github_username: 'viniciusrosa' });
			} }>
				<View style={styles.callout} >
					<Text style={styles.devName}>Vinicius rosa</Text>
					<Text style={styles.devBio}>Biografia</Text>
					<Text style={styles.devTechs}>tecnologias</Text>
				</View>
			</Callout>
		</Marker>
	</MapView>
	<View style={styles.searchForm}>
		<TextInput 
			style={styles.searchInput} 
			placeholder='Buscar devs'
			placeholderTextColor='#999'
			autoCapitalize='words'
			autoCorrect={false}

			/>
		<TouchableOpacity onPress={() => {}} style={styles.loadButton}>
			<MaterialIcons name="my-location" size={20} color={"#fff"}/>
		</TouchableOpacity>
	</View>
	</>
	)}

const styles = StyleSheet.create({
	map: {
		flex: 1
	},
	avatar: {
		width: 54,
		height: 54,
		borderRadius: 4,
		borderWidth: 4,
		borderColor: '#fff'
	},
	callout: {
		width: 260,
	},
	devName: {
		fontWeight: 'bold',
		fontSize: 16
	},
	devBio: {
		color: '#666',
		marginTop: 5
	},
	devTechs: {
		marginTop: 5
	},
	searchForm: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		zIndex: 5,
		flexDirection: 'row',
	},
	searchInput: {
		flex: 1,
		height: 50,
		backgroundColor: '#fff',
		color: '#333',
		borderRadius: 25,
		paddingHorizontal: 20,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 4,
			height: 4
		},
		elevation: 2
	},
	loadButton: {
		width: 50,
		height: 50,
		backgroundColor: '#8e4dff',
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15
	}
})

export default Main;