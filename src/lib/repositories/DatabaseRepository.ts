import { GenericEntity } from '../types';

export interface DatabaseRepository {
  /**
   * Fetch all records from a table
   */
  findAll<T = GenericEntity>(table: string): Promise<T[]>;

  /**
   * Fetch a single record by ID
   */
  findById<T = GenericEntity>(table: string, id: number): Promise<T>;

  /**
   * Create a new record
   */
  create<T = GenericEntity>(table: string, payload: any): Promise<T>;

  /**
   * Update an existing record
   */
  update<T = GenericEntity>(table: string, id: number, payload: any): Promise<T>;

  /**
   * Delete a record by ID
   */
  delete(table: string, id: number): Promise<void>;

  /**
   * Custom query helper (optional, but useful)
   */
  query<T = any>(table: string, filter: (query: any) => any): Promise<T[]>;
}

