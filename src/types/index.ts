export interface TelemetryData {
  device_id: string;
  latitude: number;
  longitude: number;
  azimuth: number;
  radius: number;
  speed: number;
  altitude: number;
  accuracy: number;
  signal_strength: number;
  operator: string;
  battery: number;
  timestamp: string;
  status: 'online' | 'offline';
}

export type ConnectionStatus = 'online' | 'offline' | 'connecting';
export type MapMode = 'live' | 'history';
