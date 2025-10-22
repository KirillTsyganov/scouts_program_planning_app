<!--
 Docs:
   ProgramEditor is a component for creating or updating a program. 
   A new program should results in a ProgramCard.
   A list of ProgramCards should appears on a ProgramsList
   ProgramEditor page has two main child components:
     - ProgramFramework (for general program details)
     - ActivitiesList (for managing activities within the program)
-->
<template>
  <div class="program-template-container">
    <div class="template-header">
      <button class="back-btn" @click="goBack">← Back to Programs</button>
      <div class="actions">
        <button class="save-btn" @click="saveProgram">Save</button>
        <button class="print-btn" @click="printProgram">Print</button>
      </div>
    </div>
    <main class="program-editor">
      <ProgramFramework v-model:program-data="currentProgram" />

      <hr class="section-divider" />

      <ActivitiesList
        v-model:activities="currentProgram.activities"
        @add-new="handleAddNewActivity"
        @edit-activity="handleEditActivity"
      />
    </main>

    <Modal :show="isActivityModalVisible" @close="closeActivityModal">
      <ActivityEditor
        v-if="isActivityModalVisible"
        :activity="activityToEdit"
        @save="handleSaveActivity"
        @cancel="closeActivityModal"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProgramFramework from './ProgramFramework.vue';
import ActivitiesList from './ActivitiesList.vue';
import Modal from './Modal.vue';
import ActivityEditor from './ActivityEditor.vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const router = useRouter();
const route = useRoute();

// This object defines the structure for a brand new, empty program.

const isActivityModalVisible = ref(false);
const activityToEdit = ref(null);

const createNewProgramData = () => ({
  title: '',
  description: '',
  date: new Date().toISOString().substring(0, 10),
  patrol: '',
  activities: [
    {
      id: 'opening',
      duration: '10',
      details: 'Opening Parade',
      equipment: '',
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
      duration: '10',
      details: 'Closing Parade & Review',
      equipment: '',
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

const handleAddNewActivity = () => {
  activityToEdit.value = null; // No existing activity to edit
  isActivityModalVisible.value = true;
};

const handleEditActivity = (activity) => {
  activityToEdit.value = activity;
  isActivityModalVisible.value = true;
};

const closeActivityModal = () => {
  isActivityModalVisible.value = false;
  activityToEdit.value = null;
};

const handleSaveActivity = (activityData) => {
  const program = currentProgram.value;

  if (activityData.id === 'new') {
    // It's a new activity, add it to the program
    activityData.id = Date.now() + Math.random(); // Assign a unique ID
    // Insert new activities before the closing parade
    const closingIndex = program.activities.findIndex(
      (a) => a.tag === 'closing',
    );
    if (closingIndex !== -1) {
      program.activities.splice(closingIndex, 0, activityData);
    } else {
      program.activities.push(activityData);
    }
  } else {
    // It's an existing activity, update it
    const activityIndex = program.activities.findIndex(
      (a) => a.id === activityData.id,
    );
    if (activityIndex !== -1) {
      program.activities[activityIndex] = activityData;
    }
  }
  closeActivityModal();
};

const goBack = () => {
  router.push('/programs');
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
  // alert('Program Saved!');
  router.push('/programs');
};

const printProgram = () => {
  const program = currentProgram.value;
  // Initialize jsPDF for A4 portrait
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Set document properties
  doc.setProperties({
    title: `${program.title} - Program Plan`,
  });

  // Add Header Text
  doc.setFontSize(20);
  doc.text(program.title, 14, 22);

  doc.setFontSize(11);
  doc.text(`Date: ${program.date}`, 14, 32);
  doc.text(`Patrol: ${program.patrol || 'N/A'}`, 14, 38);

  // Add Description (with line wrapping)
  doc.setFontSize(12);
  doc.text('Description:', 14, 48);
  const descriptionLines = doc.splitTextToSize(
    program.description || 'No description.',
    180,
  );
  doc.text(descriptionLines, 14, 54);

  // Prepare data for the activities table
  const tableColumn = [
    'Duration',
    'Activity Details',
    'Equipment',
    'Challenge Areas',
  ];
  const tableRows = program.activities.map((activity) => {
    const selectedChallenges = Object.entries(activity.challengeAreas)
      .filter(([, isActive]) => isActive)
      .map(([area]) => area)
      .join(', ');

    return [
      activity.duration,
      activity.details,
      activity.equipment,
      selectedChallenges || '-',
    ];
  });

  // Add table using jspdf-autotable
  autoTable(doc, { head: [tableColumn], body: tableRows, startY: 70 });

  // Save the PDF
  doc.save(`${program.title.replace(/\s+/g, '_') || 'program'}.pdf`);
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
  max-width: 62.5rem; /* 1000px at 16px base font size */
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
