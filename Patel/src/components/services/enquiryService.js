const BASE_URL = 'http://localhost:8000/api/v1';

export const createEnquiry = async (enquiryData) => {
  try {
    const response = await fetch(`${BASE_URL}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryData)
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};