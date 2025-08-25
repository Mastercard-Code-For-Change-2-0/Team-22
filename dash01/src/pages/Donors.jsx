import React, { useState } from "react";

const categories = {
  Stationary: ["Pen", "Pencil", "Books", "Xth Books", "Notebook"],
  Clothing: ["Bottomwear", "Sweater", "Footwear"],
};

export default function Donate() {
  const [donors, setDonors] = useState([
    { name: "Ananya Singh", Need: "Bag"},
    { name: "Rohan Mehta", Need: "pen" },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const [objects, setObjects] = useState([
    {
      photo: "https://wildcraft.com/media/catalog/product/1/_/1_2527.jpg?width=960",
      category: "Stationary",
      type: "Books",
    },
  ]);

  const [objectPhoto, setObjectPhoto] = useState("");
  const [objectCategory, setObjectCategory] = useState("");
  const [objectType, setObjectType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !amount) {
      alert("Please fill out all fields!");
      return;
    }
    const newDonor = { name, amount: parseFloat(amount) };
    setDonors([...donors, newDonor]);
    setName("");
    setEmail("");
    setAmount("");
    alert("Thank you for your donation!");
  };

  const handleObjectSubmit = (e) => {
    e.preventDefault();
    if (!objectPhoto || !objectCategory || !objectType) {
      alert("Please fill out all object fields!");
      return;
    }
    setObjects([
      ...objects,
      { photo: objectPhoto, category: objectCategory, type: objectType },
    ]);
    setObjectPhoto("");
    setObjectCategory("");
    setObjectType("");
    alert("Thank you for donating an object!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setObjectPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">
          Donate to DonorConnect
        </h1>
        <p className="text-center text-lg mb-12">
          Your contributions help us create a bigger impact.  
          Thank you for your generosity!
        </p>

        {/* Total Donors */}
        <div className="bg-teal-700 text-white rounded-2xl shadow-md p-6 mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Total Donors: {donors.length}
          </h2>
          <p className="text-lg">
            Together, we've raised{" "}
            <span className="font-bold">
              ₹{donors.reduce((sum, d) => sum + d.amount, 0)}
            </span>{" "}
            so far!
          </p>
        </div>

        {/* Donors List */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-4 text-teal-700">
            Recent Donors
          </h3>
          <div className="bg-white shadow-md rounded-xl p-4">
            {donors.length > 0 ? (
              <ul className="space-y-2">
                {donors.map((donor, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b pb-2 last:border-none"
                  >
                    <span>{donor.name}</span>
                    <span className="font-semibold text-teal-700">
                      ₹{donor.amount}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No donors yet. Be the first!</p>
            )}
          </div>
        </div>

        {/* Object Donation Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-4 text-teal-700">
            Donated Objects
          </h3>
          <div className="bg-white shadow-md rounded-xl p-4 mb-6">
            {objects.length > 0 ? (
              <ul className="space-y-2">
                {objects.map((obj, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between border-b pb-2 last:border-none"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={obj.photo}
                        alt={obj.type}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <div className="text-xs text-gray-500">
                          {obj.category} &gt; {obj.type}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No objects donated yet.</p>
            )}
          </div>

          {/* Object Donation Form */}
          <h3 className="text-xl font-semibold mb-2 text-teal-700">
            Donate an Object
          </h3>
          <form
            onSubmit={handleObjectSubmit}
            className="bg-white shadow-md rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">Photo (URL or Upload)</label>
              <input
                type="url"
                className="w-full border rounded-lg p-2 mb-2"
                placeholder="Paste image URL or upload below"
                value={objectPhoto}
                onChange={(e) => setObjectPhoto(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg p-2"
                onChange={handleImageUpload}
              />
              {objectPhoto && (
                <img
                  src={objectPhoto}
                  alt="Preview"
                  className="mt-2 w-20 h-20 object-cover rounded"
                />
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                className="w-full border rounded-lg p-2"
                value={objectCategory}
                onChange={(e) => {
                  setObjectCategory(e.target.value);
                  setObjectType(""); // Reset type when category changes
                }}
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Donation Type</label>
              <select
                className="w-full border rounded-lg p-2"
                value={objectType}
                onChange={(e) => setObjectType(e.target.value)}
                disabled={!objectCategory}
              >
                <option value="">Select Type</option>
                {objectCategory &&
                  categories[objectCategory].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition"
            >
              Donate Object
            </button>
          </form>
        </div>

        {/* Donation Form */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-teal-700">
            Want to Donate? Fill this Form
          </h3>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Donation Amount (₹)</label>
              <input
                type="number"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition"
            >
              Donate Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
