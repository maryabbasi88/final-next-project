"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaFilter } from "react-icons/fa";

interface SearchControlsProps {
  cuisine: string;
  diet: string;
  sort: string;
  currentPage: number;
  totalPages: number;
}

export default function SearchControls({
  cuisine,
  diet,
  sort,
  currentPage,
  totalPages,
}: SearchControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section
        aria-label="فیلترهای جستجو"
        className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex sm:flex-wrap sm:items-center"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 sm:block">
          <FaFilter className="text-orange-500" />
          فیلترها:
        </div>

        <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-1 sm:flex-wrap sm:items-center sm:gap-4">
          <select
            value={cuisine}
            onChange={(e) => handleFilterChange("cuisine", e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:w-auto"
          >
            <option value="">همه سبک‌ها</option>
            <option value="Italian">ایتالیایی</option>
            <option value="Mexican">مکزیکی</option>
            <option value="Asian">آسیایی</option>
            <option value="American">آمریکایی</option>
            <option value="Indian">هندی</option>
          </select>

          <select
            value={diet}
            onChange={(e) => handleFilterChange("diet", e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:w-auto"
          >
            <option value="">همه رژیم‌ها</option>
            <option value="Vegetarian">گیاه‌خواری</option>
            <option value="Vegan">وگان</option>
            <option value="Gluten Free">بدون گلوتن</option>
            <option value="Ketogenic">کیتو</option>
          </select>

          <select
            value={sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:mr-auto sm:w-auto"
          >
            <option value="popularity">محبوبیت</option>
            <option value="time">زمان پخت</option>
            <option value="calories">کالری</option>
          </select>
        </div>
      </section>

      {totalPages > 1 && (
        <nav
          aria-label="صفحه‌بندی نتایج"
          className="mt-12 flex items-center justify-center gap-2"
        >
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 sm:px-4 sm:py-2 sm:text-sm"
          >
            <FaChevronRight className="text-[10px] sm:text-xs" />
            <span className="hidden xs:inline">قبلی</span>
            <span className="xs:hidden">‹</span>
          </button>

          <span className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 sm:px-4 sm:py-2 sm:text-sm">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage >= totalPages}
            className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="xs:hidden">›</span>
            <span className="hidden xs:inline">بعدی</span>
            <FaChevronLeft className="text-[10px] sm:text-xs" />
          </button>
        </nav>
      )}
    </>
  );
}
