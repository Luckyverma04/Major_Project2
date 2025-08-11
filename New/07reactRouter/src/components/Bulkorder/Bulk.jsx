import React, { useState } from "react";

const BulkOrderPage = () => {
  const [rows, setRows] = useState([
    { productName: "", quantity: 1, price: 0 }
  ]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { productName: "", quantity: 1, price: 0 }]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    console.log("Bulk Order Submitted:", rows);
    alert("Bulk order added to cart!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bulk Order</h1>
      <p className="mb-6 text-gray-600">
        Add multiple products and quantities to your cart in one go.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Product Name / SKU</th>
              <th className="border p-3 text-left">Quantity</th>
              <th className="border p-3 text-left">Price (₹)</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border">
                <td className="p-3">
                  <input
                    type="text"
                    value={row.productName}
                    onChange={(e) =>
                      handleChange(index, "productName", e.target.value)
                    }
                    placeholder="Enter product name or code"
                    className="border rounded p-2 w-full"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    min="1"
                    value={row.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    className="border rounded p-2 w-20"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    min="0"
                    value={row.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    className="border rounded p-2 w-24"
                  />
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={addRow}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Row
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BulkOrderPage;
