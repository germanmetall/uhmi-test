<template>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
		integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
		crossorigin=""/>

	<div id="map"></div>

	<Popup ref="popupRef" :lat="lat" :lng="lng" @markerAdded="importMarkers"></Popup>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import Popup from '@/components/popup.vue';

let lat = ref(null),
	lng = ref(null),
	popupRef = ref(null),
	markers = ref([]),
	mapRef = ref();

function importMarkers(){
	let markers_temp = JSON.parse(localStorage.getItem("markers"));

	if(!markers_temp) return;

	markers_temp.forEach(el => {
		if(markers.value.includes(el)) return;

		let marker = L.marker([el.lat, el.lng], {
			title: el.name
		}).addTo(mapRef.value);

		marker.bindPopup(`Marker '${el.name}'`);
		marker.on('mouseover', () => {
			marker.openPopup();
		})
		marker.on('mouseout', () => {
			marker.closePopup();
		})

		markers.value.push(el);
	})
}

function onMapClick(e){
	console.log(e.latlng);
	lat.value = e.latlng.lat;
	lng.value = e.latlng.lng;
	popupRef.value.isOpened = true;
}

onMounted(() => {
	mapRef.value = L.map('map', {zoomAnimation:false}).setView([48.5, 32], 5);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(mapRef.value);

	mapRef.value.on('click', onMapClick);

	importMarkers();
})
</script>

<style lang="scss" scoped>
#map{
	margin: auto;
	max-width: 95vmin;
	height: 60vmin;
}
</style>