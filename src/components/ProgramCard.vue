<template>
  <div class="program-card">
    <div class="card-content" @click="$emit('edit', program.id)">
      <div class="card-header">
        <h2 class="program-title">{{ program.title }}</h2>
        <span class="program-date">{{ formattedDate }}</span>
        <p><strong>Patrol:</strong> {{ program.patrol }}</p>
      </div>
      <div class="program-details">
        <p>{{ program.description }}</p>
      </div>
    </div>

    <div class="card-actions">
      <button
        class="action-btn delete-btn"
        aria-label="Delete Program"
        @click="$emit('delete', program.id)"
      >
        &times;
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
  },
});

defineEmits(['edit', 'delete']);

const formattedDate = computed(() => {
  if (!props.program.date) return 'TBA';

  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Date(props.program.date).toLocaleDateString(
      'en-AU',
      dateOptions,
    );
  } catch {
    return props.program.date; // Fallback
  }
});
</script>
<style scoped>
.program-card {
  position: relative;
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
  padding: 15px 15px 40px 15px; /* Add padding to the bottom to avoid overlap */
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
  position: absolute;
  top: 5px;
  right: 5px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.2s ease;
  padding: 5px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: right;
  justify-content: right;
}

.delete-btn {
  color: #a0a0a0;
}

.delete-btn:hover {
  background-color: #e0e0e0;
  color: #c9302c;
}
</style>
