<template>
  <div
    class="palette"
    :class="{ grayscale: isGrayscale }"
  >
    <button
      class="toggle"
      @click="isGrayscale = !isGrayscale"
    >
      {{ isGrayscale ? 'Выключить Ч/Б фильтр' : 'Включить Ч/Б фильтр' }}
    </button>

    <table>
      <thead>
        <tr>
          <th>Light</th>
          <th>Base</th>
          <th>Dark</th>
          <th>Label</th>
        </tr>
      </thead>
      <tbody>
        <!-- Indigo -->
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-indigo-light)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-indigo)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-indigo-dark)"
            />
          </td>
          <td>Indigo</td>
        </tr>
        <!-- Blue -->
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-blue-light)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-blue)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-blue-dark)"
            />
          </td>
          <td>Blue</td>
        </tr>
        <!-- Green -->
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-green-light)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-green)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-green-dark)"
            />
          </td>
          <td>Green</td>
        </tr>
        <!-- Orange -->
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-orange-light)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-orange)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-orange-dark)"
            />
          </td>
          <td>Orange</td>
        </tr>
        <!-- Yellow -->
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-yellow-light)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-yellow)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-yellow-dark)"
            />
          </td>
          <td>Yellow</td>
        </tr>
        <!-- Purple -->
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-purple-light)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-purple)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-purple-dark)"
            />
          </td>
          <td>Purple</td>
        </tr>
        <!-- Pink -->
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-pink-light)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-pink)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-pink-dark)"
            />
          </td>
          <td>Pink</td>
        </tr>
        <!-- Дополнительные UI цвета -->
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-white)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-beige-light)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-background-beige)"
            />
          </td>
          <td>White / Beige</td>
        </tr>
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-text-chocolate)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-text-brown)"
            />
          </td>
          <td>
            <div
              class="swatch"
              style="background: var(--color-text-beige)"
            />
          </td>
          <td>Text Colors</td>
        </tr>
        <tr>
          <td>
            <div
              class="swatch"
              style="background: var(--color-background-pink)"
            />
          </td>
          <td colspan="2" />
          <td>Background Pink</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isGrayscale = ref(false)
</script>

<style scoped>
.palette {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 100px 0;
}

.toggle {
  margin-bottom: 20px;
  padding: 8px 16px;
  border: none;
  background: #7e96c7;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  text-align: center;
}

th, td {
  padding: 8px 12px;
}

.swatch {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.1);
}

.grayscale {
  filter: grayscale(100%);
}
</style>
