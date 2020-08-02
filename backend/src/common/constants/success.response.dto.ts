import {
  IPaginationMeta,
  IPaginationLinks,
} from '@app/utils/pagination/interfaces';

import { ApiProperty } from '@nestjs/swagger';

export class SuccessLoggedDto {
  @ApiProperty({
    example: 'JWT_TOKEN',
  })
  access_token: string;
}

export class UserPaginationDto<T> {
  @ApiProperty({
    example: [
      {
        _id: '1',
        name: 'Name',
        email: 'email@email.com',
        roles: ['ADMIN'],
        hobby: 'Developer',
        dayOfBirth: '1991-04-22T03:00:00.000Z',
        age: 29,
        sex: 'Male',
        createdAt: '2020-07-31T00:25:00.329Z',
        updatedAt: '2020-07-31T00:25:00.329Z',
      },
    ],
  })
  items: T[];

  @ApiProperty({
    example: {
      total_items: 2,
      item_count: 2,
      items_per_page: 10,
      total_pages: 1,
      current_page: 1,
    },
  })
  meta: IPaginationMeta;

  @ApiProperty({
    example: {
      first: '/developers?limit=10',
      previous: '',
      next: '',
      last: '/developers?page=1&limit=10',
    },
  })
  links: IPaginationLinks;
}
