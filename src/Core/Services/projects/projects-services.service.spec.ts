import { TestBed } from '@angular/core/testing';

import { ProjectsServicesService } from './projects-services.service';

describe('ProjectsServicesService', () => {
  let service: ProjectsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
