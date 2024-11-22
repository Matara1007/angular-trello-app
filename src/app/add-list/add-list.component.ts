import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For two-way binding
import { ListsService } from '../services/lists.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  standalone: true,
  styleUrls: ['./add-list.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AddListComponent {
  @Input() selectedBoard: any; // Receive the selected board
  @Output() listAdded = new EventEmitter<void>(); // Emit event after adding a list

  boards: any[] = []; // Stores all boards
  lists: any[] = []; // Stores lists for the selected board
  cards: { [listId: number]: any[] } = {}; // Stores cards for each list
  showAddListModal = false; // State for modal visibility
  newListName = ''; // Holds the name of the new board
  board = { name: '' }; // Model for the new board
  boardId = ''; // Holds the ID of the selected board

  constructor(
    
    private listsService: ListsService
  ) {}

    // Show the modal for adding a new board
    showAddListsModal(): void {
      this.showAddListModal = true;
    }
  
    // Hide the modal
    hideAddListsModal(): void {
      this.showAddListModal = false;
    }
  

   // Add new list to the selected board
addList(): void {
  if (!this.selectedBoard) {
    console.error('No board selected to add a list!');
    return;
  }

  const newList = {
    name: this.newListName, // The name of the list to add
    boardId: this.selectedBoard.id, // Ensure boardId is derived from the selectedBoard
  };

  this.listsService.addLists(newList).subscribe(
    (response) => {
      this.lists.push(response); // Add the new list to the local `lists` array
      this.newListName = ''; // Clear the new list name field
      this.hideAddListsModal(); // Close the modal (if applicable)
      this.listAdded.emit(); // Notify the parent component

    },
    (error) => {
      console.error('Error adding list:', error);
    }
  );
}

}
