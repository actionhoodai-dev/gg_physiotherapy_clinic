"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/firestore";
import { BlogPostItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { slugify, formatDate } from "@/lib/utils";

const EMPTY_POST: Partial<BlogPostItem> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
  author: "Dr. Sundaravalli Jayakumar",
  category: "Orthopedic Care",
  tags: ["Physiotherapy", "Chennai", "Rehab"],
  seoTitle: "",
  metaDescription: "",
  published: true,
};

export default function AdminBlogPage() {
  const { success, error: toastError } = useToast();
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<BlogPostItem>>(EMPTY_POST);
  const [tagsInput, setTagsInput] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<BlogPostItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      toastError("Failed to load blog articles");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingPost(null);
    setForm({
      ...EMPTY_POST,
      id: `post-${Date.now()}`,
    });
    setTagsInput("Physiotherapy, Rehab, Spine Health");
    setModalOpen(true);
  }

  function openEdit(post: BlogPostItem) {
    setEditingPost(post);
    setForm({ ...post });
    setTagsInput(post.tags?.join(", ") || "");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title?.trim() || !form.excerpt?.trim() || !form.content?.trim()) {
      toastError("Title, excerpt, and content are required");
      return;
    }

    setSaving(true);
    try {
      const slug = form.slug?.trim() ? slugify(form.slug) : slugify(form.title);
      const tagsArray = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const postToSave: BlogPostItem = {
        id: editingPost?.id || form.id || `post-${Date.now()}`,
        title: form.title.trim(),
        slug,
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        featuredImage: form.featuredImage || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
        author: form.author?.trim() || "Dr. Sundaravalli Jayakumar",
        category: form.category?.trim() || "Physical Therapy",
        tags: tagsArray,
        seoTitle: form.seoTitle?.trim() || `${form.title.trim()} | GG Physiotherapy Clinic Chennai`,
        metaDescription: form.metaDescription?.trim() || form.excerpt.trim(),
        published: form.published ?? true,
        publishedAt: editingPost?.publishedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveBlogPost(postToSave);

      if (editingPost) {
        setPosts((prev) => prev.map((p) => (p.id === postToSave.id ? postToSave : p)));
        success("Article updated successfully");
      } else {
        setPosts((prev) => [postToSave, ...prev]);
        success("New article published");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toastError("Failed to save blog post");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteBlogPost(deleteTarget.id);
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      success("Article deleted");
      setDeleteTarget(null);
    } catch (err) {
      toastError("Failed to delete article");
    }
  }

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-teal-600" />
            Health Articles & Patient Education
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Write guides on ergonomic posture, sports injury recovery, and orthopedic care in Chennai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            Write New Article
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, topic, or category..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-600 mb-2" />
            Loading articles...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-semibold">No articles found</p>
            <p className="text-xs text-slate-400 mt-1">
              Publish patient guides and physio rehabilitation tips
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3.5">Article</th>
                  <th className="px-4 py-3.5">Category & Author</th>
                  <th className="px-4 py-3.5">Published Date</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {post.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {post.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                        {post.category}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-1">{post.author}</div>
                    </td>

                    <td className="px-4 py-3.5 text-xs text-slate-500">
                      {formatDate(post.publishedAt)}
                    </td>

                    <td className="px-4 py-3.5">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <XCircle className="w-3.5 h-3.5" /> Draft
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-600 hover:text-teal-600 hover:bg-slate-100 rounded-lg"
                          title="Preview Article"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => openEdit(post)}
                          className="p-1.5 text-slate-600 hover:text-teal-600 hover:bg-slate-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteTarget(post)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingPost ? "Edit Article" : "Write Health Article"}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Article Title *
              </label>
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm({
                    ...form,
                    title,
                    slug: form.slug ? form.slug : slugify(title),
                  });
                }}
                placeholder="e.g. Ergonomics for IT Professionals in OMR Chennai: Preventing Neck Strain"
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={form.slug || ""}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  placeholder="ergonomics-it-professionals-omr-chennai"
                  className="w-full text-xs font-mono border border-slate-300 rounded-lg p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  value={form.category || ""}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Ergonomics & Posture"
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Featured Cover Image (Cloudinary / URL) *
              </label>
              <CloudinaryUploader
                value={form.featuredImage || ""}
                onChange={(url: string) => setForm({ ...form, featuredImage: url })}
                folder="gg_physio/blog"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Excerpt (Summary for Cards & Previews) *
              </label>
              <textarea
                value={form.excerpt || ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Brief summary of the advice and guidance shared in this article..."
                rows={2}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Article Body Content (Markdown / Text) *
              </label>
              <textarea
                value={form.content || ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write detailed rehabilitation advice, diagrams, tips, and exercises..."
                rows={8}
                className="w-full text-xs font-mono border border-slate-300 rounded-lg p-2.5"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={form.author || ""}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Posture, Neck Pain, Ergonomics"
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={form.published ?? true}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                Publish immediately on website
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 rounded-lg hover:bg-teal-300 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingPost ? "Update Article" : "Publish Article"}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteTarget(null)}
          title="Delete Article"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
