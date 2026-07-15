

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import api from "../../services/api";
import PageHeader from "../../components/common/PageHeader.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get("/auth/profile");
        setProfile(response.data);
      } catch (error) {
        const message =
          error?.response?.data?.message || "Failed to load profile";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loader text="Loading profile..." />;
  }

  if (!profile) {
    return <EmptyState title="My Profile" message="Profile not found." />;
  }

  const fields = [
    { label: "Full Name", value: profile.name },
    { label: "Email Address", value: profile.email },
    { label: "Role", value: profile.role, capitalize: true },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="My Profile" subtitle="View your account information" />

      <div className="bg-white rounded-2xl border border-camel/25 shadow-sm shadow-ink/5 overflow-hidden mt-6">
        {/* Header strip */}
        <div className="bg-wine px-8 py-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-bone/90 flex items-center justify-center font-display text-2xl text-wine">
            {profile.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="font-display text-xl text-white">{profile.name}</p>
            <p className="text-bone/70 text-sm">{profile.email}</p>
          </div>
        </div>

        <div className="p-8 space-y-5">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between border-b border-ink/10 pb-4 last:border-b-0 last:pb-0"
            >
              <p className="text-sm text-taupe tracking-wide uppercase">
                {field.label}
              </p>
              <p
                className={`text-base font-medium text-ink ${
                  field.capitalize ? "capitalize" : ""
                }`}
              >
                {field.value}
              </p>
            </div>
          ))}

          <div className="flex items-center justify-between pt-1">
            <p className="text-sm text-taupe tracking-wide uppercase">
              Account Status
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-wine bg-wine/10 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-wine" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;