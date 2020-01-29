import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';

function Main() {

	const [currentRegion, setCurrentRegion] = useState(null);
	useEffect(() => {
		async function loadInitialLocation() {
			const { granted } = await requestPermissionsAsync();

			if(granted) {
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

	return <MapView initialRegion={currentRegion} style={styles.map} />
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	}
})

export default Main;