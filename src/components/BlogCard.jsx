export default function BlogCard({ blog }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-1">{blog.date}</div>

      <h3 className="text-base font-semibold mb-2 leading-snug">
        {blog.title}
      </h3>

      <p className="text-sm text-gray-600 mb-2">
        {blog.excerpt}
      </p>

      <button className="text-sm text-green-600 hover:underline">
        Read full post
      </button>
    </div>
  );
}
