<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased">
    <header class="sticky top-0 z-40 border-b border-sky-100/80 bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <RouterLink to="/" class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 ring-1 ring-sky-200 shadow-sm shadow-sky-100">
            <img src="/favicon.png" alt="flairsmiledentalcare" class="h-8 w-8 object-contain" />
          </div>
          <div>
            <div class="text-lg font-black tracking-[-0.04em] text-slate-900 sm:text-xl">flairsmiledentalcare</div>
            <div class="text-[10px] font-semibold uppercase tracking-[0.26em] text-sky-600">Dental Care</div>
          </div>
        </RouterLink>

        <div class="hidden items-center gap-8 md:flex">
          <a href="#services" class="text-sm font-semibold text-slate-700 transition-colors hover:text-sky-700">Services</a>
          <a href="#about" class="text-sm font-semibold text-slate-700 transition-colors hover:text-sky-700">About</a>
          <a href="#doctors" class="text-sm font-semibold text-slate-700 transition-colors hover:text-sky-700">Doctors</a>
          <a href="#contact" class="text-sm font-semibold text-slate-700 transition-colors hover:text-sky-700">Contact</a>
          <Button variant="solid" theme="blue" size="md" label="Book now" class="!rounded-full !px-5 !shadow-[0_12px_24px_rgba(14,165,233,0.25)]" @click="bookAppointment" />
        </div>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-700 shadow-sm shadow-sky-100 md:hidden"
          @click="mobileOpen = !mobileOpen"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        >
          <FeatherIcon :name="mobileOpen ? 'x' : 'menu'" class="h-5 w-5" />
        </button>
      </nav>

      <Transition name="slide-down">
        <div v-if="mobileOpen" class="border-t border-sky-100 bg-white md:hidden">
          <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            <a href="#services" @click="mobileOpen = false" class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700">Services</a>
            <a href="#about" @click="mobileOpen = false" class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700">About</a>
            <a href="#doctors" @click="mobileOpen = false" class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700">Doctors</a>
            <a href="#contact" @click="mobileOpen = false" class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700">Contact</a>
            <Button variant="solid" theme="blue" label="Book now" class="mt-2 !rounded-xl" @click="bookAppointment" />
          </div>
        </div>
      </Transition>
    </header>

    <main>
      <section class="relative isolate overflow-hidden bg-slate-950" @mouseenter="stopInterval" @mouseleave="startInterval">
        <div class="absolute inset-0 z-0">
          <div
            v-for="(image, index) in heroImages"
            :key="index"
            class="absolute inset-0 transition-all duration-1000 ease-in-out"
            :class="index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
          >
            <img :src="image" alt="Clinic interior" class="h-full w-full object-cover object-center" />
          </div>
          <div class="absolute inset-0 bg-slate-950/78"></div>
          <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(8,47,73,0.82)_38%,rgba(15,23,42,0.52)_100%)]"></div>
        </div>

        <button
          type="button"
          @click="prevSlide"
          aria-label="Previous slide"
          class="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-slate-900/45 p-2 text-white backdrop-blur-sm hover:bg-sky-600 md:inline-flex"
        >
          <FeatherIcon name="chevron-left" class="h-5 w-5" />
        </button>
        <button
          type="button"
          @click="nextSlide"
          aria-label="Next slide"
          class="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-slate-900/45 p-2 text-white backdrop-blur-sm hover:bg-sky-600 md:inline-flex"
        >
          <FeatherIcon name="chevron-right" class="h-5 w-5" />
        </button>

        <div class="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-sky-500/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.26em] text-cyan-50 shadow-[0_0_0_1px_rgba(125,211,252,0.2)] backdrop-blur-sm sm:text-[11px]">
              <FeatherIcon name="sparkles" class="h-3.5 w-3.5 text-cyan-200" />
              Creating brighter smiles
            </span>
            <h1 class="mt-6 text-[2.65rem] font-black leading-[0.9] tracking-[-0.07em] text-white drop-shadow-[0_8px_30px_rgba(15,23,42,0.8)] sm:text-5xl lg:text-[5rem]">
              Flair Smile dental care
              <span class="mt-2 block bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                for confident living.
              </span>
            </h1>
            <p class="mt-6 max-w-xl text-base font-medium leading-7 text-white sm:text-lg">
              Experience modern, gentle dentistry in a refined clinical environment, designed to keep every smile healthier, brighter, and beautifully cared for.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="solid" theme="blue" size="lg" label="Book appointment" icon="calendar" class="!rounded-xl !shadow-[0_18px_35px_rgba(14,165,233,0.25)]" @click="bookAppointment" />
              <Button variant="outline" size="lg" label="Call clinic" icon="phone" class="!rounded-xl !border-white/20 !text-white hover:!bg-white/5" @click="callNow" />
            </div>

            <div class="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-200">
              <span class="flex items-center gap-2"><FeatherIcon name="map-pin" class="h-4 w-4 text-sky-300" /> Nairobi CBD</span>
              <span class="h-1.5 w-1.5 rounded-full bg-sky-300"></span>
              <span class="flex items-center gap-2"><FeatherIcon name="clock" class="h-4 w-4 text-sky-300" /> Mon–Fri: 8:00am–6:00pm</span>
            </div>
          </div>
        </div>

        <div class="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-8">
          <button
            v-for="(_, index) in heroImages"
            :key="index"
            type="button"
            @click="goToSlide(index)"
            class="h-2 rounded-full transition-all duration-300"
            :class="index === currentSlide ? 'w-8 bg-sky-400' : 'w-2 bg-white/35 hover:bg-white/60'"
            :aria-label="`Go to slide ${index + 1}`"
          />
        </div>
      </section>

      <section class="w-full pb-8 pt-6">
        <div class="w-full overflow-hidden border-y border-sky-100/80 bg-white shadow-[0_30px_80px_rgba(14,116,144,0.12)] ring-1 ring-sky-50">
          <StatsBar :stats="stats" />
        </div>
      </section>

      <section id="services" class="bg-white py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <span class="text-xs font-bold uppercase tracking-[0.22em] text-sky-600">Our care</span>
            <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Complete dental solutions</h2>
            <p class="mt-4 text-lg text-slate-600">Modern treatment plans built around comfort, precision and long-term oral health.</p>
          </div>

          <div class="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <ServiceCard v-for="service in services" :key="service.id" :service="service" />
          </div>
        </div>
      </section>

      <section id="about" class="relative overflow-hidden bg-slate-900 py-24">
        <div class="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"></div>
        <div class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <span class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Why choose us</span>
            <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">A calmer, more personal dental experience</h2>
            <p class="mt-4 text-lg text-slate-300">We blend technology, empathy and attention to detail to make every visit feel reassuring and stress-free.</p>
          </div>

          <div class="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <FeatureCard v-for="feature in features" :key="feature.id" :feature="feature" />
          </div>
        </div>
      </section>

      <section id="doctors" class="bg-white py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <span class="text-xs font-bold uppercase tracking-[0.22em] text-sky-600">Our experts</span>
            <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Meet the team</h2>
            <p class="mt-4 text-lg text-slate-600">Skilled dentists and specialists committed to helping you smile with confidence.</p>
          </div>

          <div v-if="doctorsResource.loading" class="mt-16 flex justify-center py-10">
            <LoadingIndicator size="lg" />
          </div>

          <div v-else-if="doctors.length === 0" class="mt-16 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-600">
            Our team profiles are being prepared. Please check back soon.
          </div>

          <div v-else class="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <DoctorCard v-for="doctor in doctors" :key="doctor.name" :doctor="doctor" />
          </div>
        </div>
      </section>

      <section class="border-t border-sky-100 bg-sky-50/60 py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <span class="text-xs font-bold uppercase tracking-[0.22em] text-sky-600">Patient stories</span>
            <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Loved by our community</h2>
            <p class="mt-4 text-lg text-slate-600">Real feedback from patients who trust flairsmiledentalcare for everyday and advanced dental care.</p>
          </div>

          <div class="mt-16 grid gap-8 lg:grid-cols-3">
            <TestimonialCard v-for="testimonial in testimonials" :key="testimonial.id" :testimonial="testimonial" />
          </div>
        </div>
      </section>

      <section id="contact" class="bg-slate-50 py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <span class="text-xs font-bold uppercase tracking-[0.22em] text-sky-600">Visit us</span>
            <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Convenient care in Nairobi</h2>
            <p class="mt-4 text-lg text-slate-600">Easy to reach, friendly to visit, and designed around your comfort.</p>
          </div>

          <div class="mt-16 grid gap-10 lg:grid-cols-[1.05fr_1.2fr]">
            <div class="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/60">
              <div class="space-y-7">
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <FeatherIcon name="map-pin" class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Location</p>
                    <p class="mt-2 text-lg font-semibold text-slate-900">Laxmi Plaza, Biashara Street</p>
                    <p class="mt-1 text-slate-600">Nairobi CBD, Kenya</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <FeatherIcon name="phone" class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Call us</p>
                    <div class="mt-2 space-y-1 text-slate-700">
                      <a href="tel:0746721164" class="block font-semibold hover:text-sky-700">0746 721 164</a>
                      <a href="tel:0711842836" class="block font-semibold hover:text-sky-700">0711 842 836</a>
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <FeatherIcon name="mail" class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Email</p>
                    <a href="mailto:flairsmiledentalcare@gmail.com" class="mt-2 block font-semibold text-sky-700 hover:text-sky-800">flairsmiledentalcare@gmail.com</a>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <FeatherIcon name="clock" class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Hours</p>
                    <p class="mt-2 text-slate-700">Mon–Fri: 8:00am–6:00pm</p>
                    <p class="text-slate-700">Saturday: 9:00am–1:00pm</p>
                  </div>
                </div>
              </div>
            </div>

            <Card class="!overflow-hidden !rounded-[28px] !border !border-slate-200 !shadow-lg">
              <template #default>
                <iframe
                  title="Flair Smile Dental Care location"
                  class="h-[480px] w-full border-0"
                  src="https://maps.google.com/maps?q=Laxmi+Plaza,+Biashara+Street,+Nairobi+CBD&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </template>
            </Card>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-sky-950/95 py-16 text-slate-300">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 ring-1 ring-sky-500/20">
                <img src="/favicon.png" alt="Flair Smile" class="h-7 w-7 object-contain" />
              </div>
              <div>
                <div class="text-xl font-black text-white">flairsmiledentalcare</div>
                <div class="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300">Dental Care</div>
              </div>
            </div>
            <p class="mt-5 text-sm leading-7 text-sky-100/80">Premium family dentistry and advanced smile care designed around comfort, trust and beautiful long-term results.</p>
          </div>

          <div>
            <h3 class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Services</h3>
            <ul class="mt-5 space-y-3 text-sm text-slate-300">
              <li v-for="service in services.slice(0, 5)" :key="service.id">
                <a href="#services" class="hover:text-sky-300">{{ service.title }}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Contact</h3>
            <ul class="mt-5 space-y-3 text-sm text-slate-300">
              <li>Laxmi Plaza, Nairobi CBD</li>
              <li>0746 721 164</li>
              <li>0711 842 836</li>
              <li>flairsmiledentalcare@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Quick links</h3>
            <ul class="mt-5 space-y-3 text-sm text-slate-300">
              <li><a href="#about" class="hover:text-sky-300">About</a></li>
              <li><a href="#doctors" class="hover:text-sky-300">Doctors</a></li>
              <li><a href="#contact" class="hover:text-sky-300">Contact</a></li>
              <li><a href="#services" class="hover:text-sky-300">Book appointment</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-sky-800/80 pt-6 text-sm text-sky-100/60 md:flex-row">
          <p>© {{ new Date().getFullYear() }} flairsmiledentalcare Dental Care. All rights reserved.</p>
          <p class="text-xs uppercase tracking-[0.2em] text-sky-200">Nairobi, Kenya</p>
        </div>
      </div>
    </footer>

    <WhatsAppButton phone="0746721164" />
    <BookingModal v-model="bookingOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Button, Card, FeatherIcon, LoadingIndicator, createResource } from "frappe-ui";

import ServiceCard from "../components/ServiceCard.vue";
import FeatureCard from "../components/FeatureCard.vue";
import DoctorCard from "../components/DoctorCard.vue";
import TestimonialCard from "../components/TestimonialCard.vue";
import StatsBar from "../components/StatsBar.vue";
import WhatsAppButton from "../components/WhatsAppButton.vue";
import BookingModal from "../components/BookingModal.vue";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
}

const mobileOpen = ref(false);
const bookingOpen = ref(false);

const heroImages: string[] = [
  "/assets/frappe_webportals/frontend/chair1.jpeg",
  "/assets/frappe_webportals/frontend/chair2.jpeg",
  "/assets/frappe_webportals/frontend/hallway.jpeg",
  "/assets/frappe_webportals/frontend/hero1.jpeg",
  "/assets/frappe_webportals/frontend/hero3.jpeg",
  "/assets/frappe_webportals/frontend/reception.jpeg",
];

const currentSlide = ref(0);
let slideInterval: ReturnType<typeof setInterval> | null = null;

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % heroImages.length;
  restartInterval();
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + heroImages.length) % heroImages.length;
  restartInterval();
}

function goToSlide(index: number) {
  currentSlide.value = index;
  restartInterval();
}

function startInterval() {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.length;
  }, 5000);
}

function stopInterval() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function restartInterval() {
  stopInterval();
  startInterval();
}

const services: Service[] = [
  { id: 1, title: "General Dentistry", description: "Preventive care, cleanings and routine exams for healthy smiles.", icon: "shield", color: "sky" },
  { id: 2, title: "Cosmetic Dentistry", description: "Whitening, veneers and smile design for a confident smile makeover.", icon: "star", color: "blue" },
  { id: 3, title: "Orthodontics", description: "Clear aligners and smile correction plans for a balanced bite and profile.", icon: "grid", color: "indigo" },
  { id: 4, title: "Dental Implants", description: "Long-lasting tooth replacement solutions for comfort and functionality.", icon: "plus-circle", color: "cyan" },
  { id: 5, title: "Root Canal Care", description: "Gentle, advanced treatment to relieve pain and protect the natural tooth.", icon: "activity", color: "teal" },
  { id: 6, title: "Family Dentistry", description: "Care for every age with a warm and reassuring treatment approach.", icon: "users", color: "purple" },
];

const features: Feature[] = [
  { id: 1, title: "Modern technology", description: "Digital imaging, precision instruments and efficient treatment workflows.", icon: "zap" },
  { id: 2, title: "Gentle patient care", description: "A welcoming clinic designed to reduce fear and improve comfort at every visit.", icon: "heart" },
  { id: 3, title: "Clear communication", description: "We explain every step so you can feel informed and confident in your care.", icon: "message-circle" },
  { id: 4, title: "Flexible scheduling", description: "Appointments designed around busy routines with convenient visit times.", icon: "calendar" },
  { id: 5, title: "Emergency support", description: "Urgent dental concerns are handled quickly and with compassion.", icon: "alert-triangle" },
  { id: 6, title: "Transparent pricing", description: "Honest recommendations and payment options with no hidden surprises.", icon: "dollar-sign" },
];

const testimonials: Testimonial[] = [
  { id: 1, name: "Wanjiru M.", role: "Teacher", quote: "The team made my smile makeover feel easy and enjoyable. I finally feel confident in every photo.", avatar: "W" },
  { id: 2, name: "David O.", role: "Business owner", quote: "Their attention to detail is outstanding. The clinic is clean, calm and very professional.", avatar: "D" },
  { id: 3, name: "Amina H.", role: "Student", quote: "I loved the clear aligners process. The staff explained everything and the results were amazing.", avatar: "A" },
];

const stats: Stat[] = [
  { id: 1, value: "10+", label: "Years of care", icon: "calendar" },
  { id: 2, value: "5000+", label: "Happy smiles", icon: "users" },
  { id: 3, value: "4.9/5", label: "Patient rating", icon: "star" },
  { id: 4, value: "24/7", label: "Emergency support", icon: "phone" },
];

const fallbackDoctors = [
  { name: "Dr. Sarah Wanjiku", qualification: "BDS, MSc Endodontics", specialty: "General Dentist", image: null, bio: "Focused on preventive care and long-term oral health for individuals and families." },
  { name: "Dr. Daniel Kibet", qualification: "DDS, Orthodontics", specialty: "Orthodontist", image: null, bio: "Creates tailored treatment plans for beautiful, balanced and confident smiles." },
  { name: "Dr. Aisha Noor", qualification: "BDS, Cosmetic Dentistry", specialty: "Cosmetic Dentist", image: null, bio: "Helps patients achieve natural-looking, camera-ready results with gentle precision." },
];

const doctorsResource = createResource({
  url: "frappe.client.get_list",
  params: {
    doctype: "Healthcare Practitioner",
    fields: ["name", "practitioner_name", "status", "image", "qualifications"],
    filters: { status: "Active" },
  },
  method: "GET",
  auto: true,
  initialData: [],
});

const doctors = computed(() => {
  if (doctorsResource.data && doctorsResource.data.length > 0) {
    return doctorsResource.data.map((doc: any) => ({
      name: doc.practitioner_name || doc.name,
      qualification: doc.qualifications || "DDS, PhD",
      specialty: "Dentist",
      image: doc.image || null,
      bio: `${doc.practitioner_name || doc.name} brings modern dental care and a patient-first approach to every visit.`,
    }));
  }

  if (doctorsResource.error) {
    return fallbackDoctors;
  }

  return [];
});

function bookAppointment() {
  bookingOpen.value = true;
}

function callNow() {
  window.location.href = "tel:0746721164";
}

function updateMetaTags() {
  document.title = "flairsmiledentalcare | Modern Dental Care in Nairobi";

  const metaDescription = document.querySelector('meta[name="description"]');
  metaDescription?.setAttribute(
    "content",
    "flairsmiledentalcare offers family dentistry, cosmetic dentistry, orthodontics and emergency dental care in Nairobi CBD.",
  );
}

onMounted(() => {
  updateMetaTags();
  startInterval();
});

onUnmounted(() => {
  stopInterval();
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
  opacity: 1;
  max-height: 300px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>
