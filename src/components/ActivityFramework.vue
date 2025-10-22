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
        <select
          :id="`duration-${activity.id}`"
          :value="activity.duration"
          @change="updateActivity('duration', $event.target.value)"
        >
          <option value="" :disabled="activity.duration !== ''">
            Select duration
          </option>
          <option v-for="time in timeOptions" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
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
          rows="3"
          @input="updateActivity('details', $event.target.value)"
        ></textarea>
      </div>

      <div class="activity-col">
        <label :for="`equipment-${activity.id}`" class="mobile-label"
          >Equipment</label
        >
        <textarea
          :id="`equipment-${activity.id}`"
          :value="activity.equipment"
          placeholder="What equipment will be used?"
          :readonly="isFixedRow"
          rows="3"
          @input="updateActivity('equipment', $event.target.value)"
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
          <option value="game">Game</option>
          <option value="celebration">Celebration</option>
        </select>
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
    <div
      v-if="
        !isFixedRow &&
        !['opening', 'closing', 'celebration'].includes(activity.tag)
      "
      class="tagging-section"
    >
      <span class="tag-title">Challenge Areas:</span>
      <div class="tag-icons">
        <img
          v-for="(isActive, area) in activity.challengeAreas"
          :key="area"
          :src="challengeAreaLogos[area]"
          :alt="area"
          :title="area"
          class="tag-icon"
          :class="{ active: isActive }"
          @click="updateChallengeArea(area, !isActive)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
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

const timeOptions = computed(() => {
  const options = [];
  for (let i = 5; i <= 120; i += 5) {
    options.push(`${i}`);
  }
  return options;
});

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
.activity-row textarea,
.activity-row select {
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

.tag-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: #005e3b;
  margin-bottom: 5px;
  display: block;
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

.tag-icons {
  display: flex;
  gap: 12px;
}

.tag-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.2s ease-in-out;
  border-radius: 50%;
}

.tag-icon.active {
  opacity: 1;
  box-shadow: 0 0 0 2px #ff9900;
}

/* Apply desktop grid layout ONLY when not inside the ActivityEditor modal */
@media (min-width: 768px) and (not: has(.activity-editor-container)) {
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
    grid-template-columns: 100px 1fr 1fr 120px;
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
  .actions-col {
    border-right: none; /* This was a mistake in previous version, should be tag-col */
  }
  .time-col {
    padding-left: 15px;
  }
  .activity-row select {
    border: none;
    padding: 0;
    background: none;
    width: 100%;
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
