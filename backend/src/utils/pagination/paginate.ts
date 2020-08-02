import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Model, Document, MongooseFilterQuery } from 'mongoose';

import { IPaginationOptions, IPaginationLinks } from './interfaces';
import { Pagination } from './pagination';

function resolveOptions(options: IPaginationOptions): [number, number, string] {
  const { page } = options;
  const { limit } = options;
  const { route } = options;

  return [page, limit, route];
}

function createPaginationObject<T, Y>(
  items: T[],
  total_items: number,
  current_page: number,
  limit: number,
  dto: ClassType<Y>,
  route?: string,
): Pagination<Y> {
  const total_pages = Math.ceil(total_items / limit);

  const has_first_page = route;
  const has_previous_page = route && current_page > 1;
  const has_next_page = route && current_page < total_pages;
  const has_last_page = route;

  const symbol = route && new RegExp(/\?/).test(route) ? '&' : '?';

  const routes: IPaginationLinks = {
    first: has_first_page ? `${route}${symbol}limit=${limit}` : '',
    previous: has_previous_page
      ? `${route}${symbol}page=${current_page - 1}&limit=${limit}`
      : '',
    next: has_next_page
      ? `${route}${symbol}page=${current_page + 1}&limit=${limit}`
      : '',
    last: has_last_page
      ? `${route}${symbol}page=${total_pages}&limit=${limit}`
      : '',
  };

  return new Pagination<Y>(
    plainToClass(dto, items),
    {
      total_items,
      item_count: items.length,
      items_per_page: limit,
      total_pages,
      current_page,
    },
    routes,
  );
}

async function paginateModel<T extends Document, Y>(
  repository: Model<T>,
  options: IPaginationOptions,
  search_options: MongooseFilterQuery<T>,
  dto: ClassType<Y>,
): Promise<Pagination<Y>> {
  const [page, limit, route] = resolveOptions(options);

  if (page < 1) {
    return createPaginationObject([], 0, page, limit, dto, route);
  }

  const total = await repository.countDocuments(search_options);

  const items = await repository
    .find(search_options)
    .skip(limit * (page - 1))
    .limit(limit)
    .sort(options.sort_by);

  return createPaginationObject<T, Y>(items, total, page, limit, dto, route);
}

export async function paginate<T extends Document, Y>(
  repository: Model<T>,
  options: IPaginationOptions,
  search_options: MongooseFilterQuery<T>,
  dto: ClassType<Y>,
): Promise<Pagination<Y>> {
  return paginateModel<T, Y>(repository, options, search_options, dto);
}
