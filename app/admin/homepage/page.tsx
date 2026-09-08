"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { getHomepageCMS, updateHomepageCMS } from "@/lib/firestore";
import { HomepageCMS } from "@/types";
import { defaultHomepageCMS } from "@/lib/defaultData";
import { useToast } from "@/components/ui/Toast";

export default function AdminHomepageCMSPage() {
  const { success, error: toastError } = useToast();
  const [cms, setCms] = useState<HomepageCMS>(defaultHomepageCMS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getHomepageCMS();
      setCms(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHomepageCMS(cms);
      success("Homepage content updated successfully!");
    } catch (err: any) {
      toastError(err.message || "Failed to update homepage CMS");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-xs text-slate-500">Loading Homepage CMS...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Homepage CMS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Edit the headlines, hero image, trust statistics, and conversion banners displayed on the main homepage.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0e3b43] text-white font-semibold text-xs hover:bg-[#092b31] disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Hero Section Content */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Hero Section
        </h2>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Top Badge Text</label>
            <input
              type="text"
              value={cms.hero.badge}
              onChange={(e) =>
                setCms({ ...cms, hero: { ...cms.hero, badge: e.target.value } })
              }
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Hero Main Title</label>
            <input
              type="text"
              value={cms.hero.title}
              onChange={(e) =>
                setCms({ ...cms, hero: { ...cms.hero, title: e.target.value } })
              }
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Hero Subtitle</label>
            <textarea
              rows={3}
              value={cms.hero.subtitle}
              onChange={(e) =>
                setCms({ ...cms, hero: { ...cms.hero, subtitle: e.target.value } })
              }
              className="w-full p-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Hero Image URL</label>
            <input
              type="text"
              value={cms.hero.heroImage}
              onChange={(e) =>
                setCms({ ...cms, hero: { ...cms.hero, heroImage: e.target.value } })
              }
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Primary CTA Label</label>
              <input
                type="text"
                value={cms.hero.primaryCtaText}
                onChange={(e) =>
                  setCms({
                    ...cms,
                    hero: { ...cms.hero, primaryCtaText: e.target.value },
                  })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Secondary CTA Label</label>
              <input
                type="text"
                value={cms.hero.secondaryCtaText}
                onChange={(e) =>
                  setCms({
                    ...cms,
                    hero: { ...cms.hero, secondaryCtaText: e.target.value },
                  })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Clinic Section CMS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          About Clinic Narrative
        </h2>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Section Title</label>
            <input
              type="text"
              value={cms.aboutClinic.title}
              onChange={(e) =>
                setCms({
                  ...cms,
                  aboutClinic: { ...cms.aboutClinic, title: e.target.value },
                })
              }
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Paragraph 1</label>
            <textarea
              rows={3}
              value={cms.aboutClinic.paragraph1}
              onChange={(e) =>
                setCms({
                  ...cms,
                  aboutClinic: { ...cms.aboutClinic, paragraph1: e.target.value },
                })
              }
              className="w-full p-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Paragraph 2</label>
            <textarea
              rows={3}
              value={cms.aboutClinic.paragraph2}
              onChange={(e) =>
                setCms({
                  ...cms,
                  aboutClinic: { ...cms.aboutClinic, paragraph2: e.target.value },
                })
              }
              className="w-full p-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Bottom Conversion Banner
        </h2>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Banner Title</label>
            <input
              type="text"
              value={cms.finalCta.title}
              onChange={(e) =>
                setCms({
                  ...cms,
                  finalCta: { ...cms.finalCta, title: e.target.value },
                })
              }
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Banner Subtitle</label>
            <input
              type="text"
              value={cms.finalCta.subtitle}
              onChange={(e) =>
                setCms({
                  ...cms,
                  finalCta: { ...cms.finalCta, subtitle: e.target.value },
                })
              }
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
