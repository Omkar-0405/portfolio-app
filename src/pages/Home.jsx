import DashboardLayout from "../layouts/DashboardLayout";
import BlogCard from "../components/BlogCard";

const infoCards = [
  {
    title: "Get started",
    desc: "Read our getting started guide to get the most out of your Capitalmind subscription.",
  },
  {
    title: "Community",
    desc: "Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers.",
  },
  {
    title: "Visit website",
    desc: "Keep up with our latest content on our website.",
  },
];

const blogs = [
  {
    title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
    date: "Apr 18, 2024",
    excerpt:
      "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions...",
  },
  {
    title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
    date: "Apr 05, 2024",
    excerpt:
      "Craftsman Automation excels in making precise parts for cars and machines...",
  },
  {
    title:
      "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
    date: "Apr 03, 2024",
    excerpt:
      "FY24 brought us a 42% gain in our Capitalmind Focused portfolio...",
  },
  {
    title: "A Small CAD for India, Yet Again",
    date: "Mar 27, 2024",
    excerpt: "India's Current Account Deficit is at a decade low...",
  },
];

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Home</h1>

      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {infoCards.map((card, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg p-5 hover:shadow-sm transition"
          >
            <h3 className="font-medium mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Latest Posts */}
      <h2 className="text-lg font-semibold mb-4">Latest Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogs.map((blog, i) => (
          <BlogCard key={i} blog={blog} />
        ))}
      </div>
    </>
  );
}
