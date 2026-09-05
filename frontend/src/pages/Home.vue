<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">

    <!-- Navigation -->
    <header class="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav class="container mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        <RouterLink to="/" class="flex items-center space-x-2">
          <img src="/favicon.png" alt="Flair Smile Dental Care" class="h-8 w-8 sm:h-10 sm:w-10" />
          <span class="text-xl font-semibold text-sky-700 sm:text-2xl">Flair Smile</span>
          <span class="text-xl font-semibold text-gray-700 sm:text-2xl">Dental Care</span>
        </RouterLink>

        <div class="hidden items-center space-x-8 md:flex">
          <a href="#services" class="nav-link">Services</a>
          <a href="#doctors" class="nav-link">Our Dentists</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#contact" class="nav-link">Contact</a>
          <Button
            label="Book Appointment"
            class="shadow-md shadow-sky-200 hover:shadow-lg"
            @click="bookAppointment"
          />
        </div>

        <button
          v-if="!mobileOpen"
          @click="mobileOpen = true"
          class="rounded-md p-2 text-gray-600 md:hidden"
          aria-label="Open menu"
        >
          <FeatherIcon name="menu" size="20" />
        </button>
      </nav>

      <!-- Mobile menu -->
      <Transition name="slide-down">
        <div
          v-if="mobileOpen"
          class="border-t border-gray-100 md:hidden"
        >
          <div class="container mx-auto space-y-2 px-4 py-3">
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

    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="/chair1.jpeg"
          alt="Dental clinic interior"
          class="h-full w-full object-cover"
        />
        <!-- Increased overlay opacity and gradient for readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40"></div>
      </div>

      <div class="relative z-10 container mx-auto px-6 py-20 md:py-28 lg:py-36 lg:px-8">
        <div class="max-w-2xl">
          <span class="inline-block rounded-full bg-sky-500/20 px-4 py-1.5 text-sm font-medium text-sky-200 border border-sky-400/30 backdrop-blur-sm">
            Compassionate. Modern. Expert.
          </span>
          <h1 class="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Flair Smile Dental Care
          </h1>
          <p class="mt-6 text-base leading-relaxed text-slate-100 sm:text-lg md:text-xl">
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

          <div class="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-200">
            <span class="flex items-center gap-1.5">
              <FeatherIcon name="map-pin" class="h-4 w-4 text-sky-400" /> Laxmi Plaza, Biashara Street, Nairobi
            </span>
            <span class="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span class="flex items-center gap-1.5">
              <FeatherIcon name="clock" class="h-4 w-4 text-sky-400" /> Mon–Fri: 8am–6pm
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats / Trust Bar -->
    <StatsBar :stats="stats" />

    <!-- Services -->
    <section id="services" class="py-20">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Our Services</h2>
          <p class="mt-4 text-base text-gray-600 sm:text-lg md:text-xl">
            Comprehensive dental care tailored to your needs.
          </p>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Why Choose Flair Smile?</h2>
          <p class="mt-4 text-base text-gray-600 sm:text-lg md:text-xl">
            We combine modern technology with gentle, personalized care.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Meet Our Dentists</h2>
          <p class="mt-4 text-base text-gray-600 sm:text-lg md:text-xl">
            Highly qualified professionals dedicated to your smile.
          </p>
        </div>

        <div v-if="doctorsResource.loading" class="mt-12 flex justify-center">
          <LoadingIndicator size="lg" />
        </div>

        <p
          v-else-if="doctorsResource.error"
          class="mt-8 text-center text-red-600"
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
    <section class="bg-sky-50 py-20">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">What Our Patients Say</h2>
          <p class="mt-4 text-base text-gray-600 sm:text-lg md:text-xl">
            Hear from people who have experienced the Flair Smile difference.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Visit Us</h2>
          <p class="mt-4 text-base text-gray-600 sm:text-lg md:text-xl">
            Visit us at Laxmi Plaza on Biashara Street in the heart of Nairobi's CBD.
          </p>
        </div>

        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          <!-- Contact details -->
          <div>
            <address class="space-y-6 text-left not-italic">
              <div class="flex items-start gap-4">
                <FeatherIcon
                  name="map-pin"
                  class="mt-1 h-6 w-6 text-sky-700"
                />
                <div>
                  <p class="font-semibold text-gray-900">Our Location</p>
                  <p class="mt-1 text-gray-700">
                    Laxmi Plaza, 5th Floor, Office No. 1<br />
                    Biashara Street, Nairobi CBD<br />
                    Kenya
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <FeatherIcon
                  name="phone"
                  class="mt-1 h-6 w-6 text-sky-700"
                />
                <div>
                  <p class="font-semibold text-gray-900">Phone</p>
                  <p class="mt-1 space-y-1">
                    <a
                      href="tel:0746721164"
                      class="block text-sky-700 hover:text-sky-800"
                      >0746 721 164</a
                    >
                    <a
                      href="tel:0711842836"
                      class="block text-sky-700 hover:text-sky-800"
                      >0711 842 836</a
                    >
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <FeatherIcon
                  name="mail"
                  class="mt-1 h-6 w-6 text-sky-700"
                />
                <div>
                  <p class="font-semibold text-gray-900">Email</p>
                  <p class="mt-1">
                    <a
                      href="mailto:flairsmiledentalcare@gmail.com"
                      class="text-sky-700 hover:text-sky-800"
                      >flairsmiledentalcare@gmail.com</a
                    >
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <FeatherIcon
                  name="clock"
                  class="mt-1 h-6 w-6 text-sky-700"
                />
                <div>
                  <p class="font-semibold text-gray-900">Working Hours</p>
                  <ul class="mt-1 space-y-1 text-gray-700">
                    <li>Mon–Fri: 8:00 AM – 6:00 PM</li>
                    <li>Saturday: 9:00 AM – 1:00 PM</li>
                    <li>Sunday: Emergency only</li>
                  </ul>
                </div>
              </div>
            </address>
          </div>

          <!-- Map / form card -->
          <Card>
            <template #default>
              <iframe
                title="Flair Smile Dental Care location"
                class="h-64 w-full rounded-md border-0"
                src="https://www.google.com/maps?q=Laxmi+Plaza,+Biashara+Street,+Nairobi+CBD,+Kenya&output=embed"
              ></iframe>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 py-12 text-gray-300">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <RouterLink to="/" class="flex items-center space-x-2">
              <img src="/favicon.png" alt="Flair Smile" class="h-8 w-8" />
              <span class="text-xl font-semibold text-sky-400">Flair Smile</span>
            </RouterLink>
            <p class="mt-4 text-sm text-gray-400">
              Compassionate, modern dentistry in Nairobi's CBD. We're dedicated
              to creating healthy smiles and confident patients through
              personalized, gentle care for the whole family.
            </p>
          </div>

          <div>
            <h3 class="text-white">Services</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li v-for="service in services.slice(0, 5)" :key="service.id">
                <a
                  :href="`#services`"
                  class="hover:text-white"
                  >{{ service.title }}</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-white">Contact</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li>Laxmi Plaza, 5th Floor, Office No. 1</li>
              <li>Biashara Street, Nairobi CBD</li>
              <li>0746 721 164 / 0711 842 836</li>
              <li>flairsmiledentalcare@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 class="text-white">Quick Links</h3>
            <ul class="mt-4 space-y-2 text-sm">
              <li><a href="#services" class="hover:text-white">Services</a></li>
              <li><a href="#doctors" class="hover:text-white">Our Dentists</a></li>
              <li><a href="#contact" class="hover:text-white">Contact</a></li>
              <li>
                <a href="#" class="hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500"
        >
          &copy; {{ new Date().getFullYear() }} Flair Smile Dental Care. All
          rights reserved.
        </div>
      </div>
    </footer>

    <!-- Floating WhatsApp contact button -->
    <WhatsAppButton phone="0746721164" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Button,
  Card,
  FeatherIcon,
  LoadingIndicator,
  toast,
  createResource,
} from "frappe-ui";

import ServiceCard from "../components/ServiceCard.vue";
import FeatureCard from "../components/FeatureCard.vue";
import DoctorCard from "../components/DoctorCard.vue";
import TestimonialCard from "../components/TestimonialCard.vue";
import StatsBar from "../components/StatsBar.vue";
import WhatsAppButton from "../components/WhatsAppButton.vue";

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

const mobileOpen = ref(false);

const services: Service[] = [
  {
    id: 1,
    title: "General Dentistry",
    description:
      "Routine checkups, cleanings, and preventive care for the whole family.",
    icon: "heart-pulse",
    color: "sky",
  },
  {
    id: 2,
    title: "Dental Fillings",
    description:
      "Gentle, tooth-colored fillings to restore decayed teeth seamlessly.",
    icon: "fill",
    color: "blue",
  },
  {
    id: 3,
    title: "Root Canal Therapy",
    description:
      "Advanced treatment to save infected teeth with minimal discomfort.",
    icon: "activity",
    color: "-indigo",
  },
  {
    id: 4,
    title: "Orthodontics",
    description:
      "Braces and clear aligners to straighten teeth and perfect your smile.",
    icon: "smile",
    color: "purple",
  },
  {
    id: 5,
    title: "Cosmetic Dentistry",
    description:
      "Veneers, whitening, and bonding to enhance your natural beauty.",
    icon: "sparkles",
    color: "pink",
  },
  {
    id: 6,
    title: "Dental Implants",
    description:
      "Premium implant solutions for missing teeth and full restoration.",
    icon: "crown",
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

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  { id: 1, value: "10+", label: "Years of Experience", icon: "calendar" },
  { id: 2, value: "5,000+", label: "Happy Patients", icon: "users" },
  { id: 3, value: "4.9", label: "Google Rating", icon: "star" },
  { id: 4, value: "24/7", label: "Emergency Support", icon: "phone" },
];

// Fetch Healthcare Practitioners from Frappe Healthcare
const doctorsResource = createResource({
  url: "frappe.healthcare.doctype.healthcare_practitioner.healthcare_practitioner.get_list",
  method: "GET",
  auto: true,
  initialData: [],
  onSuccess: (data: any) => {
    if (!data || data.length === 0) {
      console.log("No practitioners found");
    }
  },
});

const doctors = computed(() => {
  if (!doctorsResource.data) return [];
  return doctorsResource.data
    .filter((doc: any) => doc.status === "Active")
    .map((doc: any) => ({
      name: doc.practitioner_name,
      qualification: getQualification(doc),
      specialty: "Dentist",
      image: doc.image || null,
      bio: `${doc.practitioner_name} has been providing excellent dental care at Flair Smile.`,
    }));
});

function getQualification(doc: any): string {
  const quals = [
    doc.qualifications,
    doc.degrees,
    doc.education,
  ].filter(Boolean);
  return quals.length > 0 ? quals.join(", ") : "DDS, PhD";
}

function bookAppointment(): void {
  const el = document.getElementById("contact");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  toast("info", {
    title: "Book an Appointment",
    message:
      'Please call 0746 721 164 / 0711 842 836 or email us at flairsmiledentalcare@gmail.com to schedule.',
    duration: 6000,
  });
}

function callNow(): void {
  window.location.href = "tel:0746721164";
}

onMounted(() => {
  mobileOpen.value = false;
});
</script>

<style scoped>
.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #0369a1;
}

.mobile-nav-link {
  display: block;
  width: 100%;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  color: #374151;
  transition: background-color 0.2s, color 0.2s;
}
.mobile-nav-link:hover {
  background-color: #f9fafb;
  color: #0369a1;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
}
</style>

