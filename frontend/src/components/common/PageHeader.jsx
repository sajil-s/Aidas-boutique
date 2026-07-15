// function PageHeader({ title, subtitle = "" }) {
//   return (
//     <div className="mb-6">
//       <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

//       {subtitle && (
//         <p className="text-gray-600 mt-2">{subtitle}</p>
//       )}
//     </div>
//   );
// }

// export default PageHeader;

function PageHeader({ title, subtitle = "" }) {
  return (
    <div className="mb-8">
      <p className="text-xs tracking-[0.2em] uppercase text-wine font-medium mb-2">
        AIDAS
      </p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink">{title}</h1>
      {subtitle && <p className="text-taupe mt-2">{subtitle}</p>}
    </div>
  );
}

export default PageHeader;