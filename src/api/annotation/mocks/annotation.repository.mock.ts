import { Annotation } from '../annotation.entity';

export const annotations: Annotation[] = [
  {
    id: 1,
    title: 'Test annotation',
    description: 'This is a test annotation',
    person: { id: 1 } as any,
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
  },
  {
    id: 2,
    title: 'Test annotation',
    description: 'This is a test annotation',
    person: { id: 1 } as any,
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
  },
  {
    id: 3,
    title: 'Test annotation',
    description: 'This is a test annotation',
    person: { id: 1 } as any,
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
  },
  {
    id: 4,
    title: 'Test annotation',
    description: 'This is a test annotation',
    person: { id: 2 } as any,
    createdAt: new Date('2023-05-01T17:59:39.124Z'),
    updatedAt: new Date('2023-05-01T17:59:39.124Z'),
  },
];

export class mockAnnotationRepository {
  private annotations = annotations;

  private maxId() {
    return this.annotations.reduce(
      (prev, current) => (prev > current.id ? prev : current.id),
      0,
    );
  }

  public async findOne(id: number) {
    return Promise.resolve(this.annotations.find((u) => u.id === id));
  }

  public async find() {
    return Promise.resolve(this.annotations);
  }

  public async save(annotation: any) {
    const nAnnotation = {
      id: this.maxId() + 1,
      ...annotation,
    };
    this.annotations.push(nAnnotation);
    return Promise.resolve(nAnnotation);
  }

  public async delete(id: number) {
    const annotation = await this.findOne(id);
    if (!annotation) {
      return Promise.resolve({ affected: 0 });
    }
    this.annotations = this.annotations.filter((a) => a.id !== id);
    return Promise.resolve({ affected: 1 });
  }
}
