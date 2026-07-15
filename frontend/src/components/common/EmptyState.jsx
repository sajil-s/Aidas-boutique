

function EmptyState({ title, message }) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-camel/25 shadow-sm shadow-ink/5 p-12 text-center">
      <h2 className="font-display text-2xl text-ink mb-2">{title}</h2>
      <p className="text-taupe">{message}</p>
    </div>
  );
}

export default EmptyState;