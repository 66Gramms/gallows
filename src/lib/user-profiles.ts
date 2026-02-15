import { supabase } from "./supabase";
import type { PostgrestError } from "@supabase/supabase-js";

export interface UserProfile {
  user_id: string;
  is_admin: boolean;
}

export interface UserProfileResponse {
  profile: UserProfile | null;
  error: PostgrestError | null;
}

export const userProfileEndpoints = {
  async getUserProfile(userId: string): Promise<UserProfileResponse> {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    return { profile: data, error };
  },

  async isAdmin(userId: string): Promise<boolean> {
    const { profile } = await this.getUserProfile(userId);
    return profile?.is_admin ?? false;
  },
};
