import { Person } from '@api/person/person.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnnotationDto } from './annotation.dto';
import { Annotation } from './annotation.entity';

@Injectable()
export class AnnotationService {
  @InjectRepository(Annotation)
  private readonly annotationRepository: Repository<Annotation>;
  @InjectRepository(Person)
  private readonly personRepository: Repository<Person>;

  public async getAnnotations(person_id: number) {
    const person = await this.personRepository.findOne({
      where: { id: person_id },
    });
    if (person)
      return await this.annotationRepository.find({
        where: { person: { id: person_id } },
      });
    else throw new NotFoundException(`Person not found`);
  }

  public async getAnnotation(id: number, person_id: number) {
    const annotation = await this.annotationRepository.findOne({
      where: { id },
      relations: ['person'],
    });

    if (!annotation) throw new NotFoundException(`Annotation not found`);

    if (annotation.person.id == person_id) {
      delete annotation.person;
      return annotation;
    } else
      throw new ForbiddenException(`Annotation does not belong to this person`);
  }

  public async createAnnotation(body: CreateAnnotationDto, person_id: number) {
    let annotation: Annotation = new Annotation();

    let person = await this.personRepository.findOne({
      where: { id: person_id },
    });

    if (!person) throw new NotFoundException(`Person not found`);

    annotation.title = body.title;
    annotation.description = body.description;
    annotation.person = person;

    annotation = await this.annotationRepository.save(annotation);
    return annotation;
  }

  public async delete(id: number, person_id: number): Promise<boolean> {
    const annotation = await this.annotationRepository.findOne({
      where: { id },
      relations: ['person'],
    });

    if (!annotation) {
      throw new NotFoundException(`Annotation not found`);
    }

    if (annotation.person.id != person_id)
      throw new ForbiddenException(`Annotation does not belong to this person`);

    return (await this.annotationRepository.delete(id)).affected > 0;
  }
}
