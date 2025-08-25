import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          About <span className="text-orange-500">Seva Sahayog</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          Seva Sahayog is a forward-thinking initiative that sparks meaningful
          change through innovation, education, and collaboration. We believe
          small actions create big transformations, and our mission is to
          empower individuals and communities to unlock their full potential.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 mb-16">
        <div className="bg-white border border-blue-100 shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">🎯 Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To ignite potential and create lasting impact by fostering learning,
            innovation, and collaboration.
          </p>
        </div>

        <div className="bg-white border border-blue-100 shadow-lg rounded-2xl p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">🌟 Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            A world where every individual has the confidence, tools, and
            opportunities to make a difference.
          </p>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-gradient-to-r from-blue-100 to-orange-100 py-20 px-6">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
          What We Focus On
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "🚀 Innovation", text: "Building tools and products that solve real-world challenges." },
            { title: "🌍 Community", text: "Driving initiatives that strengthen communities." },
            { title: "🎓 Education", text: "Providing education and training for future-ready skills." },
            { title: "🤝 Collaboration", text: "Partnering with changemakers and organizations to scale impact." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">{item.title}</h3>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-6">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
          Join Us in Making a Difference
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
          Be a part of the movement to empower communities and transform lives
          through education, innovation, and collaboration.
        </p>
        <a
          href="/donate"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          Get Involved
        </a>
      </section>
    </div>
  );
}
