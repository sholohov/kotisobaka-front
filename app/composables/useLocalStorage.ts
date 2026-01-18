interface StorageOptions<T> {
  default?: () => T;
  expires?: Date;
  maxAge?: number; // в секундах
  storage?: 'local' | 'session'; // выбор типа хранилища
}

interface StoragePayload<T> {
  value: T;
  expiry: number | null;
}

export function useLocalStorage<T>(
  key: string,
  options: StorageOptions<T> = {},
): Ref<T> {
  const { storage = 'local' } = options;
  // Инициализируем ref значением по умолчанию (безопасно для SSR)
  const defaultValue = options.default ? options.default() : (undefined as unknown as T);
  const data = ref(defaultValue) as Ref<T>;
  // Определяем провайдер хранилища
  const getStorage = () => (storage === 'session' ? window.sessionStorage : window.localStorage);

  const getExpiryTime = (): number | null => {
    if (options.expires) return options.expires.getTime();
    if (options.maxAge) return Date.now() + options.maxAge * 1000;

    return null;
  };

  const readFromStorage = (): T => {
    try {
      const s = getStorage();
      const raw = s.getItem(key);

      if (!raw) return defaultValue;

      const payload: StoragePayload<T> = JSON.parse(raw);

      // Проверка TTL (актуально в основном для LocalStorage, так как Session очистится сама при закрытии вкладки)
      if (payload.expiry && Date.now() > payload.expiry) {
        s.removeItem(key);

        return defaultValue;
      }

      return payload.value;
    } catch {
      return defaultValue;
    }
  };

  const writeToStorage = (newValue: T) => {
    const s = getStorage();

    if (newValue === null || newValue === undefined) {
      s.removeItem(key);
    } else {
      const payload: StoragePayload<T> = {
        value: newValue,
        expiry: getExpiryTime(),
      };

      s.setItem(key, JSON.stringify(payload));
    }
  };

  const handleStorageChange = (event: StorageEvent) => {
    // Событие storage работает только для localStorage между вкладками
    if (event.key === key && event.storageArea === localStorage) {
      data.value = event.newValue ? readFromStorage() : defaultValue;
    }
  };

  onMounted(() => {
    // Читаем реальное значение после гидратации
    data.value = readFromStorage();

    // Запускаем слежение за изменениями
    watch(data, (newValue) => {
      writeToStorage(newValue);
    }, { deep: true });

    // Слушаем изменения из других вкладок (только для local)
    if (storage === 'local') {
      window.addEventListener('storage', handleStorageChange);
    }
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined' && storage === 'local') {
      window.removeEventListener('storage', handleStorageChange);
    }
  });

  return data;
}
