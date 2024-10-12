import axios from 'axios';

const API_URL = 'https://your-pythonanywhere-api-url.com';

export const checkInstalledApps = async (appList) => {
  try {
    const response = await axios.post(`${API_URL}/check-apps`, { apps: appList });
    return response.data;
  } catch (error) {
    console.error('Error checking apps:', error);
    throw error;
  }
};
