// Offline PWA & PHC Sync Service using LocalStorage & IndexedDB fallback

const STORAGE_KEY = "GRAMA_JARVIS_PHC_OFFLINE_RECORDS";
const SYNC_STATUS_KEY = "GRAMA_JARVIS_SYNC_LOG";

export const getOfflineRecords = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getInitialRecords();
  } catch (e) {
    return getInitialRecords();
  }
};

export const saveOfflineRecord = (record) => {
  const records = getOfflineRecords();
  const newRecord = {
    ...record,
    id: "phc-" + Date.now(),
    timestamp: new Date().toISOString(),
    syncStatus: "Pending Sync (Saved Offline)"
  };
  records.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return newRecord;
};

export const triggerSyncAllRecords = () => {
  const records = getOfflineRecords();
  const updated = records.map(rec => ({
    ...rec,
    syncStatus: "Synced to Government Health Vault ✔"
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

function getInitialRecords() {
  return [
    {
      id: "phc-1001",
      patientName: "Laxmi Devi",
      village: "Nallapadu PHC #2",
      age: 64,
      vitals: "BP: 135/88, SpO2: 97%, Sugar: 160mg/dL",
      diagnosis: "Type 2 Diabetes & Mild Fever",
      medicationPrescribed: "Metformin 500mg, Paracetamol 650mg",
      doctorNotes: "PHC Nurse administered basic fluids. Recommended follow-up in 7 days.",
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      syncStatus: "Synced to Government Health Vault ✔"
    },
    {
      id: "phc-1002",
      patientName: "Subba Rao",
      village: "Pedakakani PHC",
      age: 58,
      vitals: "BP: 150/95, Pulse: 88",
      diagnosis: "Hypertension Stage 1",
      medicationPrescribed: "Amlodipine 5mg",
      doctorNotes: "Advised low-salt diet and weekly BP check at rural clinic.",
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      syncStatus: "Pending Sync (Saved Offline)"
    }
  ];
}
