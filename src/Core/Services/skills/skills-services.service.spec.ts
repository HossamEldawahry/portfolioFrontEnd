import { TestBed } from '@angular/core/testing';

import { SkillsServicesService } from './skills-services.service';

describe('SkillsServicesService', () => {
  let service: SkillsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
