import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // For two-way binding
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  standalone: true,
  styleUrls: ['./add-board.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AddBoardComponent {

  @Output() boardAdded = new EventEmitter<void>(); // Emit event after adding a list

  boards: any[] = []; // Stores all boards
  lists: any[] = []; // Stores lists for the selected board
  cards: { [listId: number]: any[] } = {}; // Stores cards for each list
  selectedBoard: any = null; // Currently selected board
  showAddBoardModal = false; // State for modal visibility
  newBoardName = ''; // Holds the name of the new board
  board = { name: '' }; // Model for the new board

  constructor(
    private boardService: BoardService
  ) {}

    // Show the modal for adding a new board
    showAddBoard(): void {
      this.showAddBoardModal = true;
    }
  
    // Hide the modal
    hideAddBoard(): void {
      this.showAddBoardModal = false;
    }
  

   // Add new board
   addBoard(): void {
    const newBoard = { name: this.newBoardName }; // Create a new board object
    this.boardService.addBoard(newBoard).subscribe(
      (response) => {
        console.log('Board added successfully:', response);
        this.boards.push(response); // Update the local board list
        this.hideAddBoard(); // Close the modal
        this.newBoardName = ''; // Reset the form
        this.boardAdded.emit(); // Notify the parent component

      },
      (error) => {
        console.error('Error adding board:', error);
      }
    );
  }
}
