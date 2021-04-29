import { Requester } from './Requester.js';

const App = {
	Start() {
		App.View();
	},
	async View() {
		const data = await Requester.requestData();
		const infoElement = document.querySelector('main .info');


		const html = `
    <div class="text-info">
      <div><strong>IP Público:</strong><span>${data.ip_address}</span></div>
      <div>
        <strong>Provedor:</strong
        ><span title=${data.connection.organization_name}>${data.connection.organization_name}</span>
      </div>
      <div><strong>Cidade:</strong><span>${data.city} / ${data.region_iso_code}</span></div>
      <div><strong>País:</strong><span>${data.country} ${data.flag.emoji}</span></div>
      <div><strong>Horário atual:</strong><span>${data.timezone.current_time}</span></div>
      <div><strong>É uma VPN:</strong><span>${data.security.is_vpn ? 'Sim' : 'Não'}</span></div>
    </div>
    
    <div class="localization-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3742.6851404678705!2d${data.longitude}!3d${data.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1619666668069!5m2!1spt-BR!2sbr"
        width="350"
        height="350"
        style="border: 0"
        allowfullscreen=""
        loading="lazy">
      </iframe>
    </div>
  `;
		infoElement.innerHTML = html;
	},
};

export { App };
