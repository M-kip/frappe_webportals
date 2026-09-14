<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans antialiased">

    <!-- Navigation -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav class="container mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        <RouterLink to="/" class="flex items-center space-x-3 shrink-0">
          <img src="/favicon.png" alt="Flair Smile Dental Care" class="h-9 w-9 sm:h-10 sm:w-10 object-contain" />
          <div class="flex flex-col leading-tight whitespace-nowrap">
            <div class="flex items-center space-x-1.5 text-lg font-bold sm:text-2xl">
              <span class="text-sky-700">Flair Smile</span>
              <span class="text-gray-800">Dental Care</span>
            </div>
            <span class="hidden text-xs italic text-gray-500 sm:block">Creating Brighter Smiles</span>
          </div>
        </RouterLink>

        <div class="hidden items-center space-x-8 md:flex">
          <a href="#services" class="nav-link">Services</a>
          <a href="#doctors" class="nav-link">Our Dentists</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#contact" class="nav-link">Contact</a>
          <Button
            label="Book Appointment"
            class="shadow-md shadow-sky-100 hover:shadow-lg transition-all"
            @click="bookAppointment"
          />
        </div>

        <button
          @click="mobileOpen = !mobileOpen"
          class="flex h-8 w-8 items-center justify-center rounded-md bg-sky-50 text-sky-800 shadow-sm transition hover:bg-sky-100 hover:text-sky-900 active:scale-95 sm:h-10 sm:w-10 md:hidden"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="mobileOpen"
        >
          <FeatherIcon :name="mobileOpen ? 'x' : 'menu'" size="20" stroke-width="2.5" />
        </button>
      </nav>

      <!-- Mobile menu -->
      <Transition name="slide-down">
        <div
          v-if="mobileOpen"
          class="border-t border-gray-100 md:hidden bg-white"
        >
          <div class="container mx-auto space-y-2 px-4 py-4">
            <a href="#services" @click="mobileOpen = false" class="mobile-nav-link">Services</a>
            <a href="#doctors" @click="mobileOpen = false" class="mobile-nav-link">Our Dentists</a>
            <a href="#about" @click="mobileOpen = false" class="mobile-nav-link">About</a>
            <a href="#contact" @click="mobileOpen = false" class="mobile-nav-link">Contact</a>
            <div class="pt-2">
              <Button label="Book Appointment" block @click="bookAppointment" />
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Hero Section -->
    <section
      class="relative overflow-hidden min-h-[500px] sm:min-h-[580px] md:min-h-[620px] lg:min-h-[680px]"
      @mouseenter="stopInterval"
      @mouseleave="startInterval"
    >
      <div class="absolute inset-0 z-0">
        <!-- Carousel images -->
        <div
          v-for="(image, index) in heroImages"
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          :class="index === currentSlide ? 'opacity-100' : 'opacity-0'"
        >
          <img
            :src="image"
            :alt="`Dental clinic image ${index + 1}`"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Clean gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/30"></div>
      </div>

      <!-- Carousel controls -->
      <button
        type="button"
        @click="prevSlide"
        aria-label="Previous image"
        class="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/25 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50 md:left-6"
      >
        <FeatherIcon name="chevron-left" class="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        type="button"
        @click="nextSlide"
        aria-label="Next image"
        class="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/25 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50 md:right-6"
      >
        <FeatherIcon name="chevron-right" class="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <!-- Carousel dots -->
      <div class="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-8">
        <button
          v-for="(_, index) in heroImages"
          :key="index"
          type="button"
          @click="goToSlide(index)"
          :aria-label="`Go to image ${index + 1}`"
          class="h-2 rounded-full transition-all duration-300"
          :class="index === currentSlide ? 'w-8 bg-sky-400' : 'w-2 bg-white/60 hover:bg-white'"
        ></button>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 container mx-auto px-6 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-16 lg:pb-28 lg:px-12">
        <div class="max-w-2xl">
          <span class="inline-block rounded-full bg-sky-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-200 border border-sky-400/30 backdrop-blur-sm">
            Creating Brighter Smiles
          </span>

          <h1 class="mt-4 text-4xl font-extrabold leading-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
            Flair Smile Dental Care
          </h1>

          <p class="mt-4 text-base leading-relaxed text-slate-100 drop-shadow sm:text-lg">
            Your trusted home for gentle, modern dentistry right in the heart
            of Nairobi. From routine checkups and cleanings to advanced
            cosmetic and restorative treatments, our experienced team is
            dedicated to keeping your smile healthy, confident, and
            comfortable — for every member of the family.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              label="Book an Appointment"
              icon="calendar"
              size="lg"
              class="shadow-xl"
              @click="bookAppointment"
            />
            <Button
              label="Call Now"
              icon="phone"
              size="lg"
              variant="white"
              class="shadow-xl"
              @click="callNow"
            />
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-200 drop-shadow sm:gap-6">
            <span class="flex items-center gap-2">
              <FeatherIcon name="map-pin" class="h-4 w-4 text-sky-400" /> Laxmi Plaza, Biashara Street, Nairobi
            </span>
            <span class="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span class="flex items-center gap-2">
              <FeatherIcon name="clock" class="h-4 w-4 text-sky-400" /> Mon–Fri: 8am–6pm
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar Wrapper (Retains inner bg-sky-700 styling) -->
    <section class="relative z-30 bg-sky-700 -mt-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <StatsBar :stats="stats" />
    </section>

    <!-- Services -->
    <section id="services" class="py-20">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Services</h2>
          <p class="mt-3 text-lg text-gray-600">
            Comprehensive dental care tailored to your individual needs.
          </p>
        </div>

        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-slate-50/80 py-20 border-y border-slate-100">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose Flair Smile?</h2>
          <p class="mt-3 text-lg text-gray-600">
            We combine modern technology with gentle, personalized care.
          </p>
        </div>

        <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            v-for="feature in features"
            :key="feature.id"
            :feature="feature"
          />
        </div>
      </div>
    </section>

    <!-- Doctors -->
    <section id="doctors" class="py-20">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Dentists</h2>
          <p class="mt-3 text-lg text-gray-600">
            Highly qualified professionals dedicated to your smile.
          </p>
        </div>

        <div v-if="doctorsResource.loading" class="mt-12 flex justify-center py-8">
          <LoadingIndicator size="lg" />
        </div>

        <p
          v-else-if="doctorsResource.error"
          class="mt-8 text-center text-red-600 font-medium"
        >
          Unable to load our team at the moment. Please try again later.
        </p>

        <div
          v-else-if="doctors.length === 0"
          class="mt-8 text-center text-gray-500"
        >
          Our team is being prepared. Check back soon!
        </div>

        <div
          v-else
          class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <DoctorCard
            v-for="doctor in doctors"
            :key="doctor.name"
            :doctor="doctor"
          />
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-sky-50/60 py-20 border-t border-sky-100">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Patients Say</h2>
          <p class="mt-3 text-lg text-gray-600">
            Hear from people who have experienced the Flair Smile difference.
          </p>
        </div>

        <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            :testimonial="testimonial"
          />
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-20">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Visit Us</h2>
          <p class="mt-3 text-lg text-gray-600">
            Visit us at Laxmi Plaza on Biashara Street in the heart of Nairobi's CBD.
          </p>
        </div>

        <div class="mt-12 grid gap-8 lg:grid-cols-2 items-center">
          <!-- Contact details -->
          <div class="space-y-6">
            <address class="space-y-6 text-left not-italic">
              <div class="flex items-start gap-4">
                <div class="rounded-lg bg-sky-50 p-3 text-sky-700">
                  <FeatherIcon name="map-pin" class="h-6 w-6" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Our Location</p>
                  <p class="mt-1 text-gray-600 leading-relaxed">
                    Laxmi Plaza, 5th Floor, Office No. 1<br />
                    Biashara Street, Nairobi CBD, Kenya
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="rounded-lg bg-sky-50 p-3 text-sky-700">
                  <FeatherIcon name="phone" class="h-6 w-6" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Phone</p>
                  <div class="mt-1 space-y-1">
                    <a href="tel:0746721164" class="block text-sky-700 hover:text-sky-800 font-medium">0746 721 164</a>
                    <a href="tel:0711842836" class="block text-sky-700 hover:text-sky-800 font-medium">0711 842 836</a>
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="rounded-lg bg-sky-50 p-3 text-sky-700">
                  <FeatherIcon name="mail" class="h-6 w-6" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Email</p>
                  <p class="mt-1">
                    <a href="mailto:flairsmiledentalcare@gmail.com" class="text-sky-700 hover:text-sky-800 font-medium">
                      flairsmiledentalcare@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="rounded-lg bg-sky-50 p-3 text-sky-700">
                  <FeatherIcon name="clock" class="h-6 w-6" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Working Hours</p>
                  <ul class="mt-1 space-y-1 text-gray-600">
                    <li>Mon–Fri: 8:00 AM – 6:00 PM</li>
                    <li>Saturday: 9:00 AM – 1:00 PM</li>
                    <li>Sunday: Emergency only</li>
                  </ul>
                </div>
              </div>
            </address>
          </div>

          <!-- Map card -->
          <Card class="overflow-hidden border border-gray-100 shadow-lg">
            <template #default>
              <iframe
                title="Flair Smile Dental Care location"
                class="h-80 w-full border-0"
                src="https://maps.google.com/maps?q=Laxmi+Plaza,+Biashara+Street,+Nairobi+CBD&t=&z=15&ie=UTF8&iwloc=&output=embed"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 py-12 text-gray-300 border-t border-slate-800">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <RouterLink to="/" class="flex items-center space-x-2">
              <img src="/favicon.png" alt="Flair Smile" class="h-8 w-8" />
              <span class="text-xl font-semibold text-sky-400">Flair Smile</span>
            </RouterLink>
            <p class="mt-2 text-sm italic text-sky-300">Creating Brighter Smiles</p>
            <p class="mt-3 text-sm text-gray-400 leading-relaxed">
              Compassionate, modern dentistry in Nairobi's CBD. We're dedicated
              to creating healthy smiles and confident patients through
              personalized, gentle care for the whole family.
            </p>
          </div>

          <div>
            <h3 class="text-white font-semibold">Services</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li v-for="service in services.slice(0, 5)" :key="service.id">
                <a href="#services" class="hover:text-white transition-colors">{{ service.title }}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-semibold">Contact</h3>
            <ul class="mt-4 space-y-2 text-sm text-gray-400">
              <li>Laxmi Plaza, 5th Floor, Office No. 1</li>
              <li>Biashara Street, Nairobi CBD</li>
              <li>0746 721 164 / 0711 842 836</li>
              <li>flairsmiledentalcare@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-semibold">Quick Links</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li><a href="#services" class="hover:text-white transition-colors">Services</a></li>
              <li><a href="#doctors" class="hover:text-white transition-colors">Our Dentists</a></li>
              <li><a href="#contact" class="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} Flair Smile Dental Care. All rights reserved.
        </div>
      </div>
    </footer>

    <!-- Floating WhatsApp contact button -->
    <WhatsAppButton phone="0746721164" />

    <!-- Booking modal -->
    <BookingModal v-model="bookingOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  Button,
  Card,
  FeatherIcon,
  LoadingIndicator,
  createResource,
} from "frappe-ui";

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
  "/assets/frappe_webportals/frontend/waiting-area.jpeg",
  "/assets/frappe_webportals/frontend/hero1.jpeg",
  "/assets/frappe_webportals/frontend/hero3.jpeg",
  "/assets/frappe_webportals/frontend/reception.jpeg",
];

const currentSlide = ref(0);
let slideInterval: ReturnType<typeof setInterval> | null = null;

function nextSlide(): void {
  currentSlide.value = (currentSlide.value + 1) % heroImages.length;
  restartInterval();
}

function prevSlide(): void {
  currentSlide.value =
    (currentSlide.value - 1 + heroImages.length) % heroImages.length;
  restartInterval();
}

function goToSlide(index: number): void {
  currentSlide.value = index;
  restartInterval();
}

function startInterval(): void {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.length;
  }, 5000);
}

function stopInterval(): void {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function restartInterval(): void {
  stopInterval();
  startInterval();
}

const services: Service[] = [
  {
    id: 1,
    title: "General Dentistry",
    description:
      "Routine checkups, cleanings, and preventive care for the whole family.",
    icon: "heart",
    color: "sky",
  },
  {
    id: 2,
    title: "Dental Fillings",
    description:
      "Gentle, tooth-colored fillings to restore decayed teeth seamlessly.",
    icon: "droplet",
    color: "blue",
  },
  {
    id: 3,
    title: "Root Canal Therapy",
    description:
      "Advanced treatment to save infected teeth with minimal discomfort.",
    icon: "zap",
    color: "indigo",
  },
  {
    id: 4,
    title: "Orthodontics",
    description:
      "Braces and clear aligners to straighten teeth and perfect your smile.",
    icon: "grid",
    color: "purple",
  },
  {
    id: 5,
    title: "Cosmetic Dentistry",
    description:
      "Veneers, whitening, and bonding to enhance your natural beauty.",
    icon: "star",
    color: "pink",
  },
  {
    id: 6,
    title: "Dental Implants",
    description:
      "Premium implant solutions for missing teeth and full restoration.",
    icon: "plus-circle",
    color: "teal",
  },
];

const features: Feature[] = [
  {
    id: 1,
    title: "Modern Technology",
    description: "Latest equipment for precise, painless and comfortable care.",
    icon: "zap",
  },
  {
    id: 2,
    title: "Gentle & Caring Team",
    description: "Our team makes every visit calm, comfortable and stress-free.",
    icon: "heart",
  },
  {
    id: 3,
    title: "Family Friendly",
    description: "Safe, welcoming environment for patients of all ages.",
    icon: "users",
  },
  {
    id: 4,
    title: "Flexible Appointments",
    description: "Easy online booking and extended hours for your convenience.",
    icon: "calendar",
  },
  {
    id: 5,
    title: "Emergency Care",
    description: "Same-day appointments for urgent dental needs.",
    icon: "activity",
  },
  {
    id: 6,
    title: "Affordable Plans",
    description: "Transparent pricing and flexible payment options.",
    icon: "dollar-sign",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Wanjiru Mwangi",
    role: "Teacher",
    quote:
      "The team at Flair Smile transformed my fear of dentists into a spa day experience. My root canal was a breeze!",
    avatar: "W",
  },
  {
    id: 2,
    name: "David Ochieng",
    role: "Business Owner",
    quote:
      "Top-quality care and friendly staff. I've never felt more confident about my smile. Highly recommend!",
    avatar: "D",
  },
  {
    id: 3,
    name: "Amina Hassan",
    role: "Student",
    quote:
      "The aligners were barely noticeable. My teeth look amazing and my confidence has soared!",
    avatar: "A",
  },
];

const stats: Stat[] = [
  { id: 1, value: "10+", label: "Years of Experience", icon: "calendar" },
  { id: 2, value: "5,000+", label: "Happy Patients", icon: "users" },
  { id: 3, value: "4.9", label: "Google Rating", icon: "star" },
  { id: 4, value: "24/7", label: "Emergency Support", icon: "phone" },
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
  if (!doctorsResource.data) return [];
  return doctorsResource.data.map((doc: any) => ({
    name: doc.practitioner_name,
    qualification: doc.qualifications || "DDS, PhD",
    specialty: "Dentist",
    image: doc.image || null,
    bio: `${doc.practitioner_name} has been providing excellent dental care at Flair Smile.`,
  }));
});

function bookAppointment(): void {
  bookingOpen.value = true;
}

function callNow(): void {
  window.location.href = "tel:0746721164";
}

function updateMetaTags(): void {
  document.title = "Flair Smile Dental Care — Dentist in Nairobi CBD";

  const metaDescription = document.querySelector('meta[name="description"]');
  metaDescription?.setAttribute(
    "content",
    "Your trusted dental clinic in Nairobi CBD. Offering general dentistry, cosmetic dentistry, orthodontics, dental implants, and more. Book an appointment today.",
  );

  const metaKeywords = document.querySelector('meta[name="keywords"]');
  metaKeywords?.setAttribute(
    "content",
    "dentist Nairobi, dental care Nairobi, cosmetic dentistry Nairobi, dental implants Nairobi, orthodontics Nairobi, Flair Smile Dental Care",
  );
}

onMounted(() => {
  mobileOpen.value = false;
  updateMetaTags();
  startInterval();
});

onUnmounted(() => {
  stopInterval();
});
</script>
