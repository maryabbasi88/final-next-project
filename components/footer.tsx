import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 dark:bg-gray-900/90 dark:text-white text-center text-sm text-gray-500">
      <p className="flex items-center justify-center gap-1">
        Recipe Finder &copy; 2026. Made with{" "}
        <FaHeart className="text-foodOrange text-xs inline" /> for food lovers.
      </p>
    </footer>
  );
}
