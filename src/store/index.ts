import { create } from 'zustand';
import { TelemetryData, ConnectionStatus, MapMode } from '../types';

interface AppState {
  selectedDeviceId: string | null;
  connectionStatus: ConnectionStatus;
  lastUpdated: string | null;
  isTracking: boolean;
  mapMode: MapMode;
  telemetry: TelemetryData | null;
  devices: TelemetryData[];

  // Actions
  setSelectedDevice: (id: string | null) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setIsTracking: (isTracking: boolean) => void;
  setMapMode: (mode: MapMode) => void;
  updateTelemetry: (data: TelemetryData) => void;
  updateDevicesList: (devices: TelemetryData[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedDeviceId: null,
  connectionStatus: 'offline',
  lastUpdated: null,
  isTracking: false,
  mapMode: 'live',
  telemetry: null,
  devices: [],

  setSelectedDevice: (id) => set({ selectedDeviceId: id }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  setIsTracking: (isTracking) => set({ isTracking }),
  setMapMode: (mode) => set({ mapMode: mode }),
  updateTelemetry: (data) => set((state) => ({
    telemetry: data,
    lastUpdated: data.timestamp,
    // Update the device in the list if it exists
    devices: state.devices.map(d => d.device_id === data.device_id ? data : d)
  })),
  updateDevicesList: (devices) => set({ devices }),
}));
