import { api } from "../..";
import { errorHandler } from "@iustitia/site/shared-utils";

export async function updateProfile(profile: FormData) {
  try {
    const { data } = await api.put("/api/profile", profile);
    return data
  } catch (err) {
    return errorHandler(err)
  }
};

export async function getProfile() {
  try {
    const { data } = await api.get("/api/profile");
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
