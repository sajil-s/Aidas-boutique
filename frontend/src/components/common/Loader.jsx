

function Loader({ text = "Loading..." }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-3 text-taupe">
      <div className="w-8 h-8 border-2 border-camel/40 border-t-wine rounded-full animate-spin" />
      <p className="text-sm tracking-wide">{text}</p>
    </div>
  );
}

export default Loader;