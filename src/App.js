import { Requester } from './Requester.js';

const App = {
	Start() {
		App.View();
	},

	async View() {
		const data = await Requester.requestData();
		const infoElement = document.querySelector('main .info .text-info');

		const html = `
    <div><strong>IP Público:</strong><span>${data.ip_address}</span></div>
    <div>
      <strong>Provedor:</strong
      ><span title=${data.connection.organization_name}>${data.connection.organization_name}</span>
    </div>
    <div><strong>Cidade:</strong><span>${data.city} / ${data.region_iso_code}</span></div>
    <div><strong>País:</strong><span>${data.country} ${data.flag.emoji}</span></div>
    <div><strong>Horário atual:</strong><span>${data.timezone.current_time}</span></div>
    <div><strong>É uma VPN:</strong><span>${data.security.is_vpn ? 'Sim' : 'Não'}</span></div>
  `;
		infoElement.innerHTML = html;

		App.LoadMap(data);
	},

	LoadMap(data) {
		const map = L.map('mapid').setView([data.latitude, data.longitude], 13);

		L.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
			{
				maxZoom: 18,
				id: 'mapbox/navigation-night-v1',
				tileSize: 512,
				zoomOffset: -1,
				accessToken: 'pk.eyJ1IjoiZWxpZXplcjUzNyIsImEiOiJja2c2eXU2YmswMjhmMnlvYXU2MzNrbXY1In0.akAj2BNx4Gb8fxi12W-HJQ'
			}
		).addTo(map);

		const marker = L.marker([data.latitude, data.longitude]).addTo(map);
		const circle = L.circle([data.latitude, data.longitude], {
			color: '#8A8FFF',
			fillColor: '#8976FF',
			fillOpacity: 0.5,
			radius: 1000,
		}).addTo(map);
    
		marker.bindPopup(data.ip_address).openPopup();
		circle.bindPopup('Margem de erro');
	},
};

export { App };
