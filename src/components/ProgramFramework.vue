<template>
  <div class="program-framework">
    <div class="framework-header">
      <div class="meta-row">
        <div class="form-group">
          <label for="program-title">Title</label>
          <input
            id="program-title"
            class="title-input"
            type="text"
            :value="programData.title"
            placeholder="e.g., Campfire Cooking Night"
            @input="update('title', $event.target.value)"
          />
        </div>
        <div class="form-group">
          <label for="date">Date</label>
          <input
            id="date"
            type="date"
            :value="programData.date"
            @input="update('date', $event.target.value)"
          />
        </div>

        <div class="form-group">
          <label for="patrol">Patrol Name</label>
          <input
            id="patrol"
            type="text"
            :value="programData.patrol"
            placeholder="e.g., Lions"
            @input="update('patrol', $event.target.value)"
          />
        </div>
      </div>
      <div class="meta-row">
        <div class="form-group full-width">
          <label for="description">Description</label>
          <textarea
            id="description"
            class="description-input"
            :value="programData.description"
            placeholder="A brief summary of the night"
            rows="3"
            @input="update('description', $event.target.value)"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  programData: {
    type: Object,
    required: true,
  },
});

// const props = defineProps({
//   title: String,
//   description: String,
//   date: Date,
//   patrol: String,
//   activities: Array,
// });

const emit = defineEmits(['update:programData']);

const update = (key, value) => {
  emit('update:programData', { ...props.programData, [key]: value });
};
</script>

<style scoped>
.program-framework {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.framework-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.meta-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .meta-row {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .form-group {
    flex: 1 1 30%; /* Allow items to grow and shrink */
  }
  .full-width {
    flex-basis: 100%;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #333;
}

input[type='text'],
input[type='date'],
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.title-input {
  font-size: 1.5rem;
  font-weight: bold;
}

.description-input {
  font-size: 1.1rem;
  color: #555;
}
</style>
