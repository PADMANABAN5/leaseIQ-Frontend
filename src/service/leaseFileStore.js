const DB_NAME = "leaseiq";
const DB_VERSION = 1;
const STORE_NAME = "leaseFiles";

const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const withStore = async (mode, fn) => {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);
    const result = await fn(store);

    await new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });

    return result;
  } finally {
    db.close();
  }
};

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `lease_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const saveLeaseFile = async (file) => {
  if (!file) throw new Error("No file provided");

  const record = {
    id: generateId(),
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
    blob: file,
    createdAt: Date.now(),
  };

  await withStore("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });

  return {
    id: record.id,
    name: record.name,
    type: record.type,
    size: record.size,
    lastModified: record.lastModified,
  };
};

export const getLeaseFile = async (id) => {
  if (!id) return null;

  return withStore("readonly", (store) => {
    return new Promise((resolve, reject) => {
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  });
};

export const deleteLeaseFile = async (id) => {
  if (!id) return;

  await withStore("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
};
