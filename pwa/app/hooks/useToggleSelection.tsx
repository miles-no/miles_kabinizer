import { useState } from "react";

type Selection = {
  id: string;
  isSelected: boolean;
};

/**
 * Hook for managing a selection that can be toggled on or off
 *
 * @returns selectedItems: Array of selected items, handleSelectionToggle: function to handle selection toggling
 */
const useToggleSelection = () => {
  const [selectedItems, setSelectedItems] = useState<Selection[]>([]);
  const updateSelectionState = (id: string, isSelected: boolean) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== id,
    );
    if (isSelected) {
      updatedItems.push({ id, isSelected });
    }
    setSelectedItems(updatedItems);
  };

  return { selectedItems, updateSelectionState };
};

export default useToggleSelection;
