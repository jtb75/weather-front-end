import { LitElement, html, css } from 'lit';

// Fetch the backend URL from a global variable or use a default
const BACKEND_URL = 'http://weather-interaction-service.weather-wizard.svc.cluster.local';

export class MyElement extends LitElement {
  // Define CSS styles for the component
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      height: 100vh;
      width: 100vw;
      background-image: url('/background-simple.jpg');
      background-size: cover;
      background-position: center;
      color: #fff;
      text-align: center;
      padding-top: 50px;
    }
    .logo {
      width: 150px;
      margin-bottom: 20px;
    }
    .input-container {
      margin-top: 20px;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 300px;
      margin-right: 10px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    .weather-details {
      margin-top: 30px;
    }
  `;

  // Define reactive properties for the component
  static properties = {
    city: { type: String }, // Stores the input city name
    weatherData: { type: Object }, // Stores the fetched weather data
  };

  constructor() {
    super();
    this.city = ''; // Initialize the city as an empty string
    this.weatherData = null; // Initialize the weather data as null
  }

  // Fetch weather data from the backend service
  async fetchWeather() {
    const response = await fetch(`${BACKEND_URL}/interact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: this.city }), // Send the city name in the request body
    });
    this.weatherData = await response.json(); // Parse and store the weather data
  }

  // Render the HTML structure of the component
  render() {
    return html`
      <h1>Welcome to Weather Wizard</h1>
      <div class="input-container">
        <input
          type="text"
          .value="${this.city}"
          @input="${(e) => (this.city = e.target.value)}" // Update the city property on input
          placeholder="Enter city name"
        />
        <button @click="${this.fetchWeather}">Get Weather</button> <!-- Trigger fetchWeather on click -->
      </div>

      ${this.weatherData
        ? html`
            <div class="weather-details">
              <h2>Weather Details</h2>
              <p><strong>Temperature:</strong> ${this.weatherData.temperature}°C</p>
              <p><strong>Weather:</strong> ${this.weatherData.weather}</p>
              <p><strong>Wind Speed:</strong> ${this.weatherData.wind_speed} m/s</p>
              <ul>
                <!-- Display weather insights as a list -->
                ${this.weatherData.insights.map((insight) => html`<li>${insight}</li>`)}
              </ul>
            </div>
          `
        : ''}
    `;
  }
}

// Define the custom element
customElements.define('my-element', MyElement);

