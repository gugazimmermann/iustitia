import { api } from "@iustitia/site/auth";
import { errorHandler } from "@iustitia/site/shared-utils";

export async function setProfile(profile: FormData) {
  console.log("setProfile", profile)
  try {
    const { data } = await api.post("/api/profile", profile);
    console.log("post data", data)
    return data
  } catch (err) {
    return errorHandler(err)
  }
};
