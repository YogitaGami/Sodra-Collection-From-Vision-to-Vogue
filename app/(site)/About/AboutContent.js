"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";

const AboutContent = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus(data.error || "Something went wrong");
    }
  };

  return (
    <div class="min-h-screen text-gray-800 pt-28">
      <section class="text-center py-6">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0680d0]">
          Sodra Collection
        </h1>
        <p class="text-lg text-[#44b1f9] mt-2">From Vision to Vogue</p>
      </section>

      <section class="flex justify-center py-8">
        <div class="w-full max-w-4xl px-4">
          <div class="relative pb-[56.25%] h-0 rounded-xl shadow-lg overflow-hidden">
            <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      <section class="max-w-3xl mx-auto px-6 py-12 text-center">
        <img
          src="/Ravina.png"
          alt="Ravina Gami"
          class="mx-auto w-40 h-40 rounded-full object-cover border-4 border-[#0680d0] shadow-md mb-4"
        />
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#0680d0]">
          Ravina Gami
        </h2>
        <p class="text-md text-gray-600 mt-1">
          Fashion Designer, Ujjain (M.P.)
        </p>
        <p class="mt-6 text-gray-700 leading-relaxed">
          Ever since I was a little girl, I found joy in creating. I still
          remember designing my very first dress — not for a person, but for my
          doll. At that time, I didn’t even have a sewing machine. I would draft
          little outfits by imagining the cuts in my mind, then carefully cut
          the fabric and stitch everything together by hand using just a needle
          and thread. That early spark of creativity shaped my dream of becoming
          a fashion designer.
        </p>

        <p class="mt-4 text-gray-700 leading-relaxed">
          Over the years, that passion only grew stronger. Eventually, I decided
          to follow my heart and formally step into the world of fashion by
          pursuing a diploma in Fashion Designing. That step was the beginning
          of a real journey — not just learning techniques and skills, but
          transforming ideas into something people can wear and feel connected
          to.
        </p>

        <p class="mt-4 text-gray-700 leading-relaxed">
          Today, I’ve turned that childhood dream into reality. I’ve created my
          own brand where every dress, accessory, and art piece is designed with
          intention, emotion, and creativity. From made-to-order clothing to
          handcrafted accessories and artwork, each piece is a part of my story
          — and now it becomes a part of yours too.
        </p>

        <p class="mt-4 text-gray-700 leading-relaxed">
          Today, I continue to grow — not just as a designer, but as a creative
          thinker and mentor. I constantly challenge myself to explore new
          ideas, refine my techniques, and turn inspiration into designs that
          speak to people. Every piece I create carries a story, a feeling, and
          a purpose. That’s what led me to shape my own identity as a brand —
          where imagination turns into design, and design turns into confidence.
          That’s the heart behind my tagline:{" "}
          <strong class="text-[#0680d0]">“From Vision to Vogue.”</strong> It’s
          about transforming a simple idea into a wearable piece of art that
          empowers and connects. This journey isn’t just mine — it belongs to
          every person who wears what I’ve created.
        </p>
      </section>

      <section class="max-w-3xl mx-auto px-6 space-y-10">
        <div>
          <h3 class="text-2xl font-semibold text-[#0680d0] mb-2">Education</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>
              Fashion Designing Diploma - Bhartiya Institute of Fashion
              Technology
            </li>
            <li>Bachelor of Arts - Vikram University, Ujjain</li>
            <li>Office Assistant & DTP - Bharatiya Vidya Bhavan</li>
          </ul>
        </div>

        <div>
          <h3 class="text-2xl font-semibold text-[#0680d0] mb-2">Skills</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Stitching & Pattern Making</li>
            <li>Fabric Painting & Hand Embroidery</li>
            <li>Adobe Illustrator, Photoshop, CorelDRAW, Inkscape</li>
          </ul>
        </div>

        <div>
          <h3 class="text-2xl font-semibold text-[#0680d0] mb-2">Languages</h3>
          <p class="text-gray-700">Hindi, English</p>
        </div>
      </section>

      <section class="py-16 px-6">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-[#0680d0] mb-4">Let's Connect</h2>
          <p class="text-gray-700 mb-10">
            Feel free to reach out for custom designs, collaborations, or just
            to say hello.
          </p>

          <div class="mb-8 space-y-2">
            <p class="text-gray-800 font-medium flex gap-2 justify-center">
              <Image
                src="/mail (1).png"
                alt="Email logo"
                width={18}
                height={16}
              ></Image>
              <span>Email:</span>
              <a
                href="mailto:ravinagami1998@gmail.com"
                class="text-[#0680d0] hover:text-[#44b1f9]"
              >
                ravinagami1998@gmail.com
              </a>
            </p>
            <p class="text-gray-800 font-medium flex gap-2 justify-center">
              <Image
                src="/instagram (1).svg"
                alt="Email logo"
                width={20}
                height={20}
              ></Image>
              <span>Instagram:</span>
              <a
                href="https://www.instagram.com/world_of_arts321?utm_source=qr&igsh=NzZ1NXN2NWx3Z3ox"
                target="_blank"
                class="text-[#0680d0] hover:text-[#44b1f9]"
              >
                @Designer Gami
              </a>
            </p>
          </div>

          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0680d0] focus:border-[#0680d0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0680d0] focus:border-[#0680d0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0680d0] focus:border-[#0680d0]"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#0680d0] text-white px-3 sm:px-6 py-1 sm:py-2 rounded-md hover:bg-[#44b1f9] transition"
              >
                Send Message
              </button>
            </div>
            {status && (
              <p className="text-center text-sm text-gray-600 mt-4">{status}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;
