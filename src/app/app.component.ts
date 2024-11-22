import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // For two-way binding
import { BoardService } from './services/board.service';
import { CardsService } from './services/cards.service';
import { ListsService } from './services/lists.service';
import { AddBoardComponent } from "./add-board/add-board.component";
import { AddListComponent } from "./add-list/add-list.component";
import { AddCardComponent } from "./add-card/add-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, AddBoardComponent, AddListComponent, AddCardComponent],
  providers: [BoardService, CardsService, ListsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  boards: any[] = []; // Stores all boards
  lists: any[] = []; // Stores lists for the selected board
  cards: { [listId: number]: any[] } = {}; // Stores cards for each list
  selectedBoard: any = null; // Currently selected board
  selectedList: any = null; // Currently selected board
  showAddBoardModal = false; // State for modal visibility
  newBoardName = ''; // Holds the name of the new board
  boardId = ''; // Holds the ID of the selected board

  constructor(
    private boardService: BoardService,
    private listsService: ListsService,
    private cardsService: CardsService
  ) {}

  ngOnInit(): void {
    this.loadBoards();
  }

  // Fetch all boards
  loadBoards(): void {
    this.boardService.getBoards().subscribe(
      (boardData) => {
        this.boards = boardData;
      },
      (error) => {
        console.error('Error fetching boards:', error);
      }
    );
  }

  // Fetch lists and cards for the selected board
  fetchListsForBoard(boardId: number): void {
    this.selectedBoard = this.boards.find((board) => board.id === boardId); // Set selected board
    this.listsService.getListsByBoardId(boardId).subscribe(
      (listData) => {
        this.lists = listData;
        this.loadCardsForLists(listData);
      },
      (error) => {
        console.error('Error fetching lists:', error);
      }
    );
  }

  // Fetch cards for all lists in the selected board
  loadCardsForLists(lists: any[]): void {
    this.cards = {}; // Clear previous cards
    lists.forEach((list) => {
      this.cardsService.getCardsByListId(list.id).subscribe(
        (cardData) => {
          this.cards[list.id] = cardData;
        },
        (error) => {
          console.error(`Error fetching cards for list ${list.id}:`, error);
        }
      );
    });
  }

  // Navigate back to the board selection
  navigateBack(): void {
    this.selectedBoard = null;
    this.selectedList = null;
    this.lists = [];
    this.cards = {};
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
      },
      (error) => {
        console.error('Error adding board:', error);
      }
    );
  }

  removeCard(cardId: number): void {
    this.cardsService.removeCard(cardId).subscribe(
      (response) => {
        console.log('Card removed successfully:', response);
        // Remove the card from the local list
        this.loadCardsForLists(this.lists);
      },
      (error) => {
        console.error('Error removing card:', error);
    })};
  

  // Show the modal for adding a new board
  showAddBoard(): void {
    this.showAddBoardModal = true;
  }

  // Hide the modal
  hideAddBoard(): void {
    this.showAddBoardModal = false;
  }
}
