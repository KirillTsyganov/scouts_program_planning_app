<template>
  <div
    class="activity-row"
    :class="{
      'fixed-row': isFixedRow,
      'main-activity': activity.tag === 'main',
    }"
  >
    <div class="main-content-grid">
      <div class="time-col">
        <label :for="`duration-${activity.id}`" class="mobile-label"
          >Duration</label
        >
        <input
          :id="`duration-${activity.id}`"
          type="text"
          :value="activity.duration"
          :placeholder="isFixedRow ? '' : 'e.g., 15 mins'"
          :readonly="isFixedRow"
          @input="updateActivity('duration', $event.target.value)"
        />
      </div>

      <div class="activity-col">
        <label :for="`details-${activity.id}`" class="mobile-label"
          >Activity Details</label
        >
        <textarea
          :id="`details-${activity.id}`"
          :value="activity.details"
          placeholder="What will happen?"
          :readonly="isFixedRow"
          rows="1"
          @input="updateActivity('details', $event.target.value)"
        ></textarea>
      </div>

      <div class="tag-col">
        <label :for="`tag-${activity.id}`" class="mobile-label">Tag</label>
        <select
          :id="`tag-${activity.id}`"
          :value="activity.tag"
          @change="updateActivity('tag', $event.target.value)"
        >
          <option value="opening">Opening</option>
          <option value="main">Main</option>
          <option value="closing">Closing</option>
          <option value="other">Other</option>
          <option value="celebration">Celebration</option>
        </select>
      </div>
    </div>

    <div
      v-if="!['opening', 'closing', 'celebration'].includes(activity.tag)"
      class="tagging-section"
    >
      <div class="tag-group challenge-areas">
        <span class="tag-title">Challenge Areas :</span>
        <div class="tag-checkboxes">
          <label
            v-for="(value, key) in activity.challengeAreas"
            :key="key"
            :class="{ checked: value }"
          >
            <input
              type="checkbox"
              :checked="value"
              @change="updateChallengeArea(key, $event.target.checked)"
            />
            {{ key }}
          </label>
        </div>
      </div>
    </div>

    <div class="actions-col">
      <button
        class="remove-btn"
        :disabled="isFixedRow"
        aria-label="Remove Activity"
        @click="$emit('remove')"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
  isFixedRow: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:activity', 'remove']);

const updateActivity = (key, value) => {
  emit('update:activity', { ...props.activity, [key]: value });
};

const updateChallengeArea = (key, value) => {
  const newChallengeAreas = { ...props.activity.challengeAreas, [key]: value };
  updateActivity('challengeAreas', newChallengeAreas);
};
</script>

<style scoped>
.activity-row {
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  position: relative;
}

.fixed-row {
  background-color: #f8f9fa;
}

.main-activity {
  border-left: 3px solid #005e3b;
}

.main-content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  width: 100%;
}

.mobile-label {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 2px;
}

.activity-row input[type='text'],
.activity-row textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 0.9rem;
}

.activity-row input[readonly],
.activity-row textarea[readonly] {
  background-color: #eee;
  font-weight: bold;
  color: #333;
}

.tagging-section {
  width: 100%;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.tag-group {
  display: flex;
  align-items: center;
}
.tag-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: #005e3b;
  margin-bottom: 5px;
  display: block;
}

.challenge-areas {
  margin-bottom: 15px;
}

.tag-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-checkboxes label {
  display: inline-flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
}

.tag-checkboxes label.checked {
  background-color: #ff9900;
  color: white;
  font-weight: bold;
}

.tag-checkboxes input[type='checkbox'] {
  display: none;
}

.tag-col select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}

.actions-col {
  position: absolute;
  top: 10px;
  right: 10px;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.remove-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .activity-row {
    border: 1px solid #ddd;
    border-radius: 0;
    padding: 0;
    margin-bottom: 0;
    align-items: stretch;
  }
  .mobile-label {
    display: none;
  }
  .main-content-grid {
    display: grid;
    grid-template-columns: 100px 1fr 120px;
    width: calc(100% - 40px); /* Leave space for remove button */
  }
  .time-col,
  .activity-col,
  .tag-col {
    padding: 8px 5px;
    display: flex;
    align-items: center;
    border-right: 1px solid #eee;
  }
  .tag-col {
    border-right: none;
  }
  .actions-col {
    border-right: none;
  }
  .time-col {
    padding-left: 15px;
  }
  .activity-row input[type='text'] {
    border: none;
    padding: 0;
    background: none;
  }
  .tagging-section {
    grid-column: 1 / span 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px dotted #eee;
    padding: 5px 15px;
    margin-top: 0;
  }
  .tag-title {
    margin-bottom: 0;
    margin-right: 10px;
  }
  .tag-checkboxes label {
    padding: 2px 6px;
    font-size: 0.75rem;
  }
  .actions-col {
    position: static;
  }
  .remove-btn {
    width: 20px;
    height: 20px;
    font-size: 1rem;
    margin: 0 auto;
    display: block;
  }
}

@media print {
  .activity-row {
    grid-template-columns: 80px 1fr 120px 0px;
    gap: 5px;
    border-top: 1px dashed #999;
    page-break-inside: avoid;
  }
  .main-content-grid {
    display: contents;
  }
  .tagging-section,
  .actions-col {
    display: none;
  }
  .activity-row input[type='text'] {
    font-size: 0.8rem;
    padding: 0;
  }
}
</style>
