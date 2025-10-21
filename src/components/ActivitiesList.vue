<template>
  <div class="activity-list">
    <div class="activity-list-header">
      <div class="time-col">Time</div>
      <div class="activity-col">Activity</div>
      <div class="actions-col"></div>
    </div>

    <div class="activity-rows">
      <ActivityFramework
        v-for="(activity, index) in activities"
        :key="activity.id || index"
        :activity="activity"
        :is-fixed-row="index === 0 || index === activities.length - 1"
        @update:activity="updateActivity(index, $event)"
        @remove="removeActivity(index)"
      />
    </div>

    <div class="add-activity-container">
      <button class="add-activity-btn" @click="addActivity">
        + Add Activity
      </button>
    </div>
  </div>
</template>

<script setup>
import ActivityFramework from './ActivityFramework.vue';

const props = defineProps({
  activities: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:activities']);

const createNewActivity = () => ({
  id: Date.now() + Math.random(), // Simple unique ID
  time: '',
  activity: '',
  equipment: '',
  milestoneTask: '',
  youthLeader: 'Youth',
  challengeAreas: {
    Community: false,
    Outdoors: false,
    Creative: false,
    'Personal Growth': false,
  },
  spices: {
    SOCIAL: false,
    PHYSICAL: false,
    INTELLECTUAL: false,
    CHARACTER: false,
    EMOTIONAL: false,
    SPIRITUAL: false,
  },
});

const addActivity = () => {
  const newActivities = [...props.activities];
  // Insert before the last item (CLOSING)
  newActivities.splice(newActivities.length - 1, 0, createNewActivity());
  emit('update:activities', newActivities);
};

const removeActivity = (index) => {
  const newActivities = [...props.activities];
  newActivities.splice(index, 1);
  emit('update:activities', newActivities);
};

const updateActivity = (index, updatedActivity) => {
  const newActivities = [...props.activities];
  newActivities[index] = updatedActivity;
  emit('update:activities', newActivities);
};
</script>

<style scoped>
.activity-list-header {
  display: none; /* Hidden on mobile */
  font-weight: bold;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-bottom: 2px solid #005e3b;
}

.add-activity-container {
  text-align: center;
  margin-top: 20px;
}

.add-activity-btn {
  background-color: #005e3b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

@media (min-width: 768px) {
  .activity-list-header {
    display: grid;
    grid-template-columns: 80px 3fr 1.5fr 1.5fr 40px;
    gap: 10px;
    padding: 8px 5px;
  }
  .activity-list-header .time-col {
    padding-left: 15px;
  }
}
</style>
