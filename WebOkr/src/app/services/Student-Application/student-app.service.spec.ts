import { TestBed } from '@angular/core/testing';

import { StudentAppService } from './student-app.service';

describe('StudentAppService', () => {
  let service: StudentAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
