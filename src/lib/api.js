// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Fetch all homepage data
export async function getHomepageData() {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch homepage data');
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}

// Fetch specific section
export async function getSection(key) {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/sections/${key}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch section: ${key}`);
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error(`Error fetching section ${key}:`, error);
    return null;
  }
}

// Fetch services
export async function getServices() {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/services`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Fetch settings
export async function getSettings() {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }

    const data = await response.json();
    return data.success ? data.data : {};
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
}

// Auth functions
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'حدث خطأ في الاتصال' };
  }
}

// Admin API functions
export async function updateSection(key, content, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/sections/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating section:', error);
    return { success: false, message: 'حدث خطأ' };
  }
}

// Generic CRUD functions for admin
export async function createItem(endpoint, data, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(`Error creating ${endpoint}:`, error);
    return { success: false, message: 'حدث خطأ' };
  }
}

export async function updateItem(endpoint, id, data, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    return { success: false, message: 'حدث خطأ' };
  }
}

export async function deleteItem(endpoint, id, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error(`Error deleting ${endpoint}:`, error);
    return { success: false, message: 'حدث خطأ' };
  }
}

// Get all admin data
export async function getAdminData(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/admin/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return null;
  }
}
