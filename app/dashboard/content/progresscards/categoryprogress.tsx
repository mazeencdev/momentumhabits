type Category = { name: string; icon: string; score: number };

type Props = { categories: Category[] };

export default function CategoryProgress({ categories }: Props) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-5 border border-black/15 flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-neutral-800">By Category</h2>
        <p className="text-xs text-neutral-400">Completion rate per category</p>
      </div>
      <div className="flex flex-col gap-3 flex-1 justify-around">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-neutral-400">No habits yet</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.name} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.name}
                </p>
                <p className="text-sm font-bold text-[#2D6A4F]">{cat.score}%</p>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full">
                <div
                  className="h-2 bg-[#2D6A4F] rounded-full"
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
