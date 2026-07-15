function CustomerCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Customer Information
      </h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {user?.name}
        </p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          {user?.email}
        </p>
      </div>
    </div>
  );
}

export default CustomerCard;