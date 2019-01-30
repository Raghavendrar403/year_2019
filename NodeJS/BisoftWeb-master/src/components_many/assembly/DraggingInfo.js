/**
 * This module stores the dragging info and is replacement for storing it as
 * global variable.
 * @module components/assembly/DraggingInfo
 * @type {Object}
 * @param {boolean} isDragging Is a drag in progress?
 * @param {?AssemblyComponent} draggingComponentOld If an old component is being
 *                                                  dragged it contains it.
 * @param {?string} newComponentPort The new port for the component which is
 *                                   changed after the drag ends.
 * @param {function} setSidebarScroll Reference to {@link module:components/assembly/Sidebar~setScroll}
 * @param {boolean} scrollingSidebar Used for throttling in {@link module:components/assembly/CustomDragLayer}
 * @param {number} sidebarOldOffset Used for storing old drag offset in {@link module:components/assembly/CustomDragLayer}
 */

module.exports = {
  isDragging: false,
  draggingComponentOld: null,
  newComponentPort: null,
  setSidebarScroll: null,
  scrollingSidebar: false,
  sidebarOldOffset: 0,
}
