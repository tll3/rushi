<template>
    <nav class="navbar fixed-bottom navbar-light bg-light">
      <div class="container-fluid justify-content-center">
        <div class="btn-group">
          <button
            :class="
              state.mode == 'Panorama'
                ? 'btn btn-primary active'
                : 'btn btn-primary'
            "
            @click="() => setState({ mode: Five.Mode.Panorama })"
          >
            全景漫游
          </button>
          <button
            :class="
              state.mode == 'Panorama'
                ? 'btn btn-primary'
                : 'btn btn-primary active'
            "
            @click="() => setState({ mode: Five.Mode.Floorplan })"
          >
            空间总览
          </button>
        </div>
      </div>
    </nav>
  </template>
  <script setup>
//   Topview
  import { useFiveCurrentState } from "@realsee/five/vue";
  import { Five } from "@realsee/five";
  const [state, setState] = useFiveCurrentState();
  </script>