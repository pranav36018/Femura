/**
 * Abstracted API Client for Femura Pharma Frontend
 * Currently configured with realistic mock adapters and network latency.
 * When the client/backend team is ready, simply toggle USE_MOCK to false
 * and set the API_BASE_URL to connect to the production REST or GraphQL server.
 */

const USE_MOCK = true;
const API_BASE_URL = "https://api.femurapharma.com/v1";
const DEFAULT_DELAY = 150; // ms to simulate realistic modern edge API response

export const apiClient = {
  async get(endpoint, params = {}) {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, DEFAULT_DELAY));
      // Handled by individual services
      return null;
    }
    
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  async post(endpoint, data = {}) {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, DEFAULT_DELAY * 1.5));
      return {
        success: true,
        data,
        referenceId: `FEM-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString()
      };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
};
