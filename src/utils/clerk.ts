import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import * as SecureStore from "expo-secure-store";

export const tokenCache: TokenCache = {
  getToken: (key) => {
    return SecureStore.getItemAsync(key);
  },
  saveToken: (key, value) => {
    return SecureStore.setItemAsync(key, value);
  },
};
