function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;