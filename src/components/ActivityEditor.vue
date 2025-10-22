<!--
 Docs:
   ActivityEditor is a component for creating or updating an activity within a modal.
   It receives an activity object as a prop and emits events to save or cancel.
   It uses ActivityFramework as its layout blueprint.
-->
<template>
  <div class="activity-editor-container">
    <div class="editor-header">
      <h3>{{ isNewActivity ? 'Add New Activity' : 'Edit Activity' }}</h3>
      <div class="actions">
        <button class="cancel-btn" @click="cancel">Cancel</button>
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
import { ref, watch, computed } from 'vue';
import ActivityFramework from './ActivityFramework.vue';

const props = defineProps({
  // The activity object to be edited. Can be null for a new activity.
  activity: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['save', 'cancel']);

// A local, editable copy of the activity.
const currentActivity = ref(null);

const isNewActivity = computed(
  () => !props.activity || props.activity.id === 'new',
);

const createNewActivity = () => ({
  id: 'new', // A temporary ID
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
});

// Watch for changes in the activity prop to update the local state.
// This allows the same editor instance to be used for adding and then editing.
watch(
  () => props.activity,
  (newActivity) => {
    if (newActivity) {
      // Create a deep copy to prevent modifying the original object directly
      currentActivity.value = JSON.parse(JSON.stringify(newActivity));
    } else {
      // If no activity is passed, assume we are creating a new one.
      currentActivity.value = createNewActivity();
    }
  },
  { immediate: true }, // Run the watcher immediately on component mount
);

const saveActivity = () => {
  if (!currentActivity.value) return;

  // Basic validation
  if (!currentActivity.value.duration || !currentActivity.value.details) {
    alert('Please fill in at least Duration and Activity Details.');
    return;
  }

  // Emit the saved activity data to the parent.
  emit('save', currentActivity.value);
};

const cancel = () => {
  // Emit a cancel event to the parent to close the modal.
  emit('cancel');
};
</script>

<style scoped>
.activity-editor-container {
  padding: 1.25rem;
  background-color: #fff;
  border-radius: 8px;
  width: 90vw;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}

@media (min-width: 540px) {
  .activity-editor-container {
    width: 500px;
  }
}
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}
.editor-header h3 {
  margin: 0;
  color: #005e3b;
}
.actions {
  display: flex;
  gap: 10px;
}
.save-btn,
.cancel-btn {
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
.save-btn {
  background-color: #005e3b;
  color: white;
}
.cancel-btn {
  background-color: #f0f0f0;
  color: #333;
}
.activity-editor {
  margin-top: 10px;
}
</style>
