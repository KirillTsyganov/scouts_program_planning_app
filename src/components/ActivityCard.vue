<!--
  Docs:
    ActivityCard is a component representing a single activity within ProgramEditor
-->
<template>
  <div class="activity-card-wrapper" :class="{ 'is-fixed': isFixedActivity }">
    <div class="drag-handle" v-if="!isFixedActivity">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M10 19c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 .99.45 1 1zm0-6c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 .99.45 1 1zm0-6c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 .99.45 1 1zm6 12c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 .99.45 1 1zm0-6c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 .99.45 1 1zm0-6c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 .99.45 1 1z"
        />
      </svg>
    </div>
    <div class="activity-card" :class="{ 'has-handle': !isFixedActivity }">
      <div class="activity-card-content" @click="$emit('edit', activity.id)">
        <div class="activity-card-header">
          <p>{{ activity.tag }}</p>
          <p>{{ activity.duration }} mins</p>
        </div>
        <div class="activity-card-body">
          <div class="activity-duration">
            <p>{{ activity.details }}</p>
          </div>
          <div class="challenge-areas">
            <template
              v-for="(isSelected, area) in activity.challengeAreas"
              :key="area"
            >
              <img
                v-if="isSelected"
                :src="challengeAreaLogos[area]"
                :alt="area"
                :title="area"
                class="challenge-area-icon"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="card-actions">
      <button
        class="action-btn delete-btn"
        aria-label="Delete Program"
        @click.stop="$emit('delete', activity.id)"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script setup>
// TODO: not using equipment information on the card, I think it'll be too cluttered
// Need to think of a different way showing that info
import { computed } from 'vue';

import communityLogo from '@/assets/community.png';
import outdoorsLogo from '@/assets/outdoors.png';
import creativeLogo from '@/assets/creative.png';
import personalGrowthLogo from '@/assets/personal-growth.png';

const challengeAreaLogos = {
  Community: communityLogo,
  Outdoors: outdoorsLogo,
  Creative: creativeLogo,
  'Personal Growth': personalGrowthLogo,
};

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
});

const isFixedActivity = computed(() => {
  return ['opening', 'closing'].includes(props.activity.tag);
});
</script>

<style scoped>
.activity-card-wrapper {
  margin-bottom: 10px; /* Add space between each card */
  display: flex; /* To align card and delete button side-by-side */
  align-items: center;
  gap: 5px; /* Space between card content and delete button */
}

.activity-card-wrapper.is-fixed .activity-card {
  background-color: #f8f9fa;
  border-color: #e9ecef;
}

.activity-card {
  flex-grow: 1; /* Allow card to take available space */
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s;
  display: flex; /* Use flexbox for internal layout */
  flex-direction: column; /* Stack header, body */
  min-height: 80px; /* Give it a minimum height */
}
.activity-card.has-handle {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  align-self: stretch;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-right: none;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  cursor: grab;
}
.drag-handle svg {
  width: 16px;
  height: 16px;
  fill: #888;
}
.activity-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.activity-card-content {
  flex-grow: 1; /* Allow content to grow */
  display: flex;
  flex-direction: column;
  padding: 8px 12px; /* Reduced padding */
}
.activity-card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline; /* Align text baselines */
  margin-bottom: 5px; /* Space between header and details */
  font-size: 0.9rem; /* Smaller font for header */
  color: #555;
}
.activity-card-body {
  padding: 0; /* Remove body padding, content-padding handles it */
  flex-grow: 1; /* Allow body to grow */
  display: flex;
  flex-direction: column;
}
.activity-card-header p {
  margin: 0; /* Remove default paragraph margins */
  font-size: 0.9rem; /* Ensure smaller font */
}
.activity-card-header p:first-child {
  font-weight: bold; /* Make tag stand out a bit */
  color: #005e3b;
}
.activity-duration {
  /* This div contains activity.details */
  margin-bottom: 8px; /* Space between details and challenge areas */
}
.activity-duration p {
  margin: 0; /* Remove default paragraph margins */
  font-size: 1rem; /* Make details prominent */
  font-weight: 500;
  color: #333;
}
.challenge-areas {
  margin-top: auto; /* Push challenge areas to the bottom */
  display: flex;
  flex-wrap: wrap;
  gap: 4px; /* Space between badges */
}
.challenge-area-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}
.card-actions {
  text-align: right;
  margin-top: 8px;
}
.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem; /* Smaller delete button */
  width: 28px; /* Fixed size */
  height: 28px;
  line-height: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8d7da; /* Light red background */
  color: #721c24; /* Dark red text */
  border: 1px solid #f5c6cb;
}
.action-btn:hover {
  background-color: #f5c6cb;
  color: #721c24;
}
</style>
