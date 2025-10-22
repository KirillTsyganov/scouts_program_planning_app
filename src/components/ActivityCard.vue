<!--
  Docs:
    ActivityCard is a component representing a single activity within ProgramEditor
-->
<template>
  <div class="activities-list">
    <div class="activity-card">
      <div class="activity-card-content" @click="$emit('edit', activity.id)">
        <div class="activity-card-header">
          <p>{{ activity.tag }}</p>
          <p>{{ activity.duration }} mins</p>
        </div>
        <div class="activity-card-body">
          <div class="activity-duration">
            <p>{{ activity.details }}</p>
          </div>
          <div class="challenge-areas">
            <div
              v-for="(selected, area) in activity.challengeAreas"
              :key="area"
              v-if="selected"
              class="challenge-area-badge"
            >
              {{ area }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-actions">
      <button
        class="action-btn delete-btn"
        aria-label="Delete Program"
        @click.stop="$emit('delete', activity.id)"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script setup>
// TODO: not using equipment information on the card, I think it'll be too cluttered
// Need to think of a different way showing that info
const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.activities-list {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
}
.activity-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 12px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.activity-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.activity-card-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
}
.activity-card-body {
  padding: 12px;
}
.challenge-areas {
  margin-top: 10px;
}
.challenge-area-badge {
  display: inline-block;
  background-color: #e0f7fa;
  color: #00796b;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-right: 6px;
  margin-bottom: 6px;
}
.card-actions {
  text-align: right;
  margin-top: 8px;
}
.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #e53935;
}
.action-btn:hover {
  color: #b71c1c;
}
</style>
