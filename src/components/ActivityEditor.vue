<!--
 Docs:
   ActivityEditor is a component for creating or updating an activity. 
   A new activity should results in an ActivityCard
   A list of ActivityCards should appears on a ActivitiesList
   ActivityEditor page has two main child components:
     - ActivityFramework (for general program details)
-->
<template>
  <div class="activity-editor-container">
    <div class="editor-header">
      <button class="back-btn" @click="saveActivity">
        ← Back to Activities
      </button>
      <div class="actions">
        <button class="save-btn" @click="saveActivity">Save</button>
      </div>
    </div>
    <main class="activity-editor">
      <ActivityFramework
        v-if="currentActivity"
        v-model:activity="currentActivity"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ActivityFramework from './ActivityFramework.vue';

const props = defineProps({
  id: {
    // This is the programId from the route
    type: String,
    required: true,
  },
  activityId: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const currentActivity = ref(null);

onMounted(() => {
  // Data is passed via router's history state to avoid re-fetching
  // and to decouple the component from localStorage.
  if (window.history.state.activity) {
    currentActivity.value = window.history.state.activity;
  } else {
    // Fallback if the user navigates directly to this URL
    console.warn('Activity data not found in router state. Navigating back.');
    router.push({ name: 'ProgramEditor', params: { id: props.id } });
  }
});

const saveActivity = () => {
  if (!currentActivity.value) return;

  const savedPrograms = JSON.parse(
    localStorage.getItem('scout-programs') || '[]',
  );
  const programIndex = savedPrograms.findIndex((p) => p.id == props.id);

  if (programIndex === -1) {
    console.error('Program not found during save!');
    router.push('/programs');
    return;
  }

  const program = savedPrograms[programIndex];
  const activityToSave = { ...currentActivity.value };

  if (props.activityId === 'new') {
    // It's a new activity, add it to the program
    activityToSave.id = Date.now() + Math.random(); // Assign a unique ID
    // Insert new activities before the closing parade
    const closingIndex = program.activities.findIndex(
      (a) => a.tag === 'closing',
    );
    if (closingIndex !== -1) {
      program.activities.splice(closingIndex, 0, activityToSave);
    } else {
      program.activities.push(activityToSave);
    }
  } else {
    // It's an existing activity, update it
    const activityIndex = program.activities.findIndex(
      (a) => a.id == props.activityId,
    );
    if (activityIndex !== -1) {
      program.activities[activityIndex] = activityToSave;
    }
  }

  localStorage.setItem('scout-programs', JSON.stringify(savedPrograms));
  router.push({ name: 'ProgramEditor', params: { id: props.id } });
};
</script>
