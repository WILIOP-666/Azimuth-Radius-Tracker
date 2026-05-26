import { TelemetryData } from '../types';

let intervalId: any = null;

// Initial mock data based on provided example
const baseData: TelemetryData = {
  device_id: 'A102',
  latitude: -8.6705,
  longitude: 115.2126,
  azimuth: 132,
  radius: 450,
  speed: 21.4,
  altitude: 18,
  accuracy: 8,
  signal_strength: -73,
  operator: 'Telkomsel',
  battery: 82,
  timestamp: new Date().toISOString(),
  status: 'online',
};

// Simple random walk
const generateNextTelemetry = (current: TelemetryData): TelemetryData => {
  const newLat = current.latitude + (Math.random() - 0.5) * 0.0001;
  const newLng = current.longitude + (Math.random() - 0.5) * 0.0001;

  // Slowly change azimuth
  let newAzimuth = current.azimuth + (Math.random() - 0.5) * 10;
  if (newAzimuth < 0) newAzimuth += 360;
  if (newAzimuth >= 360) newAzimuth -= 360;

  // Fluctuate speed between 0 and 60
  let newSpeed = current.speed + (Math.random() - 0.5) * 5;
  if (newSpeed < 0) newSpeed = 0;
  if (newSpeed > 60) newSpeed = 60;

  // Radius change
  let newRadius = current.radius + (Math.random() - 0.5) * 20;
  if (newRadius < 100) newRadius = 100;

  // Battery decay slowly
  let newBattery = current.battery - (Math.random() * 0.1);
  if (newBattery < 0) newBattery = 0;

  // Fluctuate signal
  let newSignal = current.signal_strength + (Math.random() - 0.5) * 5;
  if (newSignal > -40) newSignal = -40;
  if (newSignal < -110) newSignal = -110;

  return {
    ...current,
    latitude: newLat,
    longitude: newLng,
    azimuth: Math.round(newAzimuth),
    radius: Math.round(newRadius),
    speed: parseFloat(newSpeed.toFixed(1)),
    battery: Math.round(newBattery),
    signal_strength: Math.round(newSignal),
    timestamp: new Date().toISOString(),
  };
};

export class MockTelemetryService {
  private currentData: TelemetryData = { ...baseData };
  private onUpdateCallback: ((data: TelemetryData) => void) | null = null;
  private onStatusChangeCallback: ((status: 'online' | 'offline' | 'connecting') => void) | null = null;

  connect(
    onUpdate: (data: TelemetryData) => void,
    onStatusChange: (status: 'online' | 'offline' | 'connecting') => void
  ) {
    this.onUpdateCallback = onUpdate;
    this.onStatusChangeCallback = onStatusChange;

    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback('connecting');
    }

    setTimeout(() => {
      if (this.onStatusChangeCallback) {
        this.onStatusChangeCallback('online');
      }
      this.startGenerating();
    }, 1000);
  }

  disconnect() {
    this.stopGenerating();
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback('offline');
    }
  }

  private startGenerating() {
    this.stopGenerating(); // Ensure no duplicates

    // Initial update
    if (this.onUpdateCallback) {
      this.onUpdateCallback(this.currentData);
    }

    intervalId = setInterval(() => {
      this.currentData = generateNextTelemetry(this.currentData);

      // Simulate random small disconnections
      if (Math.random() > 0.98) {
        if (this.onStatusChangeCallback) this.onStatusChangeCallback('connecting');
        setTimeout(() => {
          if (this.onStatusChangeCallback) this.onStatusChangeCallback('online');
        }, 2000);
      } else {
        if (this.onUpdateCallback) {
          this.onUpdateCallback(this.currentData);
        }
      }

    }, 1000); // 1 update per second
  }

  private stopGenerating() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
}

export const telemetryService = new MockTelemetryService();
