import { supabase } from '../supabase';
import { DatabaseRepository } from './DatabaseRepository';

export class SupabaseRepository implements DatabaseRepository {
  async findAll<T>(table: string): Promise<T[]> {
    const { data, error } = await supabase
      .from(table)
      .select('*');

    if (error) {
      console.error(`Error fetching all from ${table}:`, error);
      throw new Error(error.message);
    }
    return data as T[];
  }

  async findById<T>(table: string, id: number): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching from ${table} by id ${id}:`, error);
      throw new Error(error.message);
    }
    return data as T;
  }

  async create<T>(table: string, payload: any): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error(`Error creating in ${table}:`, error);
      throw new Error(error.message);
    }
    return data as T;
  }

  async update<T>(table: string, id: number, payload: any): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating in ${table} index ${id}:`, error);
      throw new Error(error.message);
    }
    return data as T;
  }

  async delete(table: string, id: number): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting from ${table} index ${id}:`, error);
      throw new Error(error.message);
    }
  }

  async query<T>(table: string, filter: (query: any) => any): Promise<T[]> {
    let q = supabase.from(table).select('*');
    q = filter(q);
    const { data, error } = await q;

    if (error) {
      console.error(`Error querying ${table}:`, error);
      throw new Error(error.message);
    }
    return data as T[];
  }
}

