<!--
  Docs:
    [MODIFIED]
    ActivitiesList is a component of a ProgramEditor
    it displays a list of ActivityCards
-->
<template>
  <div class="activities-list-container">
    <h2>Activities</h2>
    <div v-if="activities.length" class="activities-list">
      <ActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @edit="editActivity"
        @delete="deleteActivity"
      />
    </div>
    <p v-else class="no-activities">
      No activities added yet. Click "Add New Activity" to start building your
      program!
    </p>
    <div class="add-activity-section">
      <button class="add-activity-btn" @click="addNewActivity">
        + Add New Activity
      </button>
    </div>
  </div>
</template>
<script setup>
import ActivityCard from './ActivityCard.vue';

// The component should not load its own data.
// Instead, it should define props to receive data from its parent.
// The `v-model:activities` in ProgramEditor.vue passes this prop.
const props = defineProps({
  activities: {
    type: Array,
    required: true,
  },
});

// Define the event that will be emitted to the parent to update the activities.
// Add 'add-new' and 'edit-activity' to the emitted events.
const emit = defineEmits(['update:activities', 'add-new', 'edit-activity']);

const addNewActivity = () => {
  // Emit an event to the parent component to handle the creation of a new activity.
  emit('add-new');
};

const editActivity = (id) => {
  const activityToEdit = props.activities.find((a) => a.id === id);
  if (activityToEdit) {
    // Emit an event to the parent component with the activity that needs to be edited.
    // We pass a copy to prevent mutations of the original object until it's saved.
    emit('edit-activity', { ...activityToEdit });
  }
};

const deleteActivity = (id) => {
  if (confirm(`Are you sure you want to delete activity ID ${id}?`)) {
    const updatedActivities = props.activities.filter((a) => a.id !== id);
    // Emit an event to the parent to update the data, instead of modifying localStorage directly.
    emit('update:activities', updatedActivities);
  }
};
</script>
