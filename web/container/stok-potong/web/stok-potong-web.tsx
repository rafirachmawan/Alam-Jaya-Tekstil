"use client";

export default function StokPotongWeb({ handleLogout, session }: any) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Stok Potong
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-3 gap-4">
        {/* CARD */}
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Kaos Hitam - M</p>
          <p className="text-xl font-bold text-gray-800">10 pcs</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Kaos Putih - L</p>
          <p className="text-xl font-bold text-gray-800">5 pcs</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Kaos Abu - XL</p>
          <p className="text-xl font-bold text-gray-800">8 pcs</p>
        </div>
      </div>
    </div>
  );
}
