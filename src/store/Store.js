import create from 'zustand'
import * as THREE from 'three'

const useStore = create(set => ({
  grid: new THREE.Group(),
  old_grid: new THREE.Group(),
  saveGrid: () => set(state => ({ old_grid: state.grid })),
  updateGrid: (grid) => set({ grid: grid })
}))

export default useStore