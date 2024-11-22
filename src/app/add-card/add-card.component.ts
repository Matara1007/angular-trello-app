import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For two-way binding
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  standalone: true,
  styleUrls: ['./add-card.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AddCardComponent {

  @Input() selectedList: any; // Receive the selected board
  @Output() cardAdded = new EventEmitter<void>(); // Emit event after adding a list

  boards: any[] = []; // Stores all boards
  lists: any[] = []; // Stores lists for the selected board
  cards: { [listId: number]: any[] } = {}; // Stores cards for each list
  showAddCardModal = false; // State for modal visibility
  newCardName = ''; // Holds the name of the new board
  newCardContent = ''; // Holds the name of the new board
  board = { name: '' }; // Model for the new board
  boardId = ''; // Holds the ID of the selected board
  listId = ''; // Holds the ID of the selected list

  constructor(
    
    private cardsService: CardsService
  ) {}

    // Show the modal for adding a new board
    showAddCardsModal(): void {
      this.showAddCardModal = true;
    }
  
    // Hide the modal
    hideAddCardsModal(): void {
      this.showAddCardModal = false;
    }
  

   // Add new list to the selected board
addCard(): void {
  if (!this.selectedList) {
    console.error('No list selected to add a card!');
    return;
  }

  const newCard = {
    title: this.newCardName, // The name of the list to add
    content: this.newCardContent, // The name of the list to add
    listId: this.selectedList.id, // Ensure boardId is derived from the selectedList
  };

  this.cardsService.addCard(newCard).subscribe(
    (response) => {
      console.log('List added successfully:', response);
      this.lists.push(response); // Add the new list to the local `lists` array
      this.newCardName = ''; // Clear the new list name field
      this.hideAddCardsModal(); // Close the modal (if applicable)
      this.cardAdded.emit(); // Notify the parent component

    },
    (error) => {
      console.error('Error adding list:', error);
    }
  );
}

}
