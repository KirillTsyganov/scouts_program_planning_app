<!--
  Docs:
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
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
// By using `useRoute`, we can access the current route's parameters.
const route = useRoute();

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
const emit = defineEmits(['update:activities']);

const addNewActivity = () => {
  // Here is how you get the programId (parentId) from the route.
  const programId = route.params.id;
  const newActivity = {
    id: 'new', // The editor will generate a real ID on save
    duration: '',
    details: '',
    equipment: '',
    tag: 'main',
    challengeAreas: {
      Community: false,
      Outdoors: false,
      Creative: false,
      'Personal Growth': false,
    },
  };
  router.push({
    name: 'ActivityEditor',
    params: { id: programId, activityId: 'new' },
    state: { activity: newActivity },
  });
};

const editActivity = (id) => {
  const programId = route.params.id;
  const activityToEdit = props.activities.find((a) => a.id === id);
  if (activityToEdit) {
    router.push({
      name: 'ActivityEditor',
      params: { id: programId, activityId: id },
      state: { activity: activityToEdit },
    });
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
