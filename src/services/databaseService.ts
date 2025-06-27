/**
 * Database Service
 * 
 * This service handles communication with the backend proxy.php 
 * to store data in the MySQL database
 */

import { UTMParams } from './utmService';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  companyName: string;
  industry?: string;
  domain?: string;
}

interface ConversionData {
  userData: UserData;
  utmData: UTMParams;
  conversionType: string;
  timestamp?: string;
}

/**
 * Send user and UTM data to the MySQL database via proxy.php
 */
const saveConversion = async (data: ConversionData): Promise<{ success: boolean; message: string }> => {
  try {
    // Add timestamp if not provided
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString();
    }
    
    const response = await fetch('/proxy.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving conversion data:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const databaseService = {
  saveConversion,
};

export default databaseService;
