import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailRepository } from './order_detail.repository';

describe('OrderDetailService', () => {
  let service: OrderDetailService;
  const repo = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as unknown as OrderDetailRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDetailService, { provide: OrderDetailRepository, useValue: repo }],
    }).compile();
    service = module.get<OrderDetailService>(OrderDetailService);
    jest.clearAllMocks();
  });

  it('create delega al repositorio', async () => {
    (repo.create as any).mockResolvedValue({ uuid_order_detail: '1' });
    const res = await service.create({} as any);
    expect(res.uuid_order_detail).toBe('1');
  });

  it('findAll retorna detalles', async () => {
    (repo.findAll as any).mockResolvedValue([{ uuid_order_detail: '1' }]);
    const res = await service.findAll();
    expect(res).toHaveLength(1);
  });
});