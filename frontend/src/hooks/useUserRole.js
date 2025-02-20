import { useState, useEffect } from "react";
import { supabase } from "../common/supabaseClient";

const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      setLoading(true);
      try {
        // Get the authenticated user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setError("Failed to fetch user.");
          setLoading(false);
          return;
        }

        // Fetch the user's role from the profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", user.email)
          .single();

        if (profileError) {
          setError("Failed to fetch user role.");
        } else {
          setRole(profile.role);
        }
      } catch (err) {
        setError("An unexpected error occurred." + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading, error };
};

export default useUserRole;
