<script setup lang="ts">
import { ScrollArea, Avatar, Button } from 'frappe-ui'
import { usePatientPortal } from '@/composables/usePatientPortal'

const { clientRecords, selectedId, selectedRecord } = usePatientPortal()
</script>

<template>
  <div class="flex min-h-0 flex-1">
    
    <!-- Left Pane: Record Queue List -->
    <ScrollArea class="w-80 shrink-0 border-r border-outline-gray-1 bg-surface-white">
      <div class="p-2 space-y-1">
        <button
          v-for="record in clientRecords"
          :key="record.id"
          type="button"
          class="flex w-full flex-col gap-1 rounded-4 px-3 py-2 text-left transition-colors"
          :class="record.id === selectedId ? 'bg-surface-gray-3' : 'hover:bg-surface-gray-2'"
          @click="selectedId = record.id"
        >
          <div class="flex items-center justify-between w-full">
            <span class="truncate text-base-medium text-ink-gray-8">{{ record.title }}</span>
            <span class="text-2xs px-1.5 py-0.5 rounded bg-surface-gray-2 text-ink-gray-6">{{ record.status }}</span>
          </div>
          <span class="text-sm text-ink-gray-5">{{ record.date }} · {{ record.dentist }}</span>
        </button>
      </div>
    </ScrollArea>

    <!-- Right Pane: Dashboard Overview & Analytics -->
    <ScrollArea class="flex-1 bg-surface-gray-1">
      <div class="p-6 space-y-6 max-w-4xl mx-auto">
        
        <!-- Welcome Banner -->
        <div class="bg-surface-white p-6 rounded-lg border border-outline-gray-1 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Avatar label="Sarah Jenkins" size="xl" />
            <div>
              <h1 class="text-xl font-bold text-ink-gray-9">Welcome back, Sarah!</h1>
              <p class="text-sm text-ink-gray-5">Your next dental checkup is scheduled in 3 days.</p>
            </div>
          </div>
          <Button variant="subtle" label="View Profile" />
        </div>

        <!-- Quick Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-surface-white p-5 rounded-lg border border-outline-gray-1 shadow-sm">
            <div class="text-sm text-ink-gray-5">Upcoming Appointments</div>
            <div class="text-2xl font-bold text-ink-gray-9 mt-1">1 Scheduled</div>
            <div class="text-xs text-ink-gray-4 mt-2">Next: Oct 20, 2026 at 10:00 AM</div>
          </div>

          <div class="bg-surface-white p-5 rounded-lg border border-outline-gray-1 shadow-sm">
            <div class="text-sm text-ink-gray-5">Total Billed & Paid</div>
            <div class="text-2xl font-bold text-ink-gray-9 mt-1">$450.00</div>
            <div class="text-xs text-emerald-600 mt-2">All past invoices settled</div>
          </div>

          <div class="bg-surface-white p-5 rounded-lg border border-outline-gray-1 shadow-sm">
            <div class="text-sm text-ink-gray-5">Active Care Plans</div>
            <div class="text-2xl font-bold text-ink-gray-9 mt-1">1 Active</div>
            <div class="text-xs text-ink-gray-4 mt-2">Post-Cleaning Maintenance</div>
          </div>
        </div>

        <!-- Treatment Distribution Charts -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-surface-white p-6 rounded-lg border border-outline-gray-1 shadow-sm space-y-4">
            <h3 class="text-base font-semibold text-ink-gray-8">Treatment Breakdown</h3>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs text-ink-gray-6 mb-1">
                  <span>Preventative Care</span>
                  <span>60%</span>
                </div>
                <div class="h-2 w-full bg-surface-gray-2 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full" style="width: 60%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs text-ink-gray-6 mb-1">
                  <span>Restorative Fillings</span>
                  <span>25%</span>
                </div>
                <div class="h-2 w-full bg-surface-gray-2 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 rounded-full" style="width: 25%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-surface-white p-6 rounded-lg border border-outline-gray-1 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h3 class="text-base font-semibold text-ink-gray-8">Insurance Status</h3>
              <p class="text-xs text-ink-gray-5 mt-1">Aetna Dental PPO is verified and active.</p>
            </div>
            <Button variant="outline" size="sm" label="Download Statement PDF" class="w-full" />
          </div>
        </div>

        <!-- Selected Record Detail Inspector -->
        <div class="bg-surface-white p-6 rounded-lg border border-outline-gray-1 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold text-ink-gray-8">Selected Item Details</h3>
            <span class="text-xs px-2 py-1 rounded bg-surface-gray-2 text-ink-gray-7 font-medium">{{ selectedRecord.status }}</span>
          </div>
          <div class="flex items-center gap-3 pt-2">
            <Avatar label="Flair Smile" size="md" />
            <div>
              <h4 class="text-lg font-semibold text-ink-gray-9">{{ selectedRecord.title }}</h4>
              <p class="text-sm text-ink-gray-5">Handled by {{ selectedRecord.dentist }} on {{ selectedRecord.date }}</p>
            </div>
          </div>
          <div class="border-t border-outline-gray-1 pt-3">
            <p class="text-p-base text-ink-gray-7">{{ selectedRecord.notes }}</p>
          </div>
        </div>

      </div>
    </ScrollArea>

  </div>
</template>