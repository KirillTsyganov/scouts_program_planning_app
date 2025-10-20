<template>
  <div class="program-card">
    <div @click="$emit('edit', program.id)" class="card-content">
      <div class="card-header">
        <h2 class="program-title">{{ program.title }}</h2>
        <span class="program-date">{{ formattedDate }}</span>
      </div>
      <div class="program-details">
        <p><strong>Unit:</strong> {{ program.unit }}</p>
        <p><strong>Patrol:</strong> {{ program.patrol }}</p>
      </div>
    </div>

    <div class="card-actions">
      <button
        @click="$emit('delete', program.id)"
        class="action-btn delete-btn"
        aria-label="Delete Program"
      >
        <span class="icon-text">Delete</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  program: {
    type: Object,
    required: true,
    // Expected structure: { id: 1, theme: '...', unit: '...', date: 'YYYY-MM-DD', patrol: '...' }
  },
});

const emit = defineEmits(['edit', 'delete']);

// Format the date for a more user-friendly display
const formattedDate = computed(() => {
  if (!props.program.date) return 'TBA';

  // Simple date formatting for display
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Date(props.program.date).toLocaleDateString(
      'en-AU',
      dateOptions,
    );
  } catch (e) {
    return props.program.date; // Fallback
  }
});
</script>
<style scoped>
.program-card {
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-left: 5px solid #005e3b; /* Accent color on the left */
}

.card-content {
  /* Takes up most of the space and is the clickable area for editing */
  flex-grow: 1;
  padding: 15px;
  cursor: pointer;
}

.card-content:hover {
  background-color: #f0f0f0;
}

.card-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.program-title {
  font-size: 1.1rem;
  margin: 0;
  color: #005e3b;
  font-weight: bold;
  line-height: 1.3;
}

.program-date {
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
}

.program-details p {
  margin: 2px 0;
  font-size: 0.9rem;
}

/* --- Actions/Buttons Section --- */
.card-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Fixed width for the button area */
  width: 70px;
  flex-shrink: 0;
}

.action-btn {
  height: 100%; /* Fill the height of the card */
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.delete-btn {
  background-color: #d9534f; /* Red for danger/delete */
  color: white;
}

.delete-btn:hover {
  background-color: #c9302c;
}

/* Hide text and just show icon on very small screens, 
   but since we are using vanilla CSS, we'll keep the text for clarity. */
/* If you want icons, replace the 'icon-text' span content with an SVG/Image. */
/* Example Media Query for icon-only button (if we used an icon):
@media (max-width: 400px) {
  .delete-btn {
    width: 50px;
  }
  .icon-text {
    display: none;
  }
}
*/
</style>
