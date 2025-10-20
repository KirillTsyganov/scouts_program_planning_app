<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="programs-container">
    <h1>Cub Scout Program Planner</h1>
    <div class="header-actions">
      <button class="add-btn" @click="addNewProgram">+ Add New Program</button>
    </div>
    <div v-if="programs.length" class="program-list">
      <ProgramCard
        v-for="program in programs"
        :key="program.id"
        :program="program"
        @edit="editProgram"
        @delete="deleteProgram"
      />
    </div>
    <p v-else class="no-programs">
      No programs saved yet. Click "Add New Program" to start planning!
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProgramCard from './ProgramCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const programs = ref([]);

const loadPrograms = () => {
  const savedPrograms = localStorage.getItem('scout-programs');
  if (savedPrograms) {
    programs.value = JSON.parse(savedPrograms);
  }
};

onMounted(() => {
  loadPrograms();
});

const addNewProgram = async () => {
  router.push({ name: 'ProgramTemplate', params: { id: 'new' } });
};

const editProgram = (id) => {
  router.push({ name: 'ProgramTemplate', params: { id: id } });
};

const deleteProgram = (id) => {
  if (confirm(`Are you sure you want to delete program ID ${id}?`)) {
    const updatedPrograms = programs.value.filter((p) => p.id !== id);
    localStorage.setItem('scout-programs', JSON.stringify(updatedPrograms));
    programs.value = updatedPrograms;
  }
};
</script>

<style scoped>
.programs-container {
  padding: 16px;
  max-width: 600px; /* Constrain width for readability on desktop */
  margin: 0 auto;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #005e3b; /* A typical Scout green */
  text-align: center;
}

.header-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.add-btn {
  background-color: #ff9900; /* A vibrant Scout orange/yellow */
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%; /* Full width on mobile */
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-btn:hover {
  background-color: #cc7a00;
}

.program-list {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Spacing between cards */
}

.no-programs {
  text-align: center;
  color: #666;
  padding: 40px 10px;
  border: 2px dashed #ccc;
  border-radius: 8px;
}
</style>
