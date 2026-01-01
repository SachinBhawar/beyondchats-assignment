import { useEffect, useState } from "react";

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // form state
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const API_BASE = "http://localhost:5000/api/articles";

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_BASE);
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            setArticles(data);
        } catch (err) {
            setError(err.message || "Failed to load articles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const resetForm = () => {
        setTitle("");
        setAuthor("");
        setContent("");
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !author) {
            alert("Title, author and content are required");
            return;
        }

        try {
            const payload = { title, content, author };
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Request failed");
            }

            resetForm();
            fetchArticles();
        } catch (err) {
            alert(err.message || "Failed to save article");
        }
    };

    const handleEdit = (article) => {
        setTitle(article.title || "");
        setAuthor(article.author || "");
        setContent(article.content || "");
        setEditingId(article._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const ok = window.confirm("Delete this article? This action cannot be undone.");
        if (!ok) return;

        try {
            const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            fetchArticles();
        } catch (err) {
            alert(err.message || "Delete failed");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="mb-4">
                {!showForm && !editingId && (
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Add New Article
                    </button>
                )}
            </div>

            {(showForm || editingId) && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">
                        {editingId ? "Edit Article" : "Create New Article"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Author</label>
                            <input
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={5}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                {editingId ? "Update" : "Create"}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-200 px-4 py-2 rounded"
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    setShowForm(false);
                                }}
                                className="bg-red-100 px-4 py-2 rounded text-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            )}
            <section>
                <h2 className="text-xl font-semibold mb-3">Articles</h2>

                {loading && <div className="p-6">Loading articles…</div>}
                {error && <div className="p-6 text-red-600">{error}</div>}

                {!loading && !error && (!articles || articles.length === 0) && (
                    <div className="p-6">No articles found</div>
                )}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((a) => (
                        <article key={a._id} className="bg-white rounded-lg shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
                            {a.author && <p className="text-sm text-gray-500 mb-2">By {a.author}</p>}
                            <p className="text-sm text-gray-700 mb-3">{a.content}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(a)}
                                    className="text-sm px-3 py-1 bg-yellow-300 text-green-600 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(a._id)}
                                    className="text-sm px-3 py-1 bg-red-300 rounded text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
