function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase?.() || "";

  let badgeClasses =
    "bg-gray-100 text-gray-700";

  if (
    normalizedStatus === "paid" ||
    normalizedStatus === "delivered"
  ) {
    badgeClasses =
      "bg-green-100 text-green-700";
  } else if (
    normalizedStatus === "pending" ||
    normalizedStatus === "processing"
  ) {
    badgeClasses =
      "bg-yellow-100 text-yellow-700";
  } else if (
    normalizedStatus === "shipped"
  ) {
    badgeClasses =
      "bg-blue-100 text-blue-700";
  } else if (
    normalizedStatus === "cancelled" ||
    normalizedStatus === "unpaid"
  ) {
    badgeClasses =
      "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badgeClasses}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;