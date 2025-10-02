import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../../api/api";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.toLowerCase() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // fetch all service-items
        const res = await api.get("/service-items/");
        // flatten list_entries into one array
        const allEntries = res.data.flatMap((item) =>
          item.list_entries.map((entry) => ({
            ...entry,
            parentId: item.id,
          }))
        );
        // filter by query
        const filtered = allEntries.filter((entry) =>
          entry.title.toLowerCase().includes(query)
        );
        setResults(filtered);
      } catch (err) {
        console.error("Failed to fetch search results", err);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResults();
  }, [query]);

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-[#CD3A00]">{query}</span>
      </h2>

      {results.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-xl font-semibold">{entry.title}</h3>
                <p className="text-gray-800 font-semibold mt-1">
                  ₹{entry.price} • {entry.duration} mins
                </p>
                <Link
                  to={`/service-details/${entry.parentId}/${entry.id}`}
                  className="inline-block mt-3 text-blue-600 font-medium hover:underline"
                >
                  View details →
                </Link>
              </div>
              <img
                src={entry.image}
                alt={entry.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No services found.</p>
      )}
    </div>
  );
}
