class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.city = '';
    this.weatherData = null;
    this.showClouds = false;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  async fetchWeather() {
    const backendUrl = 'https://api.weather.k8s.ng20.org';
    console.log(`Fetching weather data for city: ${this.city}`);

    this.showClouds = true; // Show clouds when the button is pressed
    this.render(); // Re-render to show the clouds

    try {
      const response = await fetch(`${backendUrl}/interact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: this.city }),
      });

      if (!response.ok) {
        console.error(`Failed to fetch weather data. Status: ${response.status}`);
        this.showClouds = false; // Hide clouds if there's an error
        this.render();
        return;
      }

      this.weatherData = await response.json();
      console.log('Weather data received:', this.weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setTimeout(() => {
        this.showClouds = false; // Hide clouds after the animation
        this.render();
      }, 2000); // Match the duration of the animation
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
          text-align: center;
          background: linear-gradient(to top, #000000, #191970); /* Black to midnight blue gradient */
          min-height: 100vh;
          margin: 0;
          padding: 20px;
        }

        h1 {
          color: #FFD700; /* Light color for contrast */
        }

        .crystal-ball {
          position: relative;
          margin: 20px auto;
          width: 500px; /* Increased size */
          height: 500px; /* Increased size */
          border-radius: 50%;
          background: url('./public/crystal-ball.png') no-repeat center center;
          background-size: cover;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .clouds {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('./public/clouds.png') repeat;
          background-size: cover; /* Ensure the clouds scale nicely */
          z-index: 10;
          opacity: 1;
          transition: opacity 2s ease-in-out;
          animation: spin 4s linear infinite; /* Add spinning animation */
        }

        .clouds.hidden {
          opacity: 0;
          pointer-events: none;
          animation: none; /* Stop spinning when hidden */
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          padding: 20px;
          font-size: 16px; /* Adjusted for better readability */
          text-align: center;
        }

        .details {
          margin-top: 20px;
        }

        input {
          padding: 10px;
          font-size: 16px;
          margin-right: 10px;
        }

        input::placeholder {
          color: #999;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
      </style>
      <div>
        <h1>Weather Wizard</h1>
        <div>
          <input
            id="city"
            type="text"
            placeholder="Enter city name"
            value="${this.city}"
            oninput="this.getRootNode().host.city = this.value"
          />
          <button onclick="this.getRootNode().host.fetchWeather()">Get Weather</button>
        </div>
        <div class="crystal-ball">
          <div class="clouds ${this.showClouds ? '' : 'hidden'}"></div>
          <div class="content">
            ${this.weatherData
              ? `<div class="details">
                  <h2>Weather Details</h2>
                  <p><strong>Temperature:</strong> ${this.weatherData.temperature}°C</p>
                  <p><strong>Weather:</strong> ${this.weatherData.weather}</p>
                  <p><strong>Wind Speed:</strong> ${this.weatherData.wind_speed} m/s</p>
                  <p>
                    ${this.weatherData.insights
                      .map((insight) => `${insight}`)
                      .join('')}
                  </p>
                </div>`
              : '<p>Enter a city to see the forecast.</p>'}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('my-element', MyElement);

