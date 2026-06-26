"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Bot,
    Plus,
    Pencil,
    Trash2,
    X,
    Loader2,
    Search,
    Save,
    AlertTriangle,
} from "lucide-react";

interface AIAgent {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    category: string;
    businessFunction: string | null;
    domain: string | null;
    industry: string | null;
    status: string;
    iconColor: string;
    order: number;
}

const EMPTY_FORM = {
    name: "",
    slug: "",
    tagline: "",
    description: "",
    category: "Alpha Dev",
    businessFunction: "",
    domain: "",
    industry: "",
    status: "LIVE",
    iconColor: "#4A5D4E",
    order: 0,
};

export default function AIAgentManager() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    const [agents, setAgents] = useState<AIAgent[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ ...EMPTY_FORM });

    // Delete confirm
    const [confirmDelete, setConfirmDelete] = useState<AIAgent | null>(null);

    const fetchAgents = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/ai-agents`, { credentials: "include" });
            const data = await res.json();
            setAgents(Array.isArray(data) ? data : []);
        } catch {
            setAgents([]);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchAgents();
    }, [fetchAgents]);

    const openCreate = () => {
        setEditingId(null);
        setForm({ ...EMPTY_FORM });
        setModalOpen(true);
    };

    const openEdit = (agent: AIAgent) => {
        setEditingId(agent.id);
        setForm({
            name: agent.name,
            slug: agent.slug,
            tagline: agent.tagline,
            description: agent.description,
            category: agent.category,
            businessFunction: agent.businessFunction || "",
            domain: agent.domain || "",
            industry: agent.industry || "",
            status: agent.status,
            iconColor: agent.iconColor,
            order: agent.order,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingId(null);
    };

    const handleSave = async () => {
        if (!form.name.trim() || !form.tagline.trim()) return;
        setSaving(true);
        try {
            const payload = {
                ...form,
                order: Number(form.order),
                businessFunction: form.businessFunction || null,
                domain: form.domain || null,
                industry: form.industry || null,
            };

            if (editingId) {
                await fetch(`${API_URL}/api/ai-agents/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                });
            } else {
                await fetch(`${API_URL}/api/ai-agents`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                });
            }
            closeModal();
            fetchAgents();
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (agent: AIAgent) => {
        setDeleting(agent.id);
        try {
            await fetch(`${API_URL}/api/ai-agents/${agent.id}`, {
                method: "DELETE",
                credentials: "include",
            });
            setConfirmDelete(null);
            fetchAgents();
        } finally {
            setDeleting(null);
        }
    };

    const filtered = agents.filter(
        (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            (a.businessFunction ?? "").toLowerCase().includes(search.toLowerCase()) ||
            (a.domain ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const Field = ({
        label,
        children,
    }: {
        label: string;
        children: React.ReactNode;
    }) => (
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                {label}
            </label>
            {children}
        </div>
    );

    const inputClass =
        "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-indigo-400 bg-gray-50";

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                            AI Agents
                        </h2>
                        <p className="text-xs text-gray-500">
                            {agents.length} agents in portfolio
                        </p>
                    </div>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Agent
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search agents by name, function, or domain..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 bg-white"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Agent
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Function / Domain
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Status
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Order
                                    </th>
                                    <th className="px-5 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map((agent) => (
                                    <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                    style={{ backgroundColor: `${agent.iconColor}20` }}
                                                >
                                                    <div
                                                        className="w-2.5 h-2.5 rounded-full"
                                                        style={{ backgroundColor: agent.iconColor }}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{agent.name}</p>
                                                    <p className="text-xs text-gray-400 max-w-xs truncate">
                                                        {agent.tagline}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-gray-700">
                                                {agent.businessFunction || "—"}
                                            </p>
                                            <p className="text-xs text-gray-400">{agent.domain || ""}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${agent.status === "LIVE"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-amber-50 text-amber-700"
                                                    }`}
                                            >
                                                {agent.status === "LIVE" ? "Live" : "Coming Soon"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 font-mono text-xs">
                                            {agent.order}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 justify-end">
                                                <button
                                                    onClick={() => openEdit(agent)}
                                                    className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete(agent)}
                                                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-16 text-gray-400">
                                            No agents found. Try adjusting your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Create / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h3 className="font-black text-gray-900 uppercase tracking-tight">
                                {editingId ? "Edit Agent" : "New Agent"}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Name *">
                                    <input
                                        className={inputClass}
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                name: e.target.value,
                                                slug: editingId
                                                    ? f.slug
                                                    : e.target.value
                                                        .toLowerCase()
                                                        .replace(/ /g, "-")
                                                        .replace(/[^\w-]+/g, ""),
                                            }))
                                        }
                                        placeholder="Sales Assistant Agent"
                                    />
                                </Field>
                                <Field label="Slug">
                                    <input
                                        className={inputClass}
                                        value={form.slug}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, slug: e.target.value }))
                                        }
                                        placeholder="sales-assistant-agent"
                                    />
                                </Field>
                            </div>

                            <Field label="Tagline *">
                                <input
                                    className={inputClass}
                                    value={form.tagline}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, tagline: e.target.value }))
                                    }
                                    placeholder="Short one-line description"
                                />
                            </Field>

                            <Field label="Description">
                                <textarea
                                    className={`${inputClass} resize-none`}
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, description: e.target.value }))
                                    }
                                    placeholder="Detailed description of what this agent does..."
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Category">
                                    <input
                                        className={inputClass}
                                        value={form.category}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, category: e.target.value }))
                                        }
                                        placeholder="Alpha Dev"
                                    />
                                </Field>
                                <Field label="Business Function">
                                    <input
                                        className={inputClass}
                                        value={form.businessFunction}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, businessFunction: e.target.value }))
                                        }
                                        placeholder="Sales / Finance / HR..."
                                    />
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Domain">
                                    <input
                                        className={inputClass}
                                        value={form.domain}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, domain: e.target.value }))
                                        }
                                        placeholder="ERP & Finance"
                                    />
                                </Field>
                                <Field label="Industry">
                                    <input
                                        className={inputClass}
                                        value={form.industry}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, industry: e.target.value }))
                                        }
                                        placeholder="Manufacturing"
                                    />
                                </Field>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <Field label="Status">
                                    <select
                                        className={inputClass}
                                        value={form.status}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, status: e.target.value }))
                                        }
                                    >
                                        <option value="LIVE">Live</option>
                                        <option value="COMING_SOON">Coming Soon</option>
                                    </select>
                                </Field>
                                <Field label="Icon Color">
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="color"
                                            value={form.iconColor}
                                            onChange={(e) =>
                                                setForm((f) => ({ ...f, iconColor: e.target.value }))
                                            }
                                            className="w-10 h-9 rounded cursor-pointer border border-gray-200"
                                        />
                                        <input
                                            className={`${inputClass} flex-1`}
                                            value={form.iconColor}
                                            onChange={(e) =>
                                                setForm((f) => ({ ...f, iconColor: e.target.value }))
                                            }
                                        />
                                    </div>
                                </Field>
                                <Field label="Order">
                                    <input
                                        type="number"
                                        className={inputClass}
                                        value={form.order}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, order: Number(e.target.value) }))
                                        }
                                    />
                                </Field>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {saving ? "Saving..." : "Save Agent"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="font-black text-gray-900 text-lg mb-2">Delete Agent?</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            <span className="font-bold text-gray-700">{confirmDelete.name}</span> will be permanently removed from the portfolio.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-6 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(confirmDelete)}
                                disabled={!!deleting}
                                className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 disabled:opacity-60 transition-colors"
                            >
                                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
