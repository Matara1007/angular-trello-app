import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';

describe('BoardService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
