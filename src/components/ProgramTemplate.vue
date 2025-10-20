<template>
  <div class="program-template-container">
    <div class="template-header">
      <button @click="goBack" class="back-btn">← Back to Programs</button>
      <div class="actions">
        <button @click="saveProgram" class="save-btn">Save</button>
        <button @click="printProgram" class="print-btn">Print</button>
      </div>
    </div>
    <main class="program-editor">
      <ProgramFramework v-model:program-data="currentProgram" />

      <hr class="section-divider" />

      <ActivityList v-model:activities="currentProgram.activities" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProgramFramework from './ProgramFramework.vue';
import ActivityList from './ActivitiesList.vue';

const router = useRouter();
const route = useRoute();

// This object defines the structure for a brand new, empty program.
const createNewProgramData = () => ({
  title: '',
  description: '',
  unit: '1st Upper Gum Tree CUB SCOUT UNIT', // [cite: 9]
  date: new Date().toISOString().substring(0, 10),
  patrol: '',
  challengeAreas: {
    Outdoors: false,
    Creative: false,
    'Personal Growth': false,
    Community: false,
  },
  activities: [
    {
      id: 'opening',
      duration: '10 mins',
      details: 'Opening Parade',
      tag: 'opening',
      challengeAreas: {
        Community: false,
        Outdoors: false,
        Creative: false,
        'Personal Growth': false,
      },
    },
    {
      id: 'closing',
      duration: '10 mins',
      details: 'Closing Parade & Review',
      tag: 'closing',
      challengeAreas: {
        Community: false,
        Outdoors: false,
        Creative: false,
        'Personal Growth': false,
      },
    },
  ],
});

const currentProgram = ref(createNewProgramData());

const createNewActivity = () => ({
  id: Date.now() + Math.random(),
  duration: '',
  details: '',
  tag: 'main',
  challengeAreas: {
    Community: false,
    Outdoors: false,
    Creative: false,
    'Personal Growth': false,
  },
});

onMounted(() => {
  const programId = route.params.id;
  if (programId && programId !== 'new') {
    const savedPrograms = JSON.parse(
      localStorage.getItem('scout-programs') || '[]',
    );
    const programToEdit = savedPrograms.find((p) => p.id == programId);
    if (programToEdit) {
      currentProgram.value = programToEdit;
    }
  } else {
    const newProgram = createNewProgramData();
    newProgram.activities.splice(1, 0, createNewActivity());
    currentProgram.value = newProgram;
  }
});

const goBack = () => {
  if (confirm('Are you sure you want to exit without saving?')) {
    router.push('/programs');
  }
};

const saveProgram = () => {
  const savedPrograms = JSON.parse(
    localStorage.getItem('scout-programs') || '[]',
  );
  const programToSave = currentProgram.value;

  const existingIndex = savedPrograms.findIndex(
    (p) => p.id === programToSave.id,
  );

  if (existingIndex > -1) {
    savedPrograms[existingIndex] = programToSave;
  } else {
    programToSave.id = Date.now();
    savedPrograms.push(programToSave);
  }

  localStorage.setItem('scout-programs', JSON.stringify(savedPrograms));
  alert('Program Saved!');
  router.push('/programs');
};

const printProgram = () => {
  // This triggers the browser's native print dialogue.
  // The mobile-friendly layout will be overridden by the @media print CSS.
  window.print();
};
</script>

<style scoped>
.program-template-container {
  padding: 0; /* Remove padding here, let child components manage it */
}

.template-header {
  background-color: #f7f7f7;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky; /* Sticky header for mobile usability */
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #ddd;
}

.back-btn {
  background: none;
  border: none;
  color: #005e3b;
  font-size: 1rem;
  padding: 8px;
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 10px;
}

.save-btn,
.print-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.9rem;
}

.save-btn {
  background-color: #005e3b; /* Scout Green */
  color: white;
}

.save-btn:hover {
  background-color: #004d2e;
}

.print-btn {
  background-color: #ccc;
  color: #333;
}

.print-btn:hover {
  background-color: #bbb;
}

.program-editor {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.section-divider {
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin: 25px 0;
}

/* Print Styling - Crucial for PWA and print functionality */
/* We'll refine this in a later phase, but here's the start: */
@media print {
  /* Hide UI elements not needed for printing */
  .template-header {
    display: none;
  }

  /* Remove margins/padding that waste space */
  .program-template-container,
  .program-editor {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
  }
}
</style>
